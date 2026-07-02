import { Badge } from "@/components/ui/Badge";

const STATUS_LABELS: Record<string, string> = {
  pending: "Awaiting Quotes",
  quoted: "Quotes Received",
  closed: "Closed",
};

const STATUS_VARIANTS: Record<string, "primary" | "secondary" | "outline"> = {
  pending: "outline",
  quoted: "secondary",
  closed: "primary",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={STATUS_VARIANTS[status] || "outline"}>
      {STATUS_LABELS[status] || status}
    </Badge>
  );
}
