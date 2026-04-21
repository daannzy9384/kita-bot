import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ranking")
    .setDescription("Verifica seu progresso atual");

export async function execute(interaction: ChatInputCommandInteraction) {
    const SEU_ID = "698227147663474768"; // Coloque seu ID aqui

    if (interaction.user.id !== SEU_ID) {
        return interaction.reply({ content: "Comando em fase de testes.", ephemeral: true });
    }

    // --- Simulação de dados (Puxe do seu xpSystem.ts depois) ---
    const nivel = 12;
    const xpAtual = 750;
    const xpNecessario = 1200;
    const nome = interaction.user.username;

    // --- Lógica da Barra Fina ---
    const tamanhoBarra = 15; // Quantidade de caracteres na barra
    const progresso = Math.min(xpAtual / xpNecessario, 1);
    const preenchido = Math.round(tamanhoBarra * progresso);
    const vazio = tamanhoBarra - preenchido;

    // Caracteres: ▰ (preenchido) e ▱ (vazio)
    const barraTexto = "▰".repeat(preenchido) + "▱".repeat(vazio);
    const porcentagem = Math.floor(progresso * 100);

    // --- Montagem da Mensagem ---
    const layout = [
        `**PROTAGONISTA:** ${nome}`,
        `**NÍVEL:** \`${nivel}\``,
        `${barraTexto}  \`${porcentagem}%\``,
        `**XP:** \`${xpAtual}\` / \`${xpNecessario}\` (Faltam \`${xpNecessario - xpAtual}\` para o próximo nível)`
    ].join("\n");

    await interaction.reply({
        content: layout,
        ephemeral: true
    });
}