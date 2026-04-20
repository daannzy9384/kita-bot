import 'dotenv/config';
export const config = {
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    guildid: process.env.GUILD_ID,
};
module.exports = { config };
