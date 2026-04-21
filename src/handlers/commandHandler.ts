import { Client, Collection, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { config } from '../core/config.js';

export async function loadCommands(client: any) {
    const commands = [];
    client.commands = new Collection();

    const commandsPath = join(process.cwd(), 'src', 'commands');
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        
        const filePath = `file://${join(commandsPath, file)}`;
        const command = await import(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
            console.log(` Comando carregado: ${command.data.name}`);
        }
    }

    
    const rest = new REST({ version: '10' }).setToken(config.token!);

    try {
        console.log(' Registrando comandos globais...');
        await rest.put(
            Routes.applicationCommands(config.clientId!),
            { body: commands },
        );
        console.log(' Todos os comandos foram registrados com sucesso!');
    } catch (error) {
        console.error(' Erro ao registrar comandos:', error);
    }
}