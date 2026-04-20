import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'database.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS user_xp (
    userId TEXT,
    guildId TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 0,
    lastMessageAt INTEGER DEFAULT 0,
    PRIMARY KEY (userId, guildId)
  )
`);

export default db;