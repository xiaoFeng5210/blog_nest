import { Dependencies, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MYSQL_DATABASE_CONFIG } from './common/database/database.providers'
import { DataSource } from 'typeorm';

@Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRoot(MYSQL_DATABASE_CONFIG),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig]
    }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  dataSource
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
}
