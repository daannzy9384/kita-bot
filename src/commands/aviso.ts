import { 
    SlashCommandBuilder, 
    EmbedBuilder, 
    PermissionFlagsBits, 
    ChatInputCommandInteraction 
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('aviso')
    .setDescription('Envia um aviso importante em um embed bonitão.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Só admins podem usar
    .addStringOption(option =>
        option.setName('titulo')
            .setDescription('O título do seu aviso')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('mensagem')
            .setDescription('O conteúdo do aviso (use \n para pular linha)')
            .setRequired(true))
    .addRoleOption(option =>
        option.setName('mencionar')
            .setDescription('Escolha um cargo para mencionar (ex: @everyone)')
            .setRequired(false));

export async function execute(interaction: ChatInputCommandInteraction) {
    const titulo = interaction.options.getString('titulo', true);
    const mensagem = interaction.options.getString('mensagem', true);
    const cargo = interaction.options.getRole('mencionar');

    const embed = new EmbedBuilder()
        .setTitle(`📢 ${titulo}`)
        .setDescription(mensagem.replace(/\\n/g, '\n')) // Permite pular linha usando \n
        .setColor('#5865F2') // Cor Blurple do Discord
        .setTimestamp()
        .setFooter({ 
            text: `Enviado por ${interaction.user.username}`, 
            iconURL: interaction.user.displayAvatarURL() 
        });

    // Responde primeiro para o comando não expirar
    await interaction.reply({ content: 'Aviso enviado com sucesso!', ephemeral: true });

    // Envia o aviso no canal atual
    if (interaction.channel?.isSendable()) {
        if (cargo) {
            await interaction.channel.send({ 
                content: `${cargo}`, 
                embeds: [embed] 
            });
        } else {
            await interaction.channel.send({ embeds: [embed] });
        }
    }
}