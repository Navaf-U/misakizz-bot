import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { getDarkResponse } from "../ai/aiResponse";

export const command = {
  data: new SlashCommandBuilder()
    .setName("dark-chat")
    .setDescription("Speak to the oracle")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("What do you seek from the darkness?")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const userPrompt = interaction.options.getString("prompt", true);
    interaction.deferReply();
    const reply = await getDarkResponse(userPrompt, interaction.user.username);

    await interaction.editReply({
      content: `🔮 *${reply}*`,
    });
  },
};
