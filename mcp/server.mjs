import path from "node:path";
import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const execFileAsync = promisify(execFile);
const projectRoot = process.cwd();

const server = new McpServer(
  {
    name: "movie-theater-qa",
    version: "1.0.0",
  },
  {
    instructions:
      "Use list_test_files before reading files. Use run_playwright only for Playwright test commands.",
  },
);

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function resolveInsideProject(inputPath) {
  const resolved = path.resolve(projectRoot, inputPath);
  const rootWithSep = projectRoot.endsWith(path.sep)
    ? projectRoot
    : projectRoot + path.sep;

  if (resolved !== projectRoot && !resolved.startsWith(rootWithSep)) {
    throw new Error("Path must stay inside the project folder.");
  }

  return resolved;
}

async function walk(dir, files = []) {
  const entries = await import("node:fs/promises").then((fs) =>
    fs.readdir(dir, { withFileTypes: true }),
  );

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath, files);
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

server.tool(
  "list_test_files",
  "List Playwright test files in the QA project.",
  {
    root: z.string().default("tests").describe("Folder to scan"),
  },
  async ({ root }) => {
    const rootDir = resolveInsideProject(root);
    const files = await walk(rootDir);

    const testFiles = files
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
      .map((file) => toPosix(path.relative(projectRoot, file)));

    return {
      content: [
        {
          type: "text",
          text: testFiles.length
            ? testFiles.join("\n")
            : "No test files found.",
        },
      ],
    };
  },
);

server.tool(
  "read_file",
  "Read a text file from the QA project.",
  {
    filePath: z.string().describe("Project-relative file path"),
  },
  async ({ filePath }) => {
    const fullPath = resolveInsideProject(filePath);
    const text = await readFile(fullPath, "utf8");

    return {
      content: [
        {
          type: "text",
          text,
        },
      ],
    };
  },
);

server.tool(
  "run_playwright",
  "Run a Playwright test command from the QA project.",
  {
    target: z.string().default("").describe("File, folder, or test pattern"),
    headed: z.boolean().default(false),
    ui: z.boolean().default(false),
  },
  async ({ target, headed, ui }) => {
    const args = ["playwright", "test"];

    if (target) args.push(target);
    if (headed) args.push("--headed");
    if (ui) args.push("--ui");

    try {
      const result = await execFileAsync("npx", args, {
        cwd: projectRoot,
        maxBuffer: 10 * 1024 * 1024,
      });

      return {
        content: [
          {
            type: "text",
            text: `${result.stdout}${result.stderr}`,
          },
        ],
      };
    } catch (error) {
      const stdout = error.stdout ?? "";
      const stderr = error.stderr ?? "";
      const message = error.message ?? "Playwright run failed";

      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `${message}\n${stdout}${stderr}`,
          },
        ],
      };
    }
  },
);

await server.connect(new StdioServerTransport());
