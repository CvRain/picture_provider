import { eq } from 'drizzle-orm';
import { db } from './db';
import {images} from "../schema/schema";

type Image = typeof images.$inferInsert;

// 创建图片
export async function createImage(image: Omit<Image, '_id' | 'upload_at'>) {
    try {
        const result = await db.insert(images).values(image).returning();
        return result[0];
    } catch (error) {
        console.error('Error creating image:', error);
        throw error;
    }
}

// 检查图片是否存在
export async function checkImageExist(id: number) {
    try {
        const result = await db.select().from(images).where(eq(images._id, id));
        return result.length > 0;
    } catch (error) {
        console.error('Error checking image existence:', error);
        throw error;
    }
}

// 通过 ID 获取图片
export async function getImageById(id: number) {
    try {
        const result = await db.select().from(images).where(eq(images._id, id));
        return result[0];
    } catch (error) {
        console.error('Error getting image:', error);
        throw error;
    }
}

// 获取所有图片
export async function getAllImages() {
    try {
        return await db.select().from(images);
    } catch (error) {
        console.error('Error getting all images:', error);
        throw error;
    }
}

// 通过画廊ID获得所有图片
export async function getImagesByGalleryId(galleryId: number) {
    try {
        return await db.select().from(images).where(eq(images.gallery_id, galleryId));
    } catch (error) {
        console.error('Error getting images by gallery ID:', error);
        throw error;
    }
}

// 更新图片
export async function updateImage(id: number, updateData: Partial<Omit<Image, '_id' | 'upload_at'>>) {
    try {
        const result = await db.update(images)
            .set(updateData)
            .where(eq(images._id, id))
            .returning();
        return result[0];
    } catch (error) {
        console.error('Error updating image:', error);
        throw error;
    }
}

// 删除图片
export async function deleteImage(id: number) {
    try {
        const result = await db.delete(images).where(eq(images._id, id)).returning();
        return result[0];
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
}
