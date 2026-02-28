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
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agent Builder</h1>
          <p className="text-xs text-muted-foreground mt-1">Automate your workflows</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-amber">
          <Loader2 size={12} className="animate-spin" />
          AI Optimizing...
        </div>
      </motion.div>

      {/* Automations */}
      <div className="space-y-3">
        {automations.map((auto, i) => (
          <GlassCard
            key={auto.id}
            variant="interactive"
            className="p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3">
              {/* Status */}
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${auto.active ? "bg-emerald animate-pulse" : "bg-muted-foreground/30"}`} />

              {/* Trigger */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <auto.triggerIcon size={14} className="text-sapphire" />
                </div>
                <span className="text-sm truncate">{auto.trigger}</span>
              </div>

              <ArrowRight size={14} className="text-muted-foreground flex-shrink-0" />

              {/* Action */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <auto.actionIcon size={14} className="text-ruby" />
                </div>
                <span className="text-sm truncate">{auto.action}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Add New */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="w-full py-4 rounded-2xl border-2 border-dashed border-border hover:border-ruby/30 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <Plus size={18} />
        <span className="text-sm font-medium">Create New Automation</span>
      </motion.button>
    </div>
  );
};

export default AgentBuilder;
