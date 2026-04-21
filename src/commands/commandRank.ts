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

    const userData = XpSystem.getXpData(userId, guildId);

    const nivel = userData.level;
    const xpAtual = userData.xp;
    const nome = interaction.user.username;

    const xpBaseNivelAtual = Math.pow(nivel / 0.1, 2);
    const xpParaProximoNivel = Math.pow((nivel + 1) / 0.1, 2);
    
    const xpGanhoNoNivel = xpAtual - xpBaseNivelAtual;
    const totalNecessarioNivel = xpParaProximoNivel - xpBaseNivelAtual;

    const tamanhoBarra = 15;
    const progresso = Math.max(0, Math.min(xpGanhoNoNivel / totalNecessarioNivel, 1));
    
    const preenchido = Math.round(tamanhoBarra * progresso);
    const vazio = tamanhoBarra - preenchido;

    const barraTexto = "▰".repeat(preenchido) + "▱".repeat(vazio);
    const porcentagem = Math.floor(progresso * 100);
    const falta = Math.ceil(xpParaProximoNivel - xpAtual);

    const layout = [
        `**PROTAGONISTA:** ${nome}`,
        `**NÍVEL:** \`${nivel}\``,
        `${barraTexto}  \`${porcentagem}%\``,
        `**XP:** \`${Math.floor(xpAtual)}\` / \`${Math.floor(xpParaProximoNivel)}\``,
        `Faltam \`${falta}\` para o próximo nível`
    ].join("\n");

    await interaction.reply({
        content: layout,
        ephemeral: true
    });
}