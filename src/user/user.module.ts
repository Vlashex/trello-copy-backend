import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { dbModule } from 'src/db/database.module';
import { usersProviders } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports: [
    dbModule,
  ],
  providers: [
    ...usersProviders,
    UserService,
  ],
  controllers: [UserController],
  
})
export class UserModule {}
