import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type GemType = "ruby" | "sapphire" | "emerald" | "amber" | "amethyst" | "topaz" | "diamond";

interface Gem3DProps {
  type: GemType;
  active?: boolean;
  selected?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const gemColors: Record<GemType, { label: string; code: string }> = {
  ruby: { label: "Ruby Core", code: "RBY" },
  sapphire: { label: "Sapphire Mind", code: "SPH" },
  emerald: { label: "Emerald Shield", code: "EMR" },
  amber: { label: "Amber Flux", code: "AMB" },
  amethyst: { label: "Amethyst Sight", code: "AMT" },
  topaz: { label: "Topaz Forge", code: "TPZ" },
  diamond: { label: "Diamond Apex", code: "DMD" },
};

const sizes = {
  sm: "w-14 h-14",
  md: "w-20 h-20",
  lg: "w-28 h-28",
};

const Gem3D = ({ type, active = false, selected = false, size = "md", onClick }: Gem3DProps) => {
  const gem = gemColors[type];

  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-2 outline-none"
      whileTap={{ scale: 0.95 }}
      animate={selected ? { y: -8 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className={cn(
          sizes[size],
          "relative flex items-center justify-center",
          active ? "animate-float" : ""
        )}
        animate={selected ? { scale: 1.1 } : { scale: 1 }}
      >
        {/* Gem shape — monochrome */}
        <div
          className={cn(
            "w-full h-full transition-all duration-500",
            active
              ? cn(
                  "bg-foreground",
                  selected && "animate-pulse-glow"
                )
              : "bg-muted border border-border"
          )}
          style={{
            clipPath: "polygon(50% 0%, 100% 35%, 85% 100%, 15% 100%, 0% 35%)",
          }}
        />
        {/* Inner highlight */}
        {active && (
          <div
            className="absolute inset-3 bg-background opacity-30"
            style={{
              clipPath: "polygon(50% 0%, 100% 35%, 85% 100%, 15% 100%, 0% 35%)",
            }}
          />
        )}
        {/* Lock icon for inactive */}
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="1" ry="1" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        )}
      </motion.div>
      <span className={cn(
        "font-mono text-[8px] uppercase tracking-tech transition-colors",
        active ? "text-foreground" : "text-muted-foreground"
      )}>
        {gem.code}
      </span>
    </motion.button>
  );
};

export { gemColors };
export default Gem3D;
