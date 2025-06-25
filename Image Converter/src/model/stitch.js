import { blobToURL, urlToBlob, fromBlob, fromURL } from 'image-resize-compress';

export async function stitch(image, quality, width, height, format) {
    const resizedBlob = await fromBlob(image, quality, width, height, format)
    return resizedBlob

}