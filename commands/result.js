//MOSTRA PLACAR
const { SlashCommandBuilder, codeBlock,} = require('discord.js');
const addPlayer = require('./addPlayer');//imports dos valores
const date = new Date();//data
var result=""//variável que guardará o placar
module.exports = {
	data: new SlashCommandBuilder()
		.setName('result')//comando
		.setDescription('Exibe placar.'),//descrição
	async execute(interaction) {
        //concatenando strings até formar o result
        result+=date+"\n";
        for(var i=0;i<addPlayer.PLAYER.length;i++){
            result+=addPlayer.PLAYER[i].name+" = " + addPlayer.PLAYER[i].value+"\n";
        }
        result=codeBlock(result);//formatando para bloco de código
        await interaction.reply(`${result}`);
        result="";
	},
    
};
