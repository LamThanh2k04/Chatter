import {BadRequestException, PipeTransform } from "@nestjs/common";
import { UploadedFileType } from "../types/uploadedFile.type";



export class VideoFileValidationPipe implements PipeTransform {
    constructor(
        private readonly options: {
            maxSize: number,
            allowedMimeTypes : string[]
        }
    ) { }

    transform(file : UploadedFileType) {

        if(file.size > this.options.maxSize) {
            throw new BadRequestException('Video không được quá ' + (this.options.maxSize / (1024 * 1024)).toFixed() + ' MB');
        }

        if(!this.options.allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException('Video không hợp lệ, chỉ chấp nhận các định dạng: ' + this.options.allowedMimeTypes.join(', '));
        }
        return file
    }

}