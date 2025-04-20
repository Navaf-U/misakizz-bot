import { readdirSync } from "fs";
import { join } from "path";
import { Command } from "../types/type";

export async function loadCommands(): Promise<Command[]> {
  const commandFiles = readdirSync(join(__dirname, "../commands")).filter(
    (file) => file.endsWith(".ts") && !file.includes("Loader")
  );
  const commands: Command[] = [];

  for (const file of commandFiles) {
    const { command } = await import(join(__dirname, "../commands", file));
    if (!command || !command.data) {
      continue;
    }
    commands.push(command);
  }

  return commands;
}
