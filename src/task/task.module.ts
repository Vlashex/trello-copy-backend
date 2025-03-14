import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { dbModule } from "src/db/database.module";
import { columnProviders } from "./task.provider";
import { usersProviders } from "src/user/user.provider";




@Module({
    imports: [dbModule],
    providers: [
        ...columnProviders,
        ...usersProviders,
        TaskService
    ],
    controllers: [TaskController],
})
export class TaskModule {};