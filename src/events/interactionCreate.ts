import { Command } from '../types/type';
import {
  ChatInputCommandInteraction,
  CommandInteraction,
} from 'discord.js';

export async function handleInteraction(
  interaction: CommandInteraction,
  commands: Command[]
) {
  if (interaction.isChatInputCommand()) {
    const command = commands.find(
      (cmd) => cmd.data.name === interaction.commandName
    );

    if (command) {
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  } else {
    console.log('Received non-chat command:', interaction.commandType);
  }
}
