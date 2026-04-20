import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config.js';
export class Bot extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });
    }
    async start() {
        this.once('ready', () => {
            console.log(`Kita Bot online: ${this.user?.tag}`);
        });
        await this.login(config.token);
    }
}
