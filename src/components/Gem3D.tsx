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

const gemColors: Record<GemType, { main: string; glow: string; label: string }> = {
  ruby: { main: "from-ruby to-ruby-glow", glow: "shadow-[0_0_30px_hsl(347,77%,50%,0.5)]", label: "Ruby Core" },
  sapphire: { main: "from-sapphire to-blue-400", glow: "shadow-[0_0_30px_hsl(217,91%,60%,0.5)]", label: "Sapphire Mind" },
  emerald: { main: "from-emerald to-green-400", glow: "shadow-[0_0_30px_hsl(160,84%,39%,0.5)]", label: "Emerald Shield" },
  amber: { main: "from-amber to-yellow-400", glow: "shadow-[0_0_30px_hsl(38,92%,50%,0.5)]", label: "Amber Flux" },
  amethyst: { main: "from-amethyst to-purple-400", glow: "shadow-[0_0_30px_hsl(271,76%,53%,0.5)]", label: "Amethyst Sight" },
  topaz: { main: "from-topaz to-orange-400", glow: "shadow-[0_0_30px_hsl(25,95%,53%,0.5)]", label: "Topaz Forge" },
  diamond: { main: "from-diamond to-white", glow: "shadow-[0_0_30px_hsl(200,18%,80%,0.5)]", label: "Diamond Apex" },
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
      animate={selected ? { y: -12 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className={cn(
          sizes[size],
          "relative flex items-center justify-center",
          active ? "animate-float" : ""
        )}
        animate={selected ? { scale: 1.15 } : { scale: 1 }}
      >
        {/* Gem shape */}
        <div
          className={cn(
            "w-full h-full rounded-lg rotate-45 transition-all duration-500",
            active
              ? cn("bg-gradient-to-br", gem.main, gem.glow)
              : "bg-muted/50 border border-border",
            selected && active && "animate-pulse-glow"
          )}
          style={{
            clipPath: "polygon(50% 0%, 100% 35%, 85% 100%, 15% 100%, 0% 35%)",
            transform: "rotate(0deg)",
          }}
        />
        {/* Inner glow */}
        {active && (
          <div
            className={cn(
              "absolute inset-2 rounded-lg opacity-50 bg-gradient-to-br",
              gem.main
            )}
            style={{
              clipPath: "polygon(50% 0%, 100% 35%, 85% 100%, 15% 100%, 0% 35%)",
              filter: "blur(4px)",
            }}
          />
        )}
        {/* Lock icon for inactive */}
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        )}
      </motion.div>
      <span className={cn(
        "text-xs font-medium transition-colors",
        active ? "text-foreground" : "text-muted-foreground"
      )}>
        {gem.label}
      </span>
    </motion.button>
  );
};

export { gemColors };
export default Gem3D;
