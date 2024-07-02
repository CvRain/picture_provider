import {defineConfig} from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "src/schema/schema.ts",
    out: "drizzle",
    dbCredentials: {
        host: 'localhost',
        port: 5432,
        user: 'cvrain',
        password: 'qwe812928',
        database: 'mydb',
        ssl: false
    }
});
