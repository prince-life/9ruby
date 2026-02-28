# 9 Ruby Command Center

A unified, AI-powered command center combining robust automation infrastructure with a premium UI/UX. Built with React, TypeScript, Vite, shadcn/ui, and Tailwind CSS.

## 🚀 Live Deployment

> **[Open App →](https://ruby-command.lovable.app)**

## ✨ Features

### 🏠 Hub
The main command center dashboard with real-time terminal output, quick-action shortcuts (Scan NFC, Auto-Pilot, Emergency Stop), and live system stats (active gems, automations, devices, uptime).

### 💎 Gem Vault
Collect and activate NFC-linked gems (Ruby, Sapphire, Emerald, Amber, Amethyst, Topaz, Diamond). Each gem maps to an AI agent with a live power meter and one-tap activation.

### 🤖 Agent Builder
Create and manage trigger→action automations. Built-in AI optimization indicator continuously tunes active workflows. Supports device events, NFC scans, power alerts, and more.

### 🧠 Neural Settings
Toggle adaptive AI behaviours (Auto-Sync, Learning Mode, Cross-Platform Bridge) and view the System Intelligence bar chart across five metrics: Speed, Accuracy, Learning, Security, and Sync.

### 🐙 GitHub Integration
Connect your GitHub account via a Personal Access Token to:
- Browse your repositories (public and private)
- View language, stars, forks, and default branch at a glance
- Inspect the 10 most recent commits per repository with direct links
- Open any repo or commit in GitHub with a single click

> **Required token scopes:** `repo`, `read:user`

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| State / Data | TanStack Query |
| Routing | React Router v6 |
| Testing | Vitest + Testing Library |

## 🏃 Running Locally

```sh
# 1. Clone the repository
git clone https://github.com/9Ruby-Git/ruby-command.git
cd ruby-command

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧪 Tests

```sh
npm test
```

## 📦 Build for Production

```sh
npm run build
```

Output is written to `dist/`.

## 📖 GitHub Integration — Usage Guide

1. Navigate to the **GitHub** tab (bottom nav on mobile, sidebar on desktop).
2. Generate a Personal Access Token in **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens** (or classic tokens) with `repo` and `read:user` scopes.
3. Paste the token and press **Connect to GitHub**.
4. Your repositories are loaded automatically, sorted by most recently updated.
5. Click any repository card to load its 10 most recent commits in the right panel.
6. Use the **↗** icon on any card to open it directly in GitHub.
7. Click **Disconnect** at any time to clear the session (your token is never stored on a server).

## 🤝 Contributing

Pull requests and issues are welcome. Please follow the existing code style and run `npm run lint` before submitting.
