import {GalleryService} from "../services/galleryService";
import {ApiResponse} from "../models/response";
import {Context} from "elysia";
import {GalleryParams} from "../models/galleryModel";
import {deleteGallery} from "../database/galleryOperation";

export class GalleryController {
    constructor(private galleryService: GalleryService) {
    }

    async newGallery(galleryName: string, userId: number) {
        return await this.galleryService.newGallery(galleryName, userId)
    }

    async getGallery(galleryId: number) {
        if(! await this.galleryService.checkGalleryExist(galleryId)){
            return new ApiResponse(404, "gallery not found", null)
        }
        return new ApiResponse(200, "success", await this.galleryService.getGallery(galleryId))
    }

    async getGalleriesByUserId(userId: number) {
        console.log("get galleries by user id: ", userId);
        return await this.galleryService.getUserGalleries(userId)
    }


    async updateGallery(galleryId: number, galleryName: string) {
        //检查gallery 是否存在
        const galleryInfo = await this.galleryService.getGallery(galleryId)
        if (!galleryInfo) {
            return {
                status: 404,
                message: "gallery not found"
            }
        }
        return await this.galleryService.updateGallery(galleryId, galleryName)
    }

    async deleteGallery(id: number){
        if(isNaN(id)){
            return new ApiResponse(400, "invalid id", null).toJSON()
        }
        const galleryInfo = await this.galleryService.getGallery(id)
        if(!galleryInfo){
            return new ApiResponse(404, "gallery not found", null)
        }
        await this.galleryService.deleteGallery(id);
        return new ApiResponse(200, "success", null).toJSON()
    }
}