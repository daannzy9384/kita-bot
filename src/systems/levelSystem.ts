import { Message } from 'discord.js';
import { XpSystem } from './xpSystem.js';

export class LevelSystem {
    static async handleMessage(message: Message) {
        if (message.author.bot || !message.guild) return;

        const result = XpSystem.giveXp(message.author.id, message.guild.id);

        if (result?.leveledUp) {
            console.log(`[LEVEL-UP] ${message.author.username} chegou ao nível ${result.newLevel}`);

            // Aqui você pode chamar uma função para verificar e dar cargos
            // ex: this.checkRoleRewards(message, result.newLevel);
        }
    }
}
