import { Module } from "@nestjs/common";
import { ColumnService } from "./column.service";
import { ColumnController } from "./column.controller";
import { dbModule } from "src/db/database.module";
import { columnProviders } from "./column.provider";
import { usersProviders } from "src/user/user.provider";




@Module({
    imports: [dbModule],
    providers: [
        ...columnProviders,
        ...usersProviders,
        ColumnService
    ],
    controllers: [ColumnController],
})
export class ColumnModule {};