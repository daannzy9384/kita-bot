import { Bot } from './core/bot.js';
import { loadCommands } from './handlers/commandHandler.js';

const botInstance = new Bot();

loadCommands(botInstance).then(() => {
    botInstance.start().catch((error: Error) => {
        console.error('Erro ao iniciar o bot:', error);
        process.exit(1);
    });
});