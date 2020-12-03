/* eslint-disable no-console */
(async () => {
	// require the config file
	require('dotenv').config();
	const app = require('./app').default;
	// Import DB connections
	const {
		sqlReadConnection,
		sqlWriteConnection
	} = require('./storage/mysql');


	const { PORT = 8080 } = process.env;
	// eslint-disable-next-line no-console
	app.listen(PORT, async () => {
		try {
			// eslint-disable-next-line no-unused-vars
			/**
			 * Storage connections
			 */
			await sqlReadConnection.authenticate();
			console.info('Read DB connected succefully!');

			// connect to the write DB
			await sqlWriteConnection.authenticate();
			console.info('Write DB connected succefully!');
			console.info(`Listening on port ${PORT}...`);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	});

	process.on('unhandledRejection', (reason, p) => {
		// eslint-disable-next-line no-console
		console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
		// application specific logging, throwing an error, or other logic here
	});
})();