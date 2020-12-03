import Sequelize from 'sequelize';
import { sequelizeOptions } from './configs';

const sequelizeRead = new Sequelize(
	process.env.SQL_WRITE_DATABASE,
	process.env.SQL_READ_USERNAME,
	process.env.SQL_READ_PASSWORD,
	{
		...sequelizeOptions,
	}
);

const sequelizeWrite = new Sequelize(
	process.env.SQL_WRITE_DATABASE,
	process.env.SQL_WRITE_USERNAME,
	process.env.SQL_WRITE_PASSWORD,
	{
		...sequelizeOptions,
	}
);

export {
	sequelizeRead as sqlReadConnection,
	sequelizeWrite as sqlWriteConnection
};
