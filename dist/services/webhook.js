import { WebhookClient } from 'discord.js';
export const enviarWebhook = async (url, mensagem) => {
    const webhook = new WebhookClient({ url });
    await webhook.send({
        username: "kita",
        content: mensagem,
    });
};
