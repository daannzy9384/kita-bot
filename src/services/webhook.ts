import {WebhookClient} from 'discord.js';

export const enviarWebhook = async (url: string, mensagem: string) => {
  const webhook = new WebhookClient({ url });

  await webhook.send({
    username:"kita",
    content: mensagem,
  });
}