import { MessageFlags } from "discord.js";

const once = false;
const name = 'interactionCreate';

async function invoke(interaction) {
	if (interaction.isChatInputCommand()) {
		await (await import(`#commands/${interaction.commandName}`)).invoke(interaction);
		if (interaction.commandName === 'createvote') {
			setTimeout(async () => {
				const message = await interaction.fetchReply();
				const voteInfo = global.voteData && global.voteData[message.id];
				if (!voteInfo) return;
				let result = 'Résultats du vote :\n';
				for (let i = 0; i < voteInfo.votes.length; i++) {
					result += `${voteInfo.votes[i]} : ${voteInfo.voteCounts[i]} vote(s)\n`;
				}
				await interaction.followUp({ content: result });
				delete global.voteData[message.id];
			}, interaction.options.getInteger('duration') * 1000);
		}
	}

	if (interaction.isButton()) {
		// boutons de vote
		if (interaction.customId.startsWith('vote_')) {
			if (!global.voteData) global.voteData = {};
			const messageId = interaction.message.id;
			if (!global.voteData[messageId]) {
				const votes = interaction.message.components[0].components.map(btn => btn.label);
				global.voteData[messageId] = {
					votes,
					voteCounts: Array(votes.length).fill(0),
					voters: new Set(),
				};
			}
			const voteInfo = global.voteData[messageId];
			const userId = interaction.user.id;
			if (voteInfo.voters.has(userId)) {
				await interaction.reply({ content: 'Vous avez déjà voté !', flags: MessageFlags.Ephemeral });
				return;
			}
			const index = parseInt(interaction.customId.replace('vote_', ''));
			voteInfo.voteCounts[index]++;
			voteInfo.voters.add(userId);
			await interaction.reply({ content: `Votre vote pour "${voteInfo.votes[index]}" a été pris en compte !`, flags: MessageFlags.Ephemeral });
			return;
		}

		// boutons de rôles
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
			await interaction.reply({ content: 'Role enlevé!', flags: MessageFlags.Ephemeral });
		} else {
			await member.roles.add(roleId);
			await interaction.reply({ content: 'Role ajouté!', flags: MessageFlags.Ephemeral });
		}
	}
}

export { once, name, invoke };
