import { cn } from "@/lib/utils";

interface CompatibilityBadgeProps {
  score: number;
  className?: string;
}

export function CompatibilityBadge({ score, className }: CompatibilityBadgeProps) {
  const getColorClass = (score: number) => {
    if (score >= 80) return "bg-compatibility-high text-white";
    if (score >= 60) return "bg-compatibility-medium text-white";
    return "bg-compatibility-low text-white";
  };

  return (
    <div className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
      getColorClass(score),
      className
    )}>
      {score}% Match
    </div>
  );
}