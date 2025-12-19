import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{
  className?: string;
  interactive?: boolean;
}>;

export function StyledCard({ className, children, interactive = false }: Props) {
  const classes = cn(
    "h-full",
    interactive && "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
    className
  );
  return <Card className={classes}>{children}</Card>;
}
