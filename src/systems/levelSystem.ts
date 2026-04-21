import { Message } from 'discord.js';
import { XpSystem } from './xpSystem.js';
import { RankSystem, RANKS } from './rankSystem.js';

export class LevelSystem {
  static async handleMessage(message: Message) {
    if (message.author.bot || !message.guild) return;

    const result = XpSystem.giveXp(message.author.id, message.guild.id);
    if (result) {
      await this.checkRoleRewards(message, result.newXp);
    }
  }

  private static async checkRoleRewards(message: Message, currentXp: number) {
    if (!message.member) return;
    const rankInfo = RankSystem.getRankInfo(currentXp);
    if (!message.member.roles.cache.has(rankInfo.roleId)) {
      const allRankIds = RANKS.map(r => r.id);
      await message.member.roles.remove(allRankIds.filter(id => id !== rankInfo.roleId));
      await message.member.roles.add(rankInfo.roleId);
    }
  }
}