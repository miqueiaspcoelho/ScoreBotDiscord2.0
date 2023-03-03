//ADICIONA JOGADOR
const { SlashCommandBuilder, bold } = require('discord.js');

//contrução da classe jogador, atributos: nome e pontuação
class Player {
    constructor(name,score){
        this.name=name;
        this.value=score;
    }
}
const players =[]; //armazena nome dos jogadores (usado na checagem de existência, para adicionar ou não)
const playersObject =[];//armazena objeto jogador

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')//comando
		.setDescription('Adiciona jogador.')//descrição
		.addStringOption(option =>
			option.setRequired(true) //necessário preencher com o nome do player
                .setName('player')
				.setDescription('Nome do jogador')),

	async execute(interaction) {
		const playerName = interaction.options.getString('player').toLowerCase();//nome do player
        if(players.includes(playerName)){
            await interaction.reply(`${interaction.user} jogador ${bold(playerName)} já adicionado.`)
            
        }else{
            var player = new Player(playerName,0);//criação do objeto jogador
            playersObject.push(player);//adiciona objeto
            players.push(playerName);//adiciona o nome do player
            await interaction.reply(`${interaction.user} adicionou ${bold(playerName)}`)
            
        }
        
	},
    //exportando para uso nos demais comandos, assim evita o uso de banco de dados para permanência dos dados
    PLAYER: playersObject,
    PLAYERSNAME: players,
};
