import { Events } from 'discord.js';
import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export const once = true;
export const name = 'ready';

export async function invoke(client) {
    const guildId = '1408457354059714742';
    const channelId = '1408457354638262363';
    const guild = await client.guilds.fetch(guildId);
    const channel = await guild.channels.fetch(channelId);

    // vérification si le message a déjà été envoyé
    const messages = await channel.messages.fetch({ limit: 50 });
    const alreadySent = messages.some(msg => msg.author.id === client.user.id && msg.components.length > 0 && msg.content === 'Choisissez un rôle :');
    if (alreadySent) return;

    const role1Button = new ButtonBuilder()
        .setCustomId('IHM')
        .setEmoji('😀')
        .setLabel('IHM')
        .setStyle(ButtonStyle.Primary);

    const role2Button = new ButtonBuilder()
        .setCustomId('SDL')
        .setEmoji('😎')
        .setLabel('SDL')
        .setStyle(ButtonStyle.Success);

    const role3Button = new ButtonBuilder()
        .setCustomId('Intru')
        .setEmoji('🎉')
        .setLabel('Intru')
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(role1Button, role2Button, role3Button);

    await channel.send({
        content: 'Choisissez un rôle :',
        components: [row],
    });
}

