import {t } from 'elysia';

export const ImageUploadResponseType = t.Object({
    status: t.Number(),
    message: t.String(),
    data: t.Optional(t.Object({
        galleryId: t.Number(),
        size: t.Number(),
        type: t.String(),
        name: t.String(),
        base64: t.String()
    }))
});

interface ImageUploadResponseInterface {
    status: number;
    message: string;
    data: {
        galleryId: number;
        size: number;
        type: string;
        name: string;
        base64: string;
    } | null;
}

export class ImageUploadResponse implements ImageUploadResponseInterface {
    constructor(
        public status: number,
        public message: string,
        public data: {
            galleryId: number;
            size: number;
            type: string;
            name: string;
            base64: string;
        } | null
    ) {}

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            data: this.data
        };
    }
}