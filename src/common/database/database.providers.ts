import { DataSource, DataSourceOptions } from 'typeorm';
import { getConfig } from 'src/utils/index'
const path = require('path');
import { User } from '../../user/entities/user.entity';

// 设置数据库类型
const databaseType: DataSourceOptions['type'] = 'mysql';
const { MYSQL_CONFIG } = getConfig()

export const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  type: databaseType,
  // entities: [path.join(__dirname, `../../**/*.${MYSQL_CONFIG.entities}.entity{.ts,.js}`)],
  entities: [User]
}

const MONGODB_DATA_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG)

// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    useFactory: async () => {
      await MONGODB_DATA_SOURCE.initialize()
      return MONGODB_DATA_SOURCE
    }
  }
];
