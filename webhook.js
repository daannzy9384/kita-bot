async function enviarwebhook(mensagem) {
    const url = process.env.WEBHOOK_URL;

    await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            username: 'Kita',
            content: mensagem,
        }),
    });
}
module.exports = { enviarwebhook };