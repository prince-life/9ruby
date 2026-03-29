import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const mockLogs = [
  { text: "→ System initialized. NovaVox Terminal v1.0.0", type: "system" },
  { text: "→ Neural mesh connecting...", type: "info" },
  { text: "✓ Device Alpha-7 synced successfully", type: "success" },
  { text: "→ AI optimization pass #247 complete", type: "info" },
  { text: "✓ User beacon detected: proximity 2.4m", type: "success" },
  { text: "⚠ NFC gem resonance low — recharge recommended", type: "warning" },
  { text: "→ Cross-platform bridge established", type: "info" },
  { text: "✓ Emerald Shield agent activated", type: "success" },
  { text: "→ Processing neural pathway delta-9...", type: "info" },
  { text: "✓ Automation workflow 'Morning Sync' executed", type: "success" },
  { text: "→ Scanning for new NFC gems in range...", type: "info" },
  { text: "⚠ Ruby Core power at 73% — optimizing", type: "warning" },
  { text: "✓ Data stream integrity verified", type: "success" },
  { text: "→ Anti-gravity field stable", type: "info" },
];

const typeColors: Record<string, string> = {
  system: "text-foreground",
  info: "text-muted-foreground",
  success: "text-foreground/80",
  warning: "text-muted-foreground",
};

const TerminalLog = () => {
  const [logs, setLogs] = useState(mockLogs.slice(0, 5));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const nextIndex = prev.length % mockLogs.length;
        const newLog = mockLogs[nextIndex];
        const updated = [...prev, newLog];
        return updated.length > 20 ? updated.slice(-20) : updated;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="surface-card-elevated overflow-hidden">
      <div className="px-4 py-2 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse-glow" />
          <span className="tech-label">LIVE_STREAM</span>
        </div>
        <span className="tech-label opacity-40">TTY_001</span>
      </div>
      <div
        ref={scrollRef}
        className="p-4 h-48 overflow-y-auto space-y-1.5 font-mono text-[10px] leading-relaxed tracking-wide"
      >
        {logs.map((log, i) => (
          <motion.div
            key={`${i}-${log.text}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={typeColors[log.type] || "text-foreground"}
          >
            {log.text}
          </motion.div>
        ))}
        <span className="inline-block w-1.5 h-3 bg-foreground animate-terminal-blink" />
      </div>
    </div>
  );
};

export default TerminalLog;
