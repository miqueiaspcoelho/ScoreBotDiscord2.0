//Arquivo index base da documentação da biblioteca discord.js
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;

//importando comandos
const fs = require('node:fs');
const path = require('node:path');
const addPlayer = require('./commands/addPlayer');

const commandsPath = path.join(__dirname, "commands");
const commmandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

//Objeto cliente
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Criando coleção de comandos
client.commands = new Collection();

for (const file of commmandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command){
        client.commands.set(command.data.name, command)
    }else{
        console.log(`Comando em ${filePath} está com "data" ou "execute" ausentes`);
    }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

//listener interactions
client.on(Events.InteractionCreate, async interaction =>{
    
    if(!interaction.isChatInputCommand())return;
    const command = interaction.client.commands.get(interaction.commandName);
    if(!command){
        console.error("commando não encontrado");
        return;
    }
    try{
        await command.execute(interaction);
    }
    catch (error){
        console.error(error);
        await interaction.reply("Erro ao executar o comando");
    }
})