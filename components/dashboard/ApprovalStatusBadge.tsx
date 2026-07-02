import { Badge } from "@/components/ui/Badge";

const STATUS_VARIANTS: Record<string, "primary" | "secondary" | "outline"> = {
  pending: "outline",
  approved: "secondary",
  rejected: "outline",
};

export function ApprovalStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={STATUS_VARIANTS[status] || "outline"} className="capitalize">
      {status}
    </Badge>
  );
}
