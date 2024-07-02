// src/schema.ts
import { pgTable, serial, text, timestamp, integer, foreignKey } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
    _id: serial('_id').primaryKey(),
    user_name: text('user_name').notNull(),
    password: text('password').notNull(),
    email: text('email').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    last_login: timestamp('last_login')
});

// Admins table
export const admins = pgTable('admins', {
    _id: serial('_id').primaryKey(),
    user_name: text('user_name').notNull(),
    password: text('password').notNull(),
    email: text('email').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    last_login: timestamp('last_login')
});

// Galleries table
export const galleries = pgTable('galleries', {
    _id: serial('_id').primaryKey(),
    name: text('name').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    user_id: integer('user_id').notNull().references(() => users._id)
});

// Images table
export const images = pgTable('images', {
    _id: serial('_id').primaryKey(),
    name: text('name').notNull(),
    size: integer('size').notNull(),
    type: text('type').notNull(),
    data: text('data').notNull(), // 注意：对于大型二进制数据，可能需要使用 bytea 类型
    upload_at: timestamp('upload_at').defaultNow().notNull(),
    gallery_id: integer('gallery_id').notNull().references(() => galleries._id)
});
