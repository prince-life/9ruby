import { motion } from "framer-motion";
import { Scan, Zap, OctagonX } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import TerminalLog from "@/components/TerminalLog";

const quickActions = [
  { icon: Scan, label: "Scan NFC", shortcut: "⌘+K", color: "from-ruby to-ruby-glow" },
  { icon: Zap, label: "Auto-Pilot", shortcut: "⌘+P", color: "from-sapphire to-blue-400" },
  { icon: OctagonX, label: "Emergency Stop", shortcut: "⌘+E", color: "from-destructive to-red-400" },
];

const HubView = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
            <span className="text-gradient-ruby">NovaVox</span>{" "}
            <span className="text-foreground">Terminal</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Web Command Center</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="text-xs text-emerald font-medium">Online</span>
        </div>
      </motion.div>

      {/* Terminal */}
      <TerminalLog />

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          {quickActions.map((action, i) => (
            <GlassCard
              key={action.label}
              variant="interactive"
              className="p-4 flex flex-col items-center gap-3 min-h-[88px] lg:p-6 lg:flex-row lg:justify-start lg:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}>
                <action.icon size={20} className="text-primary-foreground" />
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xs font-medium text-center lg:text-sm">{action.label}</span>
                <span className="hidden lg:block text-[10px] text-muted-foreground font-mono mt-0.5">{action.shortcut}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Active Gems</p>
          <p className="text-2xl font-bold text-gradient-ruby mt-1">3/7</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Automations</p>
          <p className="text-2xl font-bold text-sapphire mt-1">12</p>
        </GlassCard>
        <GlassCard className="p-4 hidden md:block">
          <p className="text-xs text-muted-foreground">Devices</p>
          <p className="text-2xl font-bold text-emerald mt-1">5</p>
        </GlassCard>
        <GlassCard className="p-4 hidden md:block">
          <p className="text-xs text-muted-foreground">Uptime</p>
          <p className="text-2xl font-bold text-amber mt-1">99.7%</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default HubView;
