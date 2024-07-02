import {Elysia} from "elysia";
import {swagger} from "@elysiajs/swagger";
import {authRoutes} from "./routers/authRouter";
import {db} from "./database/db";
import {neon, neonConfig} from '@neondatabase/serverless';
import {sql} from "drizzle-orm";

neonConfig.fetchConnectionCache = true;

async function testConnection() {
    try {
        const query = sql`SELECT current_database()`;
        const result = await db.execute(query);
        console.log(result.rows);
    } catch (error) {
        console.error("Error:", error);
    }
}


const startServer = async () => {
    await testConnection()

    const app = new Elysia()
        .use(swagger())
        .use(authRoutes)
        .get("/", () => "Hello Elysia")
        .listen(3000);
};

startServer().catch(console.error);