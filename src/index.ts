import { Client, GatewayIntentBits } from "discord.js";
import { loadCommands } from "./utils/commandLoader";
import { handleInteraction } from "./events/interactionCreate";
import { Command } from "./types/type";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let commands: Command[] = [];

client.once("ready", async () => {
  console.log(`${client.user?.tag} is online and ready!`);
  commands = await loadCommands();
  console.log(`Loaded ${commands.length} commands.`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  await handleInteraction(interaction, commands);
});

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("Bot token is missing!");
}

client.login(token);
