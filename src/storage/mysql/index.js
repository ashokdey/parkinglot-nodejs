import Sequelize from 'sequelize';
import { sequelizeOptions } from './configs';

const sequelizeWrite = new Sequelize(
	process.env.SQL_WRITE_DATABASE,
	process.env.SQL_WRITE_USERNAME,
	process.env.SQL_WRITE_PASSWORD,
	{
		...sequelizeOptions,
	}
);

export {
	sequelizeWrite as SQLWrite
};
