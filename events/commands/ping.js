import { SlashCommandBuilder, MessageFlags } from 'discord.js';

const create = () => {
	const command = new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!')
		.addUserOption((option) =>
			option.setName('user').setDescription('Dites bonjour à quelqu\'un').setRequired(false)
		);

	return command.toJSON();
};

const invoke = async (interaction) => {
	const user = interaction.options.getUser('user');
	if (user !== null) {
		interaction.reply({ content: `Hey ${user}! ${interaction.user} te dis bonjour!` });
	} else {
		const sent = await interaction.reply({ content: 'Pinging...', withResponse: true, flags: MessageFlags.Ephemeral } );
		interaction.editReply({
			content: `Pong : ${sent.resource.message.createdTimestamp - interaction.createdTimestamp}ms`,
			flags: MessageFlags.Ephemeral,
		});
	}
};

export { create, invoke };
