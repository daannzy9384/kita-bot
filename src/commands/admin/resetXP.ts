import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import db from '../../db/connection.js';

export const data = new SlashCommandBuilder()
  .setName('reset-xp-geral')
  .setDescription('Limpa todos os dados de XP do banco de dados')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (interaction.user.id !== '698227147663474768') {
    return interaction.reply({ content: 'Acesso negado.', ephemeral: true });
  }

  try {
    db.prepare('DELETE FROM user_xp').run();
    await interaction.reply({ content: 'O banco de dados de XP foi resetado com sucesso!', ephemeral: true });
  } catch (error) {
    await interaction.reply({ content: 'Erro ao resetar o banco.', ephemeral: true });
  }
}