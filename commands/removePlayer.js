//REMOVE JOGADOR
const { SlashCommandBuilder, bold } = require('discord.js');
const addPlayer = require('./addPlayer');//imports dos valores
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')//comando
		.setDescription('Comando restrito.')//descrição
		.addStringOption(option =>
			option.setRequired(true)//necessário colocar o nome do player a ser removido
                .setName('player')
				.setDescription('Nome do jogador')),

	async execute(interaction) {
        //o comando só é executado se o admin do server o executar
        if(interaction.user.id=="535970224646651908"){
            const playerName = interaction.options.getString('player').toLowerCase();//nome do player
            //busca o indice de acordo com o nome do player, se existir é removido
            var index = addPlayer.PLAYERSNAME.indexOf(playerName);
            if(index> -1 ){
                addPlayer.PLAYER.splice(index,1);
                addPlayer.PLAYERSNAME.splice(index,1);
                await interaction.reply(`Jogador ${bold(playerName)} removido.`);
            }else{
                await interaction.reply(`Jogador ${bold(playerName)} inexistente.`);
            }
        }else{
            await interaction.reply(`${interaction.user} não possui permissão de admin.`);
        }
	},
};
