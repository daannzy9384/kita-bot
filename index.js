require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { enviarwebhook } = require('./webhook');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', async () => {
    console.log(` bot online como ${client.user.tag}`);

   await client.application.commands.set([
        {
            name: 'ping',
            description: 'Responde com Pong!',
        },
        {
            name: 'aviso',
            description: 'Envia um texto para o webhook (apenas pra o dono do bot)',
            options: [
                {
                    name: 'mensagem',
                    description: 'A mensagem a ser enviada',
                    type: 3,
                    required: true
                }
            ]
        }
       
    ]);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const meu_id = '698227147663474768';

    if (interaction.commandName === 'ping') {
        await interaction.reply('🏓 Pong! O Slash Command funcionou!');
    }
    
    else if (interaction.commandName === 'aviso') {

        if (interaction.user.id !== meu_id) {
            await interaction.reply('Você não tem permissão para usar este comando.');
            return;
        }
        const mensagem = interaction.options.getString('mensagem');
        await enviarwebhook(mensagem);
        await interaction.reply({ content: 'Aviso enviado com sucesso!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);