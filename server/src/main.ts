import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express";
import { appModule } from "./app.module";

(async () => {
    const PORT = process.env.PORT
    const app = await NestFactory.create<NestExpressApplication>(appModule);
    app.enableCors({
        origin: [/^(.*)/],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 200,
        credentials: true,
        allowedHeaders:
            'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
    });
    await app.listen(PORT, () => console.log(`Server was started on port ${PORT}!`));
})()