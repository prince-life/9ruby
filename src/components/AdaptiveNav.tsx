import { motion } from "framer-motion";
import { Home, Gem, Bot, Brain, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export type ViewType = "hub" | "gems" | "agents" | "neural" | "github";

interface AdaptiveNavProps {
  active: ViewType;
  onChange: (view: ViewType) => void;
}

const tabs: { id: ViewType; icon: typeof Home; label: string }[] = [
  { id: "hub", icon: Home, label: "Hub" },
  { id: "gems", icon: Gem, label: "Gems" },
  { id: "agents", icon: Bot, label: "Agents" },
  { id: "neural", icon: Brain, label: "Neural" },
  { id: "github", icon: Github, label: "GitHub" },
];

const AdaptiveNav = ({ active, onChange }: AdaptiveNavProps) => {
  return (
    <>
      {/* Desktop Sidebar (>1024px) */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-50 w-56 flex-col glass-sidebar py-8 px-4">
        {/* Logo */}
        <div className="mb-10 px-2">
          <h2 className="text-lg font-bold tracking-tight">
            <span className="text-gradient-ruby">9 Ruby</span>
          </h2>
          <p className="text-[10px] text-muted-foreground mt-0.5">Command Center v2.1</p>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 flex-1">
          {tabs.map(tab => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 outline-none",
                  isActive
                    ? "bg-ruby/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-ruby to-ruby-glow"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon size={18} className={cn(isActive ? "text-ruby" : "text-muted-foreground")} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Status */}
        <div className="px-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="text-xs text-emerald font-medium">System Online</span>
        </div>
      </aside>

      {/* Mobile/Tablet Bottom Nav (<1024px) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav safe-area-bottom">
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
    </>
  );
};

export default AdaptiveNav;
