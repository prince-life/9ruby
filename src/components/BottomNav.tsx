import { motion } from "framer-motion";
import { Home, Gem, Bot, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewType = "hub" | "gems" | "agents" | "neural";

interface BottomNavProps {
  active: ViewType;
  onChange: (view: ViewType) => void;
}

const tabs: { id: ViewType; icon: typeof Home; label: string }[] = [
  { id: "hub", icon: Home, label: "Hub" },
  { id: "gems", icon: Gem, label: "Gems" },
  { id: "agents", icon: Bot, label: "Agents" },
  { id: "neural", icon: Brain, label: "Neural" },
];

const BottomNav = ({ active, onChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
        {tabs.map(tab => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex flex-col items-center gap-1 py-2 px-4 outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-ruby to-ruby-glow"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon
                size={22}
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-ruby" : "text-muted-foreground"
                )}
              />
              <span className={cn(
                "text-[10px] font-medium transition-colors duration-200",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
