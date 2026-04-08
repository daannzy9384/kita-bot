import { Client, GatewayIntentBits, Collection, type Interaction } from 'discord.js';
import { config } from './config.js';

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
                console.error('Error executing command:', error);
                await interaction.reply({ content: 'Ocorreu um erro ao executar o comando.', ephemeral: true });
            }
        });

        this.once('ready', () => {
            console.log(`Kita Bot online: ${this.user?.tag}`);
        });

        await this.login(config.token);
    }
}