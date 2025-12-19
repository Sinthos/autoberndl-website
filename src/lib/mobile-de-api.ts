interface MobileDeVehicle {
  make?: string;
  model?: string;
  modelDescription?: string;
  price?: {
    consumerPriceGross?: string;
  };
  firstRegistration?: string; // "yyyyMM"
  mileage?: number;
  images?: {
    xl: string;
  }[];
  fuel?: string;
  power?: number;
}

export interface Vehicle {
  id: string;
  url: string;
  brand: string;
  model: string;
  type: string;
  price: string;
  details: string;
  image: string;
  badge?: string;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  quot: "\"",
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  uuml: "ü",
  auml: "ä",
  ouml: "ö",
  Uuml: "Ü",
  Auml: "Ä",
  Ouml: "Ö",
  szlig: "ß",
};

const decodeHtmlEntities = (text?: string) => {
  if (!text) return "";
  let decoded = text;
  for (let i = 0; i < 2; i += 1) {
    decoded = decoded
      .replace(/&([a-zA-Z]+);/g, (match, name) => NAMED_ENTITIES[name] ?? match)
      .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
  }
  return decoded;
};

async function getVehicles(): Promise<Vehicle[]> {
  const username = process.env.MOBILE_DE_USERNAME;
  const password = process.env.MOBILE_DE_PASSWORD;
  const customerNumber = process.env.MOBILE_DE_CUSTOMER_NUMBER;

  if (!username || !password || !customerNumber) {
    console.error("MOBILE_DE_USERNAME, MOBILE_DE_PASSWORD, or MOBILE_DE_CUSTOMER_NUMBER is not set.");
    return [];
  }

  const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
  const headers = {
    'Authorization': `Basic ${encodedCredentials}`,
    'Accept': 'application/vnd.de.mobile.api+json',
  };

  try {
    // 1. Search for ads by customer number
    const searchUrl = `https://services.mobile.de/search-api/search?customerNumber=${customerNumber}`;
    const searchResponse = await fetch(searchUrl, {
      headers,
      next: { revalidate: 21600 } // Revalidate every 6 hours
    });

    if (!searchResponse.ok) {
      console.error(`Failed to search for vehicles: ${searchResponse.statusText}`);
      return [];
    }

    const searchData = await searchResponse.json();
    const adKeys = Array.isArray(searchData?.ads)
      ? searchData.ads.map((ad: any) => ad.mobileAdId).filter(Boolean)
      : [];

    if (!adKeys.length) {
      return [];
    }

    // 2. Fetch full details for each ad
    const vehiclePromises = adKeys.map(async (adKey: string) => {
      try {
        const adUrl = `https://services.mobile.de/search-api/ad/${adKey}`;
        const adResponse = await fetch(adUrl, {
          headers,
          next: { revalidate: 21600 }
        });
        if (!adResponse.ok) {
          console.error(`Failed to fetch ad ${adKey}: ${adResponse.statusText}`);
          return null;
        }
        const data = await adResponse.json();
        return { id: adKey, data };
      } catch (error) {
        console.error(`Failed to fetch ad ${adKey}:`, error);
        return null;
      }
    });

    const vehiclesData = await Promise.all(vehiclePromises);
    const validVehicles = vehiclesData.filter(Boolean) as { id: string; data: MobileDeVehicle }[];

    // 3. Map the data to the format required by the frontend
    return validVehicles.map(({ id, data }) => {
      const url = `https://suchen.mobile.de/fahrzeuge/details.html?id=${encodeURIComponent(id)}`;
      const registrationRaw = data.firstRegistration ?? "";
      const hasRegistration = registrationRaw.length >= 6;
      const registrationYear = hasRegistration ? registrationRaw.substring(0, 4) : "";
      const registrationMonth = hasRegistration ? registrationRaw.substring(4, 6) : "";

      const rawPrice = data.price?.consumerPriceGross ?? "";
      const priceValue = Number.parseFloat(rawPrice);
      const formattedPrice = Number.isFinite(priceValue)
        ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(priceValue)
        : decodeHtmlEntities(rawPrice);

      const brand = decodeHtmlEntities(data.make);
      const modelName = decodeHtmlEntities(data.model);
      const modelDescription = decodeHtmlEntities(data.modelDescription || "");
      const type = modelDescription.replace(modelName, "").trim() || modelDescription;
      const powerValue = typeof data.power === "number" && Number.isFinite(data.power) ? data.power : null;
      const powerPS = powerValue !== null ? Math.round(powerValue * 1.35962) : null;

      const detailsParts: string[] = [];
      if (hasRegistration) {
        detailsParts.push(`EZ ${registrationMonth}/${registrationYear}`);
      }
      if (Number.isFinite(data.mileage)) {
        detailsParts.push(`${data.mileage.toLocaleString("de-DE")} km`);
      }
      if (powerPS !== null) {
        detailsParts.push(`${powerPS} PS`);
      }

      return {
        id,
        url,
        brand,
        model: modelName,
        type,
        price: formattedPrice,
        details: detailsParts.join(" • "),
        image: data.images?.[0]?.xl || "https://miro.medium.com/v2/resize:fit:2000/1*Vr1QMhcNNRpudBxNk9034A.jpeg",
      };
    });
  } catch (error) {
    console.error("An error occurred while fetching vehicles:", error);
    return [];
  }
}

export { getVehicles };
