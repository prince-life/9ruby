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
    <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0">
      {/* Left Column */}
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="tech-label mb-2 block opacity-50">CONFIG: NEURAL_SYS</span>
          <h1 className="font-headline text-4xl font-bold tracking-tight uppercase lg:text-5xl">Neural Settings</h1>
          <p className="tech-label mt-2">Adaptive system configuration</p>
        </motion.div>

        {/* Toggles */}
        <div className="space-y-[1px] bg-border">
          {settings.map((setting, i) => (
            <motion.div
              key={setting.id}
              className="bg-[hsl(var(--surface))] p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0 lg:w-12 lg:h-12">
                  <setting.icon size={16} strokeWidth={1.5} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-tech font-medium">{setting.label}</p>
                  <p className="tech-label mt-0.5 opacity-60">{setting.description}</p>
                </div>
                <button
                  onClick={() => toggle(setting.id)}
                  className={`w-12 h-6 transition-colors duration-300 flex items-center px-1 flex-shrink-0 min-w-[48px] min-h-[44px] ${
                    toggles[setting.id] ? "bg-foreground" : "bg-muted"
                  }`}
                >
                  <motion.div
                    className={`w-4 h-4 ${toggles[setting.id] ? "bg-background" : "bg-muted-foreground"}`}
                    animate={{ x: toggles[setting.id] ? 22 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column / Chart */}
      <div>
        <GlassCard variant="strong" className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} strokeWidth={1.5} className="text-foreground" />
              <span className="font-mono text-[11px] uppercase tracking-tech font-medium">System Intelligence</span>
            </div>
            <span className="tech-label opacity-40">DATA_VIS</span>
          </div>
          <div className="grid grid-cols-5 gap-3 lg:gap-4">
            {radarData.map((d, i) => (
              <motion.div
                key={d.label}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="relative w-full h-24 lg:h-40 flex items-end justify-center border-b border-border">
                  <motion.div
                    className="w-5 lg:w-6 bg-foreground"
                    initial={{ height: 0 }}
                    animate={{ height: `${d.value}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  />
                </div>
                <span className="tech-label">{d.label}</span>
                <span className="font-mono text-xs font-bold">{d.value}%</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default NeuralSettings;
