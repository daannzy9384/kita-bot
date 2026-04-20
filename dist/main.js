import { Bot } from './core/bot.js';
const botInstance = new Bot();
botInstance.start().catch((error) => {
    console.error('Erro ao iniciar o bot:', error);
    process.exit(1);
});
