import {eq} from 'drizzle-orm';
import {db} from './db';
import {admins} from "../schema/schema";

type Admin = typeof admins.$inferInsert;

// 创建管理员
export async function createAdmin(admin: Omit<Admin, '_id' | 'created_at' | 'last_login'>) {
    try {
        const result = await db.insert(admins).values(admin).returning();
        return result[0];
    } catch (error) {
        console.error('Error creating admin:', error);
        throw error;
    }
}

// 通过 ID 获取管理员
export async function getAdminById(id: number) {
    try {
        const result = await db.select().from(admins).where(eq(admins._id, id));
        return result[0];
    } catch (error) {
        console.error('Error getting admin:', error);
        throw error;
    }
}

// 获取所有管理员
export async function getAllAdmins() {
    try {
        return await db.select().from(admins);
    } catch (error) {
        console.error('Error getting all admins:', error);
        throw error;
    }
}

// 更新管理员
export async function updateAdmin(id: number, updateData: Partial<Omit<Admin, '_id' | 'created_at'>>) {
    try {
        const result = await db.update(admins)
            .set({...updateData, last_login: updateData.last_login || new Date()})
            .where(eq(admins._id, id))
            .returning();
        return result[0];
    } catch (error) {
        console.error('Error updating admin:', error);
        throw error;
    }
}

// 删除管理员
export async function deleteAdmin(id: number) {
    try {
        const result = await db.delete(admins).where(eq(admins._id, id)).returning();
        return result[0];
    } catch (error) {
        console.error('Error deleting admin:', error);
        throw error;
    }
}
