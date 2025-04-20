import { REST, Routes } from "discord.js";
import { loadCommands } from "../utils/commandLoader";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.BOT_TOKEN!;
const clientId = process.env.CLIENT_ID!;
const guildId = process.env.GUILD_ID!;

const rest = new REST({ version: "10" }).setToken(token);

async function registerCommands() {
  try {
    const commands = await loadCommands();
    const commandData = commands.map((cmd) => cmd.data.toJSON());

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commandData,
    });
  } catch (error) {
    console.error("Failed to register commands:", error);
  }
}

registerCommands();
