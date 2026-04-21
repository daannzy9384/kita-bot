import { Client, Collection, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from '../core/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loadCommands(client: any) {
    const commands = [];
    client.commands = new Collection();

    const commandsPath = join(__dirname, '..', 'commands');
    
    const commandFiles = readdirSync(commandsPath).filter(file => 
        file.endsWith('.ts') || file.endsWith('.js')
    );

    for (const file of commandFiles) {
        const filePath = `file://${join(commandsPath, file)}`;
        const command = await import(filePath);

        const cmd = command.default || command;

        if ('data' in cmd && 'execute' in cmd) {
            client.commands.set(cmd.data.name, cmd);
            commands.push(cmd.data.toJSON());
            console.log(`Comando carregado: ${cmd.data.name}`);
        }
    }

    const rest = new REST({ version: '10' }).setToken(config.token!);

    try {
        console.log('Registrando comandos globais...');
        await rest.put(
            Routes.applicationCommands(config.clientId!),
            { body: commands },
        );
        console.log('Todos os comandos foram registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar comandos:', error);
    }
}