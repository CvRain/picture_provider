import {Elysia, t} from "elysia";
import {GalleryController} from "../controllers/galleryController";
import {GalleryService} from "../services/galleryService";

const galleryService = new GalleryService();
const galleryController = new GalleryController(galleryService)

export const galleryRouter = new Elysia({prefix: '/gallery'})
    //新增图集
    .post("/new", ({body}) => {
        const {galleryName, userId} = body;
        return galleryController.newGallery(galleryName, userId);
    }, {
        body: t.Object({
            userId: t.Number(),
            galleryName: t.String(),
        })
    })
    //获得此用户下的所有图集
    .get("/user/all", ({query}) => {
        const userId = parseInt(query.userId as string);
        return galleryController.getGalleriesByUserId(userId);
    }, {
        query: t.Object({
            userId: t.String()
        })
    })
    //通过id获得一个图集信息
    .get("/usr/get", ({query}) => {
        const galleryId = parseInt(query.galleryId as string);
        return galleryController.getGallery(galleryId);
    }, {
        query: t.Object({
            galleryId: t.String()
        })
    })
    //修改图集名字
    .patch("/usr/update", ({body}) => {
        const {galleryId, galleryName} = body;
        return galleryController.updateGallery(galleryId, galleryName);
    }, {
        body: t.Object({
            galleryId: t.Number(),
            galleryName: t.String()
        })
    })

    //删除图集
    .delete("/usr/delete", async ({body}) => {
        const {id} = body;
        return await galleryController.deleteGallery(id);
    }, {
        body: t.Object({
            id: t.Number()
        }), response: t.Object({
            status: t.Number(),
            message: t.String(),
            data: t.Any()
        })
    })