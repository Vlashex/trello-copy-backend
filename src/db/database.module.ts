import { Module } from "@nestjs/common";
import { dbProviders } from "./databse.provider";
import { ConfigModule } from "@nestjs/config";




@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    providers: [...dbProviders],
    exports: [...dbProviders]
})
export class dbModule {}