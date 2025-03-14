import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { dbModule } from './db/database.module';
import { ColumnModule } from './column/column.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    dbModule,
    UserModule,
    ColumnModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
