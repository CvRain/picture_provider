import {ImageService} from "../services/imageService";
import {ImageController} from "../controllers/imageController";
import {Elysia, t} from "elysia";
import {GalleryService} from "../services/galleryService";
import {ImageUploadResponse, ImageUploadResponseType} from "../models/imageModel";

const imageService = new ImageService();
const galleryService = new GalleryService();
const imageController = new ImageController(imageService, galleryService)

export const imageRouter = new Elysia({prefix: '/image'})
    .post("/upload", async ({body, set, params}) => {
        const {file, galleryId} = body

        if (!file) {
            set.status = 400;
            return {status: 400, message: "No file uploaded", data: null};
        }

        if (!galleryId) {
            set.status = 400;
            return {status: 400, message: "Gallery ID is required", data: null};
        }

        return await imageController.uploadImage({
            file,
            galleryId: parseInt(galleryId, 10)
        })
    }, {
        body: t.Object({
            galleryId: t.String(),
            file: t.File()
        }), response: t.Object({
            status: t.Number(),
            message: t.String(),
            data: t.Optional(t.Object({
                galleryId: t.Number(),
                size: t.Number(),
                type: t.String(),
                name: t.String(),
                base64: t.String()
            }))
        })
    })

    // 通过ID获得单张图片
    .get("/get", async ({query, set}) => {
        const {id} = query
        return await imageController.getImage(parseInt(id, 10))
    }, {
        query: t.Object({
            id: t.String()
        }), response: t.Object({
            status: t.Number(),
            message: t.String(),
            data: t.Optional(t.Object({
                id: t.Number(),
                galleryId: t.Number(),
                size: t.Number(),
                type: t.String(),
                name: t.String(),
                base64: t.String()
            }))
        })
    })

    //通过GalleryId获得该Gallery下的所有图片
    .get("/gallery/get", async ({query, set}) => {
        const id = parseInt(query.id as string, 10);
        if (isNaN(id)) {
            set.status = 400;
            return {status: 400, message: "Invalid gallery ID", data: null};
        }
        return await imageController.getAllImagesByGalleryId(id);
    }, {
        query: t.Object({
            id: t.String()
        }), response: ImageUploadResponseType
    })

    // 删除图片
    .delete("/delete", async ({query, set}) => {
        const id = parseInt(query.id as string, 10);
        return await imageController.deleteImage(id);
    }, {
        query: t.Object({
            id: t.String()
        }), response: t.Object({
            status: t.Number(),
            message: t.String(),
            data: t.Optional(t.Any())
        })
    })

