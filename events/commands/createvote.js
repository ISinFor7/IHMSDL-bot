import { SlashCommandBuilder, MessageFlags, ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

const create = () => {
	const command = new SlashCommandBuilder()
		.setName('createvote')
		.setDescription('Créer un vote')
		.addStringOption((option) =>
			option.setName('description').setDescription('Description du vote').setRequired(true)
		)
		.addIntegerOption((option) =>
			option.setName('duration').setDescription('Durée du vote en secondes').setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('vote1').setDescription('Premier vote').setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('vote2').setDescription('Deuxième vote').setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('vote3').setDescription('Troisième vote').setRequired(false)
		)
		.addStringOption((option) =>
			option.setName('vote4').setDescription('Quatrième vote').setRequired(false)
		)
		.addStringOption((option) =>
			option.setName('vote5').setDescription('Cinquième vote').setRequired(false)
		);

	return command.toJSON();
};

async function invoke(interaction) {
	const votes = [
		interaction.options.getString('vote1'),
		interaction.options.getString('vote2'),
		interaction.options.getString('vote3'),
		interaction.options.getString('vote4'),
		interaction.options.getString('vote5'),
	].filter(Boolean);

	const buttons = [];
	for (let i = 0; i < votes.length; i++) {
		buttons.push(
			new ButtonBuilder()
				.setCustomId(`vote_${i}`)
				.setLabel(votes[i])
				.setStyle(ButtonStyle.Primary)
		);
	}

	const row = new ActionRowBuilder().addComponents(...buttons);

	await interaction.reply({
		content: interaction.options.getString('description'),
		components: [row],
	});
};

export { create, invoke };
