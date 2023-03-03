//LIMPA OS VALORES
const { SlashCommandBuilder} = require('discord.js');
const addPlayer = require('./addPlayer');//fazendo os imports dos valores armazenados
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')//comando
		.setDescription('Comando restrito.'),//descrição
	async execute(interaction) {
        //o comando só será executado se um usuário especifico (admin do server) digitar
        if(interaction.user.id=="535970224646651908"){
            //setando valores para vazio
            addPlayer.PLAYER=[]
            addPlayer.PLAYERSNAME=[]
            await interaction.reply("Valores zerados");
        }
        else{
            await interaction.reply(`${interaction.user} não possui permissão de admin.`);
        }
	},
    
};
