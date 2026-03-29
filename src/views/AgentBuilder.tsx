import { motion } from "framer-motion";
import { Bot, Wifi, Mail, Shield, Loader2, Plus, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface Automation {
  id: number;
  trigger: string;
  triggerIcon: typeof Wifi;
  action: string;
  actionIcon: typeof Mail;
  active: boolean;
}

const automations: Automation[] = [
  { id: 1, trigger: "Device Connected", triggerIcon: Wifi, action: "Send Alert", actionIcon: Mail, active: true },
  { id: 2, trigger: "NFC Scanned", triggerIcon: Shield, action: "Activate Agent", actionIcon: Bot, active: true },
  { id: 3, trigger: "Low Power", triggerIcon: Shield, action: "Auto-Optimize", actionIcon: Bot, active: false },
];

const AgentBuilder = () => {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end justify-between">
        <div>
          <span className="tech-label mb-2 block opacity-50">MODULE: AUTOMATION</span>
          <h1 className="font-headline text-4xl font-bold tracking-tight uppercase lg:text-5xl">Agent Builder</h1>
          <p className="tech-label mt-2">Automate your workflows</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-border tech-label">
          <Loader2 size={10} className="animate-spin" />
          AI_OPTIMIZING
        </div>
      </motion.div>

      {/* Automations */}
      <div className="space-y-[1px] bg-border lg:grid lg:grid-cols-2 lg:gap-[1px] lg:space-y-0">
        {automations.map((auto, i) => (
          <motion.div
            key={auto.id}
            className="bg-[hsl(var(--surface))] p-5 hover:bg-[hsl(var(--surface-elevated))] transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3">
              {/* Status */}
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${auto.active ? "bg-foreground animate-pulse" : "bg-muted-foreground/30"}`} />

              {/* Trigger */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0 lg:w-10 lg:h-10">
                  <auto.triggerIcon size={14} strokeWidth={1.5} className="text-foreground" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-tech truncate">{auto.trigger}</span>
              </div>

              <ArrowRight size={12} className="text-muted-foreground flex-shrink-0" />

              {/* Action */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0 lg:w-10 lg:h-10">
                  <auto.actionIcon size={14} strokeWidth={1.5} className="text-foreground" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-tech truncate">{auto.action}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add New */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 border border-dashed border-border hover:border-foreground/30 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground min-h-[44px] lg:max-w-sm"
      >
        <Plus size={16} strokeWidth={1.5} />
        <span className="font-mono text-[10px] uppercase tracking-tech-wide">Create New Automation</span>
      </motion.button>
    </div>
  );
};

export default AgentBuilder;
