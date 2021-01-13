import fs from 'fs';
// import sharp from 'sharp';

interface ImageModifiers {
  width?: number,
  height?: number,
  format?: string,
  quality?: number,
};

interface ResolvedImage {
  imagePath: string | undefined,
  isCache: boolean,
};


const resolveImage = async (fileName: string, imageModifiers: ImageModifiers = {}): Promise<ResolvedImage> => {
  const imagesBasePath = 'images/base';
  const imagesModifiedPath = 'images/modified';

  let imagePath = '';
  fs.promises.access(`${imagesBasePath}/fjord.jpg`)
    .then(() => {
      // ... set image and cache value
    })
    .catch((err) => {
      // run access again, but for base path. If it fails, throw an error that it doesn't exist.
    });


  // TODO: Set a maximum width/height
  // TODO: use fs to find image.
  // TODO: use sharp to modify image if it doesn't already exist.

  return {
    imagePath: fileName,
    isCache: false,
  }
}



export default {
  resolveImage,
  // modify,
}
