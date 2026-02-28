import { useState } from "react";
import { motion } from "framer-motion";
import { Wifi, Brain, Globe, TrendingUp } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface ToggleSetting {
  id: string;
  label: string;
  description: string;
  icon: typeof Wifi;
  defaultOn: boolean;
}

const settings: ToggleSetting[] = [
  { id: "auto-sync", label: "Auto-Sync Devices", description: "Continuously scan and sync nearby devices", icon: Wifi, defaultOn: true },
  { id: "learn", label: "Learn from Behavior", description: "AI adapts to your usage patterns", icon: Brain, defaultOn: true },
  { id: "bridge", label: "Cross-Platform Bridge", description: "Share data across iPad, iPhone & Windows", icon: Globe, defaultOn: false },
];

const radarData = [
  { label: "Speed", value: 85 },
  { label: "Accuracy", value: 72 },
  { label: "Learning", value: 91 },
  { label: "Security", value: 68 },
  { label: "Sync", value: 78 },
];

const NeuralSettings = () => {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(settings.map(s => [s.id, s.defaultOn]))
  );

  const toggle = (id: string) => setToggles(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
      {/* Left Column */}
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Neural Settings</h1>
          <p className="text-xs text-muted-foreground mt-1">Adaptive system configuration</p>
        </motion.div>

        {/* Toggles */}
        <div className="space-y-3">
          {settings.map((setting, i) => (
            <GlassCard
              key={setting.id}
              className="p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 lg:w-12 lg:h-12">
                  <setting.icon size={18} className="text-ruby" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{setting.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{setting.description}</p>
                </div>
                <button
                  onClick={() => toggle(setting.id)}
                  className={`w-12 h-7 rounded-full transition-colors duration-300 flex items-center px-1 flex-shrink-0 min-w-[48px] min-h-[44px] ${
                    toggles[setting.id] ? "bg-ruby" : "bg-muted"
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-primary-foreground"
                    animate={{ x: toggles[setting.id] ? 18 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Right Column / Chart */}
      <div>
        <GlassCard className="p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-ruby" />
            <h2 className="text-sm font-semibold lg:text-base">System Intelligence</h2>
          </div>
          <div className="grid grid-cols-5 gap-2 lg:gap-4">
            {radarData.map((d, i) => (
              <motion.div
                key={d.label}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="relative w-full h-24 lg:h-40 flex items-end justify-center">
                  <motion.div
                    className="w-6 lg:w-8 rounded-t-md bg-gradient-to-t from-ruby to-ruby-glow"
                    initial={{ height: 0 }}
                    animate={{ height: `${d.value}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] lg:text-xs text-muted-foreground">{d.label}</span>
                <span className="text-xs lg:text-sm font-mono font-bold">{d.value}%</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default NeuralSettings;
