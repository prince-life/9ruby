import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AdaptiveNav, { ViewType } from "@/components/AdaptiveNav";
import HubView from "@/views/HubView";
import GemVault from "@/views/GemVault";
import AgentBuilder from "@/views/AgentBuilder";
import NeuralSettings from "@/views/NeuralSettings";
import GitHubView from "@/views/GitHubView";

const views: Record<ViewType, React.FC> = {
  hub: HubView,
  gems: GemVault,
  agents: AgentBuilder,
  neural: NeuralSettings,
  github: GitHubView,
};

const Index = () => {
  const [activeView, setActiveView] = useState<ViewType>("hub");
  const ActiveComponent = views[activeView];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-100 pointer-events-none" />

      {/* Main content */}
      <main className="relative z-10 max-w-lg mx-auto px-6 pt-12 pb-24 md:max-w-2xl lg:max-w-5xl lg:ml-56 lg:mr-auto lg:px-12 lg:pt-10 lg:pb-12 xl:max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
