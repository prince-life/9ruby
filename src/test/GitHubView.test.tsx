import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import GitHubView from "@/views/GitHubView";

// Stub framer-motion to avoid animation issues in tests
vi.mock("framer-motion", async () => {
  const React = await import("react");
  return {
    motion: new Proxy(
      {},
      {
        get: (_target, prop: string) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return ({ children, ...rest }: any) => {
            const { initial, animate, transition, whileTap, ...domProps } = rest;
            void initial; void animate; void transition; void whileTap;
            return React.createElement(prop, domProps, children);
          };
        },
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

const mockUser = { login: "testuser" };
const mockRepos = [
  {
    id: 1,
    name: "my-project",
    full_name: "testuser/my-project",
    description: "A test project",
    html_url: "https://github.com/testuser/my-project",
    stargazers_count: 3,
    forks_count: 1,
    default_branch: "main",
    language: "TypeScript",
    private: false,
    updated_at: "2024-01-01T00:00:00Z",
  },
];

describe("GitHubView", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes("/user") && !url.includes("/repos")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockUser) });
      }
      if (url.includes("/repos")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockRepos) });
      }
      return Promise.resolve({ ok: false });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the connect form in the disconnected state", () => {
    render(<GitHubView />);
    expect(screen.getByPlaceholderText(/ghp_/i)).toBeTruthy();
  });

  it("shows a repository definition after connecting", async () => {
    render(<GitHubView />);
    const input = screen.getByPlaceholderText(/ghp_/i);
    fireEvent.change(input, { target: { value: "ghp_testtoken" } });
    fireEvent.click(screen.getByRole("button", { name: /connect to github/i }));
    await waitFor(() =>
      expect(screen.getByText(/storage space where your project lives/i)).toBeTruthy()
    );
  });
});
