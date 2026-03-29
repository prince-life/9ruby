import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, GitBranch, Star, GitFork, RefreshCw, ExternalLink, Lock, Unlock } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
  language: string | null;
  private: boolean;
  updated_at: string;
}

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  html_url: string;
}

const GitHubView = () => {
  const [token, setToken] = useState("");
  const [inputToken, setInputToken] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(false);
  const [commitsLoading, setCommitsLoading] = useState(false);
  const [error, setError] = useState("");
  const [commitsError, setCommitsError] = useState("");
  const [username, setUsername] = useState("");

  const connect = async () => {
    if (!inputToken.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.github.com/user", {
        headers: { Authorization: `token ${inputToken.trim()}` },
      });
      if (!res.ok) throw new Error("Invalid token or insufficient permissions");
      const user = await res.json();
      setUsername(user.login);
      setToken(inputToken.trim());
      const repoRes = await fetch(
        `https://api.github.com/user/repos?sort=updated&per_page=20`,
        { headers: { Authorization: `token ${inputToken.trim()}` } }
      );
      if (!repoRes.ok) throw new Error("Failed to fetch repositories");
      const repoData = await repoRes.json();
      setRepos(repoData);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Connection failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchCommits = async (repo: Repo) => {
    setSelectedRepo(repo);
    setCommitsLoading(true);
    setCommits([]);
    setCommitsError("");
    try {
      const res = await fetch(
        `https://api.github.com/repos/${repo.full_name}/commits?per_page=10`,
        { headers: { Authorization: `token ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch commits");
      const data = await res.json();
      setCommits(data);
    } catch (e: unknown) {
      setCommitsError(e instanceof Error ? e.message : "Failed to load commits");
    } finally {
      setCommitsLoading(false);
    }
  };

  const disconnect = () => {
    setToken("");
    setInputToken("");
    setRepos([]);
    setCommits([]);
    setSelectedRepo(null);
    setUsername("");
    setError("");
    setCommitsError("");
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end justify-between">
        <div>
          <span className="tech-label mb-2 block opacity-50">MODULE: INTEGRATION</span>
          <h1 className="font-headline text-4xl font-bold tracking-tight uppercase lg:text-5xl flex items-center gap-3">
            <Github size={28} strokeWidth={1.5} />
            GitHub
          </h1>
          <p className="tech-label mt-2">
            {token ? `CONNECTED // @${username.toUpperCase()}` : "Connect your GitHub account"}
          </p>
        </div>
        {token && (
          <button
            onClick={disconnect}
            className="flex items-center gap-1.5 tech-label border border-border px-3 py-1.5 hover:bg-foreground hover:text-background transition-all"
          >
            <Unlock size={10} /> DISCONNECT
          </button>
        )}
      </motion.div>

      {!token ? (
        <GlassCard variant="strong" className="p-6 space-y-5 lg:max-w-md">
          <div className="flex items-center gap-2">
            <Lock size={12} className="text-foreground" />
            <span className="font-mono text-[10px] uppercase tracking-tech font-medium">Personal Access Token</span>
          </div>
          <p className="tech-label leading-relaxed opacity-60">
            Enter a GitHub PAT with <code className="bg-muted px-1 text-foreground">repo</code> and{" "}
            <code className="bg-muted px-1 text-foreground">read:user</code> scopes.
          </p>
          <input
            type="password"
            value={inputToken}
            onChange={e => setInputToken(e.target.value)}
            onKeyDown={e => e.key === "Enter" && connect()}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full bg-transparent border-0 border-b border-border px-0 py-3 font-mono text-[10px] uppercase tracking-widest outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/40"
          />
          {error && <p className="tech-label text-destructive">{error}</p>}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={connect}
            disabled={loading || !inputToken.trim()}
            className="w-full py-3 bg-foreground text-background font-mono text-[10px] uppercase tracking-tech-wider border border-foreground disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
          >
            {loading ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Github size={14} />
            )}
            {loading ? "Connecting..." : "Connect to GitHub"}
          </motion.button>
        </GlassCard>
      ) : (
        <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-[1px] lg:bg-border lg:space-y-0">
          {/* Repositories */}
          <div className="space-y-0 lg:bg-background lg:p-0">
            <div className="mb-3 lg:px-0">
              <span className="tech-label opacity-50">
                REPOSITORIES ({repos.length})
              </span>
              <p className="tech-label mt-1 opacity-40 leading-relaxed">
                A repository contains project files, history, and collaboration tools.
              </p>
            </div>
            <div className="space-y-[1px] bg-border max-h-[60vh] overflow-y-auto scrollbar-hide">
              <AnimatePresence>
                {repos.map((repo, i) => (
                  <motion.div
                    key={repo.id}
                    className={`bg-[hsl(var(--surface))] p-4 cursor-pointer hover:bg-[hsl(var(--surface-elevated))] transition-colors ${selectedRepo?.id === repo.id ? "bg-[hsl(var(--surface-elevated))] border-l-2 border-l-foreground" : ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => fetchCommits(repo)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {repo.private ? (
                            <Lock size={9} className="text-muted-foreground flex-shrink-0" />
                          ) : (
                            <Unlock size={9} className="text-muted-foreground flex-shrink-0" />
                          )}
                          <span className="font-mono text-[11px] uppercase tracking-tech truncate">{repo.name}</span>
                          {repo.language && (
                            <span className="tech-label px-1.5 py-0.5 border border-border flex-shrink-0">
                              {repo.language}
                            </span>
                          )}
                        </div>
                        {repo.description && (
                          <p className="tech-label mt-1 opacity-50 truncate">{repo.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2 tech-label">
                          <span className="flex items-center gap-1">
                            <Star size={9} /> {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={9} /> {repo.forks_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitBranch size={9} /> {repo.default_branch}
                          </span>
                        </div>
                      </div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-muted-foreground hover:text-foreground flex-shrink-0 mt-0.5 transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Commits */}
          <div className="space-y-0 lg:bg-background lg:p-0">
            <div className="mb-3 lg:px-0">
              <span className="tech-label opacity-50">
                {selectedRepo ? `COMMITS // ${selectedRepo.name.toUpperCase()}` : "SELECT_REPO"}
              </span>
            </div>
            {commitsLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw size={16} className="animate-spin text-foreground" />
              </div>
            ) : selectedRepo ? (
              <div className="space-y-[1px] bg-border max-h-[60vh] overflow-y-auto scrollbar-hide">
                {commitsError && (
                  <p className="tech-label text-destructive text-center py-4">{commitsError}</p>
                )}
                {!commitsError && commits.length === 0 && !commitsLoading && (
                  <p className="tech-label text-center py-8 opacity-40">No commits found</p>
                )}
                {commits.map((commit, i) => (
                  <motion.div
                    key={commit.sha}
                    className="bg-[hsl(var(--surface))] p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-wide truncate leading-snug">
                          {commit.commit.message.split("\n")[0]}
                        </p>
                        <div className="flex items-center gap-2 mt-1 tech-label">
                          <span>{commit.commit.author.name}</span>
                          <span>·</span>
                          <span>{formatDate(commit.commit.author.date)}</span>
                        </div>
                        <span className="tech-label opacity-40 mt-1 block">
                          {commit.sha.slice(0, 7)}
                        </span>
                      </div>
                      <a
                        href={commit.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground flex-shrink-0 mt-0.5 transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="surface-card p-8 text-center">
                <GitBranch size={24} strokeWidth={1} className="text-muted-foreground/30 mx-auto mb-3" />
                <p className="tech-label opacity-40">Click a repository to view commits</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubView;
