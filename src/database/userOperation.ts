// src/userOperations.ts
import { eq } from 'drizzle-orm';
import { db } from './db';
import {users} from "../schema/schema";

// 定义 User 类型
type User = typeof users.$inferInsert;

// 创建用户
export async function createUser(user: Omit<User, '_id' | 'created_at' | 'last_login'>) {
    try {
        const result = await db.insert(users).values(user).returning();
        return result[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// 通过 ID 获取用户
export async function getUserById(id: number) {
    try {
        const result = await db.select().from(users).where(eq(users._id, id));
        return result[0];
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

// 获取所有用户
export async function getAllUsers() {
    try {
        return await db.select().from(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        throw error;
    }
}

// 更新用户
export async function updateUser(id: number, updateData: Partial<Omit<User, '_id' | 'created_at'>>) {
    try {
        const result = await db.update(users)
            .set({ ...updateData, last_login: updateData.last_login || new Date() })
            .where(eq(users._id, id))
            .returning();
        return result[0];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// 删除用户
export async function deleteUser(id: number) {
    try {
        const result = await db.delete(users).where(eq(users._id, id)).returning();
        return result[0];
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}
