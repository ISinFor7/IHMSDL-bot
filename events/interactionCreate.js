const once = false;
const name = 'interactionCreate';

async function invoke(interaction) {
	if (interaction.isChatInputCommand()) {
		(await import(`#commands/${interaction.commandName}`)).invoke(interaction);
	}

	//boutons de rôles
	if (interaction.isButton()) {
		const roleMap = {
			IHM: '1408465905935192186',
			SDL: '1408466808620581037',
			Intru: '1409253453305217174',
		};
		const roleId = roleMap[interaction.customId];
		if (!roleId) return;
		const member = await interaction.guild.members.fetch(interaction.user.id);
		if (member.roles.cache.has(roleId)) {
			await member.roles.remove(roleId);
			await interaction.reply({ content: 'Role removed!', ephemeral: true });
		} else {
			await member.roles.add(roleId);
			await interaction.reply({ content: 'Role added!', ephemeral: true });
		}
	}
}

export { once, name, invoke };
