import db from '../db/connection.js';
import type{ UserXp } from '../db/models/UserXp.js';

export class XpSystem {
    private static COOLDOWN = 60000;

    static getXpData(userId: string, guildId: string): UserXp {
        const row = db.prepare('SELECT * FROM user_xp WHERE userId = ? AND guildId = ?').get(userId, guildId) as UserXp;
        
        if (!row) {
            const newData = { userId, guildId, xp: 0, level: 0, lastMessageAt: 0 };
            db.prepare('INSERT INTO user_xp (userId, guildId, xp, level, lastMessageAt) VALUES (?, ?, 0, 0, 0)')
              .run(userId, guildId);
            return newData;
        }
        return row;
    }

    static giveXp(userId: string, guildId: string): { leveledUp: boolean, newLevel: number } | null {
        const user = this.getXpData(userId, guildId);
        const now = Date.now();

        if (now - user.lastMessageAt < this.COOLDOWN) return null;

        const xpToGive = Math.floor(Math.random() * 11) + 15;
        const newXp = user.xp + xpToGive;
        const newLevel = Math.floor(0.1 * Math.sqrt(newXp)); 
        const leveledUp = newLevel > user.level;

        db.prepare('UPDATE user_xp SET xp = ?, level = ?, lastMessageAt = ? WHERE userId = ? AND guildId = ?')
          .run(newXp, newLevel, now, userId, guildId);

        return { leveledUp, newLevel };
    }
}