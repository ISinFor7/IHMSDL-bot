import {} from 'dotenv/config';
import fs from 'fs';
import { Client, GatewayIntentBits } from 'discord.js';
import net from 'net';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const events = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));

for (let event of events) {
	const eventFile = await import(`#events/${event}`);
	if (eventFile.once) {
		client.once(eventFile.name, (...args) => {
			eventFile.invoke(...args);
		});
	} else {
		client.on(eventFile.name, (...args) => {
			try {
				eventFile.invoke(...args);
			} catch (error) {
				console.error(`Error occurred while handling event "${eventFile.name}":`, error);
			}
		});
	}
}

client.login(process.env.BOT_TOKEN);

// Google Cloud health checks
net.createServer().listen(8080, () => {
	console.log('Health check server listening on port 8080');
});
