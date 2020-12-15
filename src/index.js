/* eslint-disable no-console */
(async () => {
	// require the config file
	require('dotenv').config();
	const app = require('./app').default;
	// Import DB connections
	const {
		SQLWrite,
	} = require('./storage/mysql');

	const { PORT = 8080 } = process.env;
	// eslint-disable-next-line no-console
	app.listen(PORT, async () => {
		try {
			// sync the DB
			await SQLWrite.sync();

			console.info('Write DB connected succefully!');
			console.info(`Listening on port ${PORT}...`);
		} catch (err) {
			console.error(err);
		}
	});

	process.on('unhandledRejection', (reason, p) => {
		// eslint-disable-next-line no-console
		console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
		// application specific logging, throwing an error, or other logic here
	});
})();