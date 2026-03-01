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
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl flex items-center gap-2">
            <Github size={24} className="text-ruby" />
            GitHub
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {token ? `Connected as @${username}` : "Connect your GitHub account"}
          </p>
        </div>
        {token && (
          <button
            onClick={disconnect}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full glass transition-colors"
          >
            <Unlock size={12} /> Disconnect
          </button>
        )}
      </motion.div>

      {!token ? (
        <GlassCard variant="strong" className="p-6 space-y-4 lg:max-w-md">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Lock size={14} className="text-ruby" />
            Personal Access Token
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enter a GitHub Personal Access Token with <code className="bg-secondary px-1 rounded text-xs">repo</code> and{" "}
            <code className="bg-secondary px-1 rounded text-xs">read:user</code> scopes to connect.
          </p>
          <input
            type="password"
            value={inputToken}
            onChange={e => setInputToken(e.target.value)}
            onKeyDown={e => e.key === "Enter" && connect()}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-ruby/50 transition-colors"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={connect}
            disabled={loading || !inputToken.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-ruby to-ruby-glow text-primary-foreground font-semibold text-sm ruby-glow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Github size={16} />
            )}
            {loading ? "Connecting…" : "Connect to GitHub"}
          </motion.button>
        </GlassCard>
      ) : (
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          {/* Repositories */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Repositories ({repos.length})
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A <strong>repository</strong> (repo) is a storage space where your project lives — it contains all of your project's files, revision history, and collaboration tools such as issues and pull requests.
            </p>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 scrollbar-hide">
              <AnimatePresence>
                {repos.map((repo, i) => (
                  <GlassCard
                    key={repo.id}
                    variant="interactive"
                    className={`p-4 cursor-pointer transition-colors ${selectedRepo?.id === repo.id ? "border-ruby/40 bg-ruby/5" : ""}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => fetchCommits(repo)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {repo.private ? (
                            <Lock size={11} className="text-muted-foreground flex-shrink-0" />
                          ) : (
                            <Unlock size={11} className="text-muted-foreground flex-shrink-0" />
                          )}
                          <span className="text-sm font-medium truncate">{repo.name}</span>
                          {repo.language && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground flex-shrink-0">
                              {repo.language}
                            </span>
                          )}
                        </div>
                        {repo.description && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">{repo.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star size={11} /> {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={11} /> {repo.forks_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitBranch size={11} /> {repo.default_branch}
                          </span>
                        </div>
                      </div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-muted-foreground hover:text-foreground flex-shrink-0 mt-0.5"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </GlassCard>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Commits */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {selectedRepo ? `Commits — ${selectedRepo.name}` : "Select a repo to view commits"}
            </h2>
            {commitsLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw size={20} className="animate-spin text-ruby" />
              </div>
            ) : selectedRepo ? (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 scrollbar-hide">
                {commitsError && (
                  <p className="text-xs text-destructive text-center py-4">{commitsError}</p>
                )}
                {!commitsError && commits.length === 0 && !commitsLoading && (
                  <p className="text-xs text-muted-foreground text-center py-8">No commits found</p>
                )}
                {commits.map((commit, i) => (
                  <GlassCard
                    key={commit.sha}
                    className="p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate leading-snug">
                          {commit.commit.message.split("\n")[0]}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{commit.commit.author.name}</span>
                          <span>·</span>
                          <span>{formatDate(commit.commit.author.date)}</span>
                        </div>
                        <span className="text-[10px] font-mono text-ruby/70 mt-1 block">
                          {commit.sha.slice(0, 7)}
                        </span>
                      </div>
                      <a
                        href={commit.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground flex-shrink-0 mt-0.5"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="p-8 text-center">
                <GitBranch size={32} className="text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Click a repository to view its recent commits</p>
              </GlassCard>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubView;
