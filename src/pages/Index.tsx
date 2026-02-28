import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AdaptiveNav, { ViewType } from "@/components/AdaptiveNav";
import HubView from "@/views/HubView";
import GemVault from "@/views/GemVault";
import AgentBuilder from "@/views/AgentBuilder";
import NeuralSettings from "@/views/NeuralSettings";

const views: Record<ViewType, React.FC> = {
  hub: HubView,
  gems: GemVault,
  agents: AgentBuilder,
  neural: NeuralSettings,
};

const Index = () => {
  const [activeView, setActiveView] = useState<ViewType>("hub");
  const ActiveComponent = views[activeView];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Anti-gravity grid background */}
      <div className="fixed inset-0 grid-bg animate-grid-scroll opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-ruby/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main content - shifts right on desktop for sidebar */}
      <main className="relative z-10 max-w-lg mx-auto px-4 pt-12 pb-24 md:max-w-2xl lg:max-w-5xl lg:ml-56 lg:mr-auto lg:px-8 lg:pt-8 lg:pb-12 xl:max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      <AdaptiveNav active={activeView} onChange={setActiveView} />
    </div>
  );
};

export default Index;
