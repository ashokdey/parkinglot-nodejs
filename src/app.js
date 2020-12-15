import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';
import { v1Routes } from './routes/v1';

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev', {
	skip: () => app.get('env') === 'test'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(helmet());

// Routes
app.use('/', routes);
app.use('/v1', v1Routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
	res
		.status(err.status || 500)
		.render('error', {
			message: err.message
		});
});

export default app;
