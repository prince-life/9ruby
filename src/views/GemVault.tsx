import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Gem3D, { GemType, gemColors } from "@/components/Gem3D";
import GlassCard from "@/components/GlassCard";
import { Zap, Link, Scan } from "lucide-react";

interface GemData {
  type: GemType;
  active: boolean;
  power: number;
  agent: string;
}

const gems: GemData[] = [
  { type: "ruby", active: true, power: 73, agent: "Code Assistant" },
  { type: "sapphire", active: true, power: 91, agent: "Data Analyzer" },
  { type: "emerald", active: true, power: 55, agent: "Security Shield" },
  { type: "amber", active: false, power: 0, agent: "Flux Optimizer" },
  { type: "amethyst", active: false, power: 0, agent: "Vision Sight" },
  { type: "topaz", active: false, power: 0, agent: "Forge Builder" },
  { type: "diamond", active: false, power: 0, agent: "Apex Controller" },
];

const GemVault = () => {
  const [selected, setSelected] = useState<GemType>("ruby");
  const selectedGem = gems.find(g => g.type === selected)!;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold tracking-tight">Gem Vault</h1>
        <p className="text-xs text-muted-foreground mt-1">Collect & activate NFC gems</p>
      </motion.div>

      {/* Gem Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
        {gems.map(gem => (
          <Gem3D
            key={gem.type}
            type={gem.type}
            active={gem.active}
            selected={selected === gem.type}
            size="md"
            onClick={() => setSelected(gem.type)}
          />
        ))}
      </div>

      {/* Detail Card */}
      <AnimatePresence mode="wait">
        <GlassCard
          key={selected}
          variant="strong"
          className="p-6 space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{gemColors[selected].label}</h2>
            <span className={`text-xs px-2 py-1 rounded-full ${selectedGem.active ? "bg-emerald/20 text-emerald" : "bg-muted text-muted-foreground"}`}>
              {selectedGem.active ? "Active" : "Locked"}
            </span>
          </div>

          {/* Power Bar */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1"><Zap size={12} /> Power Level</span>
              <span>{selectedGem.power}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-ruby to-ruby-glow"
                initial={{ width: 0 }}
                animate={{ width: `${selectedGem.power}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Linked Agent */}
          <div className="flex items-center gap-2 text-sm">
            <Link size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Linked Agent:</span>
            <span className="font-medium">{selectedGem.agent}</span>
          </div>

          {/* Action Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
              selectedGem.active
                ? "bg-gradient-to-r from-ruby to-ruby-glow text-primary-foreground ruby-glow-sm"
                : "glass border border-border text-muted-foreground"
            }`}
          >
            {selectedGem.active ? "Activate Agent" : (
              <span className="flex items-center justify-center gap-2">
                <Scan size={16} /> Scan NFC to Unlock
              </span>
            )}
          </motion.button>
        </GlassCard>
      </AnimatePresence>
    </div>
  );
};

export default GemVault;
