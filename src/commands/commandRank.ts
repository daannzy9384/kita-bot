import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { XpSystem } from '../systems/xpSystem.js';
import { RankSystem } from '../systems/rankSystem.js';

export const data = new SlashCommandBuilder()
  .setName("ranking")
  .setDescription("Verifica seu progresso atual");

export async function execute(interaction: ChatInputCommandInteraction) {
  const MEU_ID = '698227147663474768'; 

  if (interaction.user.id !== MEU_ID) {
    return interaction.reply({ 
      content: 'Este comando está em fase de testes e apenas o desenvolvedor pode usá-lo.', 
      ephemeral: true 
    });
  }

  const userId = interaction.user.id;
  const guildId = interaction.guildId!;
  const userData = XpSystem.getXpData(userId, guildId);
  const rank = RankSystem.getRankInfo(userData.xp);

  const embed = new EmbedBuilder()
    .setColor('#1DB954')
    .setTitle(`PROTAGONISTA: ${interaction.user.username}`)
    .setThumbnail(interaction.user.displayAvatarURL())
    .addFields(
      { name: 'NÍVEL', value: `${userData.level}`, inline: true },
      { name: 'CARGO', value: `${rank.roleName}`, inline: true },
      { name: 'DIVISÃO', value: `${rank.division || '—'}`, inline: true },
      { name: 'XP ATUAL', value: `${userData.xp}`, inline: false }
    );

  if (rank.nextMilestoneXP) {
    const falta = rank.nextMilestoneXP - userData.xp;
    embed.setFooter({ text: `Faltam ${falta} XP para o próximo marco.` });
  }

  await interaction.reply({ embeds: [embed] });
}

