import { cn } from "@/lib/utils";

interface CompatibilityBadgeProps {
  score: number;
  className?: string;
}

export function CompatibilityBadge({ score, className }: CompatibilityBadgeProps) {
  const getColorClass = (score: number) => {
    if (score >= 90) return "bg-compatibility-excellent text-white shadow-glow";
    if (score >= 80) return "bg-compatibility-high text-white";
    if (score >= 70) return "bg-compatibility-good text-white";
    if (score >= 60) return "bg-compatibility-medium text-white";
    return "bg-compatibility-low text-white";
  };

  const getLabel = (score: number) => {
    if (score >= 90) return "Perfect Match";
    if (score >= 80) return "Great Match";
    if (score >= 70) return "Good Match";
    if (score >= 60) return "Fair Match";
    return "Low Match";
  };

  return (
    <div className={cn(
      "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105",
      getColorClass(score),
      className
    )}>
      <span className="text-xs opacity-90 mr-1">{score}%</span>
      {getLabel(score)}
    </div>
  );
}