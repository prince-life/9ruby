import { motion } from "framer-motion";
import { Home, Gem, Bot, Brain, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export type ViewType = "hub" | "gems" | "agents" | "neural" | "github";

interface AdaptiveNavProps {
  active: ViewType;
  onChange: (view: ViewType) => void;
}

const tabs: { id: ViewType; icon: typeof Home; label: string; code: string }[] = [
  { id: "hub", icon: Home, label: "Hub", code: "CORE" },
  { id: "gems", icon: Gem, label: "Gems", code: "VAULT" },
  { id: "agents", icon: Bot, label: "Agents", code: "AUTO" },
  { id: "neural", icon: Brain, label: "Neural", code: "NRAL" },
  { id: "github", icon: Github, label: "GitHub", code: "GIT" },
];

const AdaptiveNav = ({ active, onChange }: AdaptiveNavProps) => {
  return (
    <>
      {/* Desktop Sidebar (>1024px) */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-50 w-56 flex-col surface-sidebar py-8 px-4">
        {/* Logo */}
        <div className="mb-12 px-2">
          <h2 className="font-headline text-xl font-bold tracking-[0.4em] uppercase">
            NVX
          </h2>
          <p className="tech-label mt-2 opacity-50">SYSTEM_ACTIVE</p>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-0.5 flex-1">
          {tabs.map(tab => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 outline-none border border-transparent",
                  isActive
                    ? "bg-[hsl(0,0%,12%)] text-foreground border-[hsl(0,0%,12%)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-[hsl(0,0%,8%)]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon size={16} strokeWidth={1.5} className={cn(isActive ? "text-foreground" : "text-muted-foreground")} />
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-tech-wide">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Status */}
        <div className="px-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse-glow" />
          <span className="tech-label">ONLINE</span>
        </div>
      </aside>

      {/* Mobile/Tablet Bottom Nav (<1024px) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 surface-nav safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4 md:max-w-2xl">
          {tabs.map(tab => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className="relative flex flex-col items-center gap-1 py-2 px-4 outline-none min-h-[44px] min-w-[44px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon
                  size={20}
                  strokeWidth={1.5}
                  className={cn(
                    "transition-colors duration-200",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                />
                <span className={cn(
                  "font-mono text-[8px] uppercase tracking-tech transition-colors duration-200",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}>
                  {tab.code}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default AdaptiveNav;
