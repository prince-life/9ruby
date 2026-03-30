import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="tech-label mb-4 block opacity-50">ERROR: ROUTE_NOT_FOUND</span>
          <h1 className="font-headline text-[clamp(80px,15vw,160px)] font-bold leading-none tracking-tight">
            404
          </h1>
        </motion.div>

        <motion.p
          className="font-mono text-[11px] uppercase tracking-tech text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Target path <span className="text-foreground">{location.pathname}</span> does not exist
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border font-mono text-[10px] uppercase tracking-tech-wide text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-colors min-h-[44px]"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Return to Terminal
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
