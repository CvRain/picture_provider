import pg from 'pg';
import {drizzle} from 'drizzle-orm/node-postgres';

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    user: 'cvrain',
    password: 'qwe812928',
    database: 'mydb',
    ssl: false
});

export const db = drizzle(pool);
