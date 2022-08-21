import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express";
import { appModule } from "./app.module";

(async () =>{
    const PORT = process.env.PORT
    const app = await NestFactory.create<NestExpressApplication>(appModule);
    await app.listen(PORT, () => console.log(`Server was started on port ${PORT}!`));
})()