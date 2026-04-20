import { Client, GatewayIntentBits, Collection, type Interaction } from 'discord.js';
import { config } from './config.js';
import { LevelSystem } from '../systems/levelSystem.js';
import "../db/connection.js"

export class Bot extends Client {
    public commands: Collection<string, any> = new Collection();

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });
    }

    public async start() {
        this.on('interactionCreate', async (interaction: Interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const command = this.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'Erro ao executar o comando.', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'Erro ao executar o comando.', ephemeral: true });
                }
            }
        });

        this.on('messageCreate', async (message) => {
            if (message.author.bot || !message.guild) return;
            await LevelSystem.handleMessage(message);
        });

        this.once('ready', () => {
            console.log(`Kita Bot online: ${this.user?.tag}`);
        });

        await this.login(config.token);
    }
}