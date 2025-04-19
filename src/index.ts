import {Client, GatewayIntentBits} from 'discord.js'
import { token } from './config/botConfig'
import { loadCommands } from './commands/commandLoader'
import { handleInteraction } from './events/interactionCreate'
import { Command } from './types/type';
import dotenv from 'dotenv'

dotenv.config()

const client = new Client ({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let commands: Command[] = [];

client.once('ready',async ()=>{
    console.log(`${client.user?.tag} is online and ready!`)
    commands = await loadCommands(); 
    console.log(`Loaded ${commands.length} commands.`);
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    await handleInteraction(interaction, commands);
  });
  
  client.login(token);