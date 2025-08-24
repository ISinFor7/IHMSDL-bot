import { SlashCommandBuilder } from 'discord.js';

const create = () => {
	const command = new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!')
		.addUserOption((option) =>
			option.setName('user').setDescription('Dites bonjour à quelqu\'un').setRequired(false)
		);

	return command.toJSON();
};

const invoke = (interaction) => {
	const user = interaction.options.getUser('user');

	if (user !== null) {
		interaction.reply({ content: `Hey ${user}! ${interaction.user} te dis bonjour!` });
	} else {
		interaction.reply({
			content: 'Pong!',
			ephemeral: true,
		});
	}
};

export { create, invoke };
