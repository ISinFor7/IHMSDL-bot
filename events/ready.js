import fs from 'fs';
import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

const once = true;
const name = 'clientReady';

async function invoke(client) {
	const commands = fs
		.readdirSync('./events/commands')
		.filter((file) => file.endsWith('.js'))
		.map((file) => file.slice(0, -3));

	const commandsArray = [];

	for (let command of commands) {
		const commandFile = await import(`#commands/${command}`);
		commandsArray.push(commandFile.create());
	}

	client.application.commands.set(commandsArray);

	console.log(`Successfully logged in as ${client.user.tag}!`);
	const guildId = '1408457354059714742';
    const channelId = '1408457354638262363';
    const guild = await client.guilds.fetch(guildId);
    const channel = await guild.channels.fetch(channelId);

    // vérification si le message a déjà été envoyé
    const messages = await channel.messages.fetch({ limit: 50 });
    const alreadySent = messages.some(msg => msg.author.id === client.user.id && msg.components.length > 0 && msg.content === 'Choisissez un rôle :');
    if (!alreadySent) {
		const role1Button = new ButtonBuilder()
			.setCustomId('IHM')
			.setEmoji('🎨')
			.setLabel('IHM')
			.setStyle(ButtonStyle.Primary);

		const role2Button = new ButtonBuilder()
			.setCustomId('SDL')
			.setEmoji('💻')
			.setLabel('SDL')
			.setStyle(ButtonStyle.Success);

		const role3Button = new ButtonBuilder()
			.setCustomId('Intru')
			.setEmoji('👤')
			.setLabel('Intru')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder().addComponents(role1Button, role2Button, role3Button);

		await channel.send({
			content: 'Choisissez un rôle :',
			components: [row],
		});
	}

    const alreadySent2 = messages.some(msg => msg.author.id === client.user.id && msg.components.length > 0 && msg.content === 'Et votre groupe :');
    if (!alreadySent2) {
		const groupe1Button = new ButtonBuilder()
			.setCustomId('Groupe42')
			.setEmoji('4️⃣2️⃣')
			.setLabel('Groupe 42')
			.setStyle(ButtonStyle.Primary);

		const groupe2Button = new ButtonBuilder()
			.setCustomId('Groupe51')
			.setEmoji('5️⃣1️⃣')
			.setLabel('Groupe 51')
			.setStyle(ButtonStyle.Success);
			
		const groupe3Button = new ButtonBuilder()
			.setCustomId('Groupe52')
			.setEmoji('5️⃣2️⃣')
			.setLabel('Groupe 52')
			.setStyle(ButtonStyle.Success);

		const row2 = new ActionRowBuilder().addComponents(groupe1Button, groupe2Button);

		await channel.send({
			content: 'Et votre groupe :',
			components: [row2],
		});
	}
}

export { once, name, invoke };
