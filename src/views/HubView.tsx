import { motion } from "framer-motion";
import { Scan, Zap, OctagonX } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import TerminalLog from "@/components/TerminalLog";

const quickActions = [
  { icon: Scan, label: "Scan NFC", shortcut: "⌘+K", code: "ACT_SCAN" },
  { icon: Zap, label: "Auto-Pilot", shortcut: "⌘+P", code: "ACT_AUTO" },
  { icon: OctagonX, label: "Emergency Stop", shortcut: "⌘+E", code: "ACT_HALT" },
];

const HubView = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-end justify-between"
      >
        <div>
          <span className="tech-label mb-2 block opacity-50">SYSTEM_CORE // NODE_00</span>
          <h1 className="font-headline text-4xl font-bold tracking-tight uppercase lg:text-5xl">
            Terminal
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
          <span className="tech-label">ONLINE</span>
        </div>
      </motion.div>

      {/* Terminal */}
      <TerminalLog />

      {/* Quick Actions */}
      <div>
        <span className="tech-label mb-4 block opacity-50">QUICK_ACTIONS</span>
        <div className="grid grid-cols-3 gap-[1px] bg-border">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              className="bg-[hsl(var(--surface))] p-5 flex flex-col items-center gap-3 min-h-[100px] hover:bg-[hsl(var(--surface-elevated))] transition-colors lg:flex-row lg:justify-start lg:gap-4 lg:items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <action.icon size={18} strokeWidth={1.5} className="text-foreground" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-mono text-[10px] uppercase tracking-tech-wide">{action.label}</span>
                <span className="hidden lg:block tech-label mt-1 opacity-40">{action.code}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div>
        <span className="tech-label mb-4 block opacity-50">SYSTEM_METRICS</span>
        <div className="grid grid-cols-2 gap-[1px] bg-border md:grid-cols-4">
          {[
            { label: "Active Gems", value: "3/7", code: "GEM_ACT" },
            { label: "Automations", value: "12", code: "AUTO_CT" },
            { label: "Devices", value: "5", code: "DEV_SYN" },
            { label: "Uptime", value: "99.7%", code: "SYS_UPT" },
          ].map((stat, i) => (
            <GlassCard
              key={stat.label}
              className="p-5 bg-[hsl(var(--surface))] border-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="tech-label opacity-40">{stat.code}</span>
              <p className="font-headline text-2xl font-bold mt-2 uppercase">{stat.value}</p>
              <p className="tech-label mt-1">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HubView;
