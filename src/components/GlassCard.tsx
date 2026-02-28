import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "strong" | "interactive";
  children: React.ReactNode;
}

const GlassCard = ({ variant = "default", className, children, ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        variant === "strong" ? "glass-strong" : "glass",
        variant === "interactive" && "cursor-pointer hover:bg-[hsl(var(--glass)/0.1)] transition-colors duration-300",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
