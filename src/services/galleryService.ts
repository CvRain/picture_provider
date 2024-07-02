import {
    createGallery,
    deleteGallery,
    getGalleriesByUserId,
    getGalleryById,
    updateGallery
} from "../database/galleryOperation";
import {GalleryInfoRequest} from "../models/galleryModel";

export class GalleryService {
    constructor() {
    }

    async getUserGalleries(userId: number) {
        return await getGalleriesByUserId(userId);
    }

    async getGallery(galleryId: number) {
        return await getGalleryById(galleryId);
    }

    async checkGalleryExist(galleryId: number){
        const gallery = await getGalleryById(galleryId);
        return gallery !== null;
    }

    async newGallery(galleryName: string, userId: number) {
        return await createGallery({
            name: galleryName,
            user_id: userId
        });
    }

    async updateGallery(galleryId: number, galleryName:string){
        return await updateGallery(galleryId, {
            name: galleryName,
            //updated_at: new Date()
        })
    }

    async deleteGallery(galleryId: number) {
        return await deleteGallery(galleryId);
    }
}