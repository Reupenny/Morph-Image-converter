import { blobToURL, urlToBlob, fromBlob, fromURL } from 'image-resize-compress';

export async function imageConverter(image, quality, width, height, format) {
    if (width == 0 || !width) {
        width = 'auto'
    }
    if (height == 0 || !height) {
        height = 'auto'
    }
    console.log(width, height)
    const resizedBlob = await fromBlob(image, quality, width, height, format)
    return resizedBlob

}