import { eq } from 'drizzle-orm';
import { db } from './db';
import {galleries} from "../schema/schema";

type Gallery = typeof galleries.$inferInsert;

// 创建画廊
export async function createGallery(gallery: Omit<Gallery, '_id' | 'created_at' | 'updated_at'>) {
    try {
        const result = await db.insert(galleries).values(gallery).returning();
        return result[0];
    } catch (error) {
        console.error('Error creating gallery:', error);
        throw error;
    }
}

// 通过 ID 获取画廊
export async function getGalleryById(id: number) {
    try {
        const result = await db.select().from(galleries).where(eq(galleries._id, id));
        return result[0];
    } catch (error) {
        console.error('Error getting gallery:', error);
        throw error;
    }
}

// 获取所有画廊
export async function getAllGalleries() {
    try {
        return await db.select().from(galleries);
    } catch (error) {
        console.error('Error getting all galleries:', error);
        throw error;
    }
}

// 更新画廊
export async function updateGallery(id: number, updateData: Partial<Omit<Gallery, '_id' | 'created_at'>>) {
    try {
        const result = await db.update(galleries)
            .set({ ...updateData, updated_at: new Date() })
            .where(eq(galleries._id, id))
            .returning();
        return result[0];
    } catch (error) {
        console.error('Error updating gallery:', error);
        throw error;
    }
}

// 删除画廊
export async function deleteGallery(id: number) {
    try {
        const result = await db.delete(galleries).where(eq(galleries._id, id)).returning();
        return result[0];
    } catch (error) {
        console.error('Error deleting gallery:', error);
        throw error;
    }
}
