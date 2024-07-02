import {Elysia} from "elysia";
import {swagger} from "@elysiajs/swagger";
import {authRoutes} from "./routers/authRouter";
import {neon, neonConfig} from '@neondatabase/serverless';

neonConfig.fetchConnectionCache = true;

const startServer = async () => {

    const app = new Elysia()
        .use(swagger())
        .use(authRoutes)
        .get("/", () => "Hello Elysia")
        .listen(3000);
};

startServer().catch(console.error);