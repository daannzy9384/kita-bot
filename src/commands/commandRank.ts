import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { XpSystem } from "../systems/xpSystem.js";

export const data = new SlashCommandBuilder()
    .setName("ranking")
    .setDescription("Verifica seu progresso atual");

export async function execute(interaction: ChatInputCommandInteraction) {
    const SEU_ID = "698227147663474768";

    if (interaction.user.id !== SEU_ID) {
        return interaction.reply({
            content: "Comando em fase de testes.",
            ephemeral: true
        });
    }

    const userId = interaction.user.id;
    const guildId = interaction.guildId!;

    // 🔥 Puxa dados reais
    const userData = XpSystem.getXpData(userId, guildId);

    const nivel = userData.level;
    const xpAtual = userData.xp;

    // 🧠 Calcula XP necessário pro próximo nível
    const proximoNivel = nivel + 1;
    const xpNecessario = Math.pow(proximoNivel / 0.1, 2);

    const nome = interaction.user.username;

    // --- Barra ---
    const tamanhoBarra = 15;
    const progresso = Math.max(0, Math.min(xpAtual / xpNecessario, 1));

    const preenchido = Math.floor(tamanhoBarra * progresso);
    const vazio = tamanhoBarra - preenchido;

    const barraTexto = "▰".repeat(preenchido) + "▱".repeat(vazio);
    const porcentagem = Math.floor(progresso * 100);

    const falta = Math.max(0, Math.floor(xpNecessario - xpAtual));

    const layout = [
        `**PROTAGONISTA:** ${nome}`,
        `**NÍVEL:** \`${nivel}\``,
        `${barraTexto}  \`${porcentagem}%\``,
        `**XP:** \`${xpAtual}\` / \`${Math.floor(xpNecessario)}\``,
        `Faltam \`${falta}\` para o próximo nível`
    ].join("\n");

    await interaction.reply({
        content: layout,
        ephemeral: true
    });
}