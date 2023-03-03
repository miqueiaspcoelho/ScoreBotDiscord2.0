//comando de teste do bot
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")//comando
        .setDescription("Responde com pong!"),//descrição

    async execute(interaction){
        await interaction.reply("pong!")
    }
}
