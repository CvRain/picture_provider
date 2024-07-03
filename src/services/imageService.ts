import {createImage, deleteImage, getAllImages, getImageById, getImagesByGalleryId} from "../database/imageOperation";
import {ImageUploadResponse} from "../models/imageModel";

export class ImageService {
    constructor() {
    }

    //上传一张图片
    async uploadImage(image: ImageUploadResponse){
        const data = image.data;
        return await createImage({
            name: data?.name || '',
            gallery_id: data?.galleryId || 0,
            data: data?.base64 || '',
            size: data?.size || 0,
            type: data?.type || 'jpg'
        });
    }

    async checkImageExist (imageId: number){
        return await getImageById(imageId)
    }

    async getImage(imageId: number){
        return await getImageById(imageId)
    }

    async getAllImagesByGalleryId(galleryId: number){
        return await getImagesByGalleryId(galleryId)
    }

    async getAllImages(){
        return await getAllImages()
    }

    async deleteImage(imageId: number){
        return await deleteImage(imageId)
    }
}