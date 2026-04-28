import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, MessageFlags } from 'discord.js';
import db from '../../db/connection.js';
import { RANKS } from '../../systems/rankSystem.js';

export const data = new SlashCommandBuilder()
  .setName('reset-xp-geral')
  .setDescription('Limpa todos os dados de XP e remove os cargos de rank')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (interaction.user.id !== '698227147663474768') {
    return interaction.reply({ content: 'Acesso negado.', flags: [MessageFlags.Ephemeral] });
  }

  await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

  try {
    db.prepare('DELETE FROM user_xp').run();

    const guild = interaction.guild;
    if (!guild) return interaction.editReply({ content: 'Erro: Servidor não encontrado.' });

    const roleIds = RANKS.map(rank => rank.id);
    let totalRemovidos = 0;

    for (const roleId of roleIds) {
      const role = await guild.roles.fetch(roleId).catch(() => null);
      if (!role) continue;

      const membersWithRole = role.members;

      for (const [memberId, member] of membersWithRole) {
        try {
          await member.roles.remove(roleIds);
          totalRemovidos++;
        } catch (e) {
          continue;
        }
      }
    }

    await interaction.editReply({ 
      content: `O XP foi resetado e os cargos de rank foram removidos de ${totalRemovidos} membros.` 
    });

  } catch (error) {
    console.error(error);
    await interaction.editReply({ content: 'O XP foi resetado, mas houve um erro ao processar os membros.' });
  }
}