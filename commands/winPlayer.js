//ADICIONA VITÓRIA
const { SlashCommandBuilder, codeBlock,} = require('discord.js');
const addPlayer = require('./addPlayer');//imports dos valores
const date = new Date();//data
var score = 0;//para atribuir vitória a um player
var result=""//exibir o placar
module.exports = {
	data: new SlashCommandBuilder()
		.setName('win')//comando
		.setDescription('Adiciona vitória ao jogador.')//descrição
		.addStringOption(option =>
			option.setRequired(true)//obrigatório preencher
                .setName('player')
				.setDescription('Nome do jogador')),
	async execute(interaction) {
		const playerName = interaction.options.getString('player').toLowerCase();//nome do jogador
        for(var i=0;i<addPlayer.PLAYER.length;i++){
            if(playerName==addPlayer.PLAYER[i].name){
                addPlayer.PLAYER[i].value+=1;
                score=addPlayer.PLAYER[i].value;
            }
        }
        result+=date+"\n";
        //ordena os objetos pela pontução
        addPlayer.PLAYER.sort(function (a,b){
            return (b.value - a.value);
        });
        addPlayer.PLAYERSNAME=[];
        for(var i=0;i<addPlayer.PLAYER.length;i++){
            addPlayer.PLAYERSNAME.push(addPlayer.PLAYER[i].name);//ordena os nomes pela pontuação dos objetos player
            result+=addPlayer.PLAYER[i].name+" = " + addPlayer.PLAYER[i].value+"\n";  
        }
        result=codeBlock(result);
        await interaction.reply(`${result}`);
        result="";
	},
    
};
