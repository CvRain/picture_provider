import {ApiResponse} from "../models/response";
import {ImageService} from "../services/imageService";
import {ImageUploadResponse} from "../models/imageModel";
import {GalleryService} from "../services/galleryService";

export class ImageController {
    constructor(
        private imageService: ImageService,
        private galleryService : GalleryService
    ) {
    }

    async uploadImage({file, galleryId}: { file: File, galleryId: number}) {
        console.log("file:", file)
        if (!file) {
            return new ImageUploadResponse(400, "No file provided", null).toJSON();
        }

        try {
            // 读取文件内容
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // 获取文件信息
            const size = file.size;
            const type = file.type;
            const name = file.name;

            // 转换为 base64
            const base64 = buffer.toString('base64');

            const imageInfo =  new ImageUploadResponse(200, "Image uploaded successfully", {
                galleryId,
                size,
                type,
                name,
                base64
            });

            await this.imageService.uploadImage(imageInfo);
            return imageInfo.toJSON();
        } catch (error) {
            console.error("Error uploading image:", error);
            return new ApiResponse(500, "Internal server error", null).toJSON();
        }
    }

    async deleteImage(imageId: number) {
        //检查图片是否存在
        if (!await this.imageService.checkImageExist(imageId)) {
            return new ApiResponse(404, "Image not found", null).toJSON();
        }
        await this.imageService.deleteImage(imageId);
        return new ApiResponse(200, "Image deleted successfully", null).toJSON();
    }

    async getImage(imageId: number) {
        //检查图片是否存在
        if (!await this.imageService.checkImageExist(imageId)) {
            return new ApiResponse(404, "Image not found", null).toJSON();
        }
        const image = await this.imageService.getImage(imageId);
        return new ApiResponse(200, "Image retrieved successfully", image).toJSON();
    }

    async getAllImagesByGalleryId(galleryId: number) {
        //检查gallery是否存在
        if (!await this.galleryService.checkGalleryExist(galleryId)) {
            return new ApiResponse(404, "Gallery not found", null).toJSON();
        }
        const images =  await this.imageService.getAllImagesByGalleryId(galleryId);
        return new ApiResponse(200, "Images retrieved successfully", images).toJSON();
    }
}
