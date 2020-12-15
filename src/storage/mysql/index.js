import Sequelize from 'sequelize';
import { sequelizeOptions } from './configs';

const sequelizeWrite = new Sequelize(process.env.CONNECTION_URL, {
	...sequelizeOptions,
}
);

export {
	sequelizeWrite as SQLWrite
};
