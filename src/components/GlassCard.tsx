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
        variant === "strong" ? "surface-card-elevated" : "surface-card",
        variant === "interactive" && "cursor-pointer hover:bg-[hsl(0,0%,12%)] transition-colors duration-300",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
