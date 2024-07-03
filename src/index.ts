import {Elysia} from "elysia";
import {swagger} from "@elysiajs/swagger";
import {authRouter} from "./routers/authRouter";
import {neon, neonConfig} from '@neondatabase/serverless';
import {galleryRouter} from "./routers/galleryRouter";
import {imageRouter} from "./routers/imageRouter";

neonConfig.fetchConnectionCache = true;

const startServer = async () => {

    const app = new Elysia()
        .use(swagger())
        .use(authRouter)
        .use(galleryRouter)
        .use(imageRouter)
        .get("/", () => "Hello Elysia")
        .listen(3001);
};

startServer().catch(console.error);