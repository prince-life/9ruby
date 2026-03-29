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
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <span className="tech-label mb-2 block opacity-50">INDEX: VAULT_01</span>
        <h1 className="font-headline text-4xl font-bold tracking-tight uppercase lg:text-5xl">Gem Vault</h1>
        <p className="tech-label mt-2">Collect & activate NFC gems</p>
      </motion.div>

      {/* Gems — horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide lg:grid lg:grid-cols-7 lg:overflow-visible lg:mx-0 lg:px-0 lg:gap-6">
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
          className="p-6 space-y-5 lg:max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-lg font-bold uppercase tracking-wide">{gemColors[selected].label}</h2>
            <span className={`tech-label px-2 py-1 border ${selectedGem.active ? "border-foreground/30 text-foreground" : "border-border text-muted-foreground"}`}>
              {selectedGem.active ? "ACTIVE" : "LOCKED"}
            </span>
          </div>

          {/* Power Bar */}
          <div>
            <div className="flex justify-between tech-label mb-2">
              <span className="flex items-center gap-1"><Zap size={10} /> POWER_LEVEL</span>
              <span>{selectedGem.power}%</span>
            </div>
            <div className="h-[2px] bg-border overflow-hidden">
              <motion.div
                className="h-full bg-foreground"
                initial={{ width: 0 }}
                animate={{ width: `${selectedGem.power}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Linked Agent */}
          <div className="flex items-center gap-2">
            <Link size={12} className="text-muted-foreground" />
            <span className="tech-label">LINKED_AGENT:</span>
            <span className="font-mono text-[10px] uppercase tracking-tech text-foreground">{selectedGem.agent}</span>
          </div>

          {/* Action Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 font-mono text-[10px] uppercase tracking-tech-wider transition-all min-h-[44px] border ${
              selectedGem.active
                ? "bg-foreground text-background border-foreground hover:bg-foreground/90"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground/30"
            }`}
          >
            {selectedGem.active ? "Activate Agent" : (
              <span className="flex items-center justify-center gap-2">
                <Scan size={14} /> Scan NFC to Unlock
              </span>
            )}
          </motion.button>
        </GlassCard>
      </AnimatePresence>
    </div>
  );
};

export default GemVault;
