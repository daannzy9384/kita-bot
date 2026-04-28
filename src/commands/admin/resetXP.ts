import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import db from '../../db/connection.js';
import { RANKS } from '../../systems/rankSystem.js';

export const data = new SlashCommandBuilder()
  .setName('reset-xp-geral')
  .setDescription('Limpa todos os dados de XP e remove os cargos de rank de todos os membros')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (interaction.user.id !== '698227147663474768') {
    return interaction.reply({ content: 'Acesso negado.', ephemeral: true });
  }

  await interaction.deferReply({ ephemeral: true });

  try {
    db.prepare('DELETE FROM user_xp').run();

    const guild = interaction.guild;
    if (!guild) {
      return interaction.editReply({ content: 'Erro: Servidor não encontrado.' });
    }

    const roleIdsToRemove = RANKS.map(rank => rank.id);
    const members = await guild.members.fetch();

    for (const [memberId, member] of members) {
      const hasRankRole = member.roles.cache.some(role => roleIdsToRemove.includes(role.id));
      
      if (hasRankRole) {
        await member.roles.remove(roleIdsToRemove).catch(() => null);
      }
    }

    await interaction.editReply({ 
      content: 'O banco de dados foi resetado e todos os cargos de rank foram removidos com sucesso!' 
    });
  } catch (error) {
    console.error(error);
    await interaction.editReply({ content: 'Erro ao processar o reset de XP e cargos.' });
  }
}