import fs from 'fs';
import sharp from 'sharp';

interface ImageModifiers {
  width?: string;
  height?: string;
  quality?: string;
}

interface ResolvedImage {
  path: string | undefined;
  pathData: {
    location: string;
    fileName: string;
    fileType: string;
    modifierString: string;
  };
  fromCache: boolean;
}

/* **************** */
/* Internal Methods */
/* **************** */

const createDirIfNone = (dir: string) => !fs.existsSync(dir) && fs.mkdirSync(dir);

const fileExists = async (path: string): Promise<boolean> =>
  await fs.promises
    .access(path)
    .then(() => true)
    .catch(() => false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queryValue = (key: string, value: any, isFirst = false): string => {
  if (!value) {
    return '';
  }
  return `${isFirst ? '?' : '&'}${key}=${value}`;
};

const stringifyModifiers = (imageModifiers: ImageModifiers = {}): string => {
  return [
    queryValue('width', imageModifiers.width, true),
    queryValue('height', imageModifiers.height),
    queryValue('quality', imageModifiers.quality),
  ].join('');
};

const modifyImage = async (
  imageData: ResolvedImage,
  imageModifiers: ImageModifiers = {},
): Promise<string> => {
  const width = imageModifiers.width ? parseInt(imageModifiers.width, 10) : undefined;
  const height = imageModifiers.height ? parseInt(imageModifiers.height, 10) : undefined;
  const quality = imageModifiers.quality ? parseInt(imageModifiers.quality, 10) : undefined;
  const { fileName, fileType, modifierString } = imageData.pathData;
  const newImagePath = `images/modified/${fileName}${modifierString}${fileType}`;

  await sharp(imageData.path)
    .resize(width, height)
    .jpeg({
      quality: quality || 75,
      force: false,
    })
    .toFile(newImagePath)
    .catch((err) => {
      throw new Error(err);
    });

  return newImagePath;
};

/* ************** */
/* Public Methods */
/* ************** */

const findImage = async (
  file: string,
  imageModifiers: ImageModifiers = {},
): Promise<ResolvedImage | undefined> => {
  const modifiedDir = 'images/modified';
  const baseDir = 'images/base';

  const [, fileName, fileType] = file.match(/^(.+)(\.\w+)$/) as RegExpMatchArray;
  const stringifiedModifiers = stringifyModifiers(imageModifiers);

  // Attempt to find the image in the modified folder.
  createDirIfNone(modifiedDir);
  const modifiedImagePath = `${modifiedDir}/${fileName}${stringifiedModifiers}${fileType}`;
  const existsInModified = await fileExists(modifiedImagePath);
  if (existsInModified) {
    return {
      path: modifiedImagePath,
      pathData: {
        location: modifiedDir,
        fileName: fileName,
        fileType: fileType,
        modifierString: stringifiedModifiers,
      },
      fromCache: true,
    };
  }

  // If we don't find the modified image, look for the base instead.
  const baseImagePath = `${baseDir}/${file}`;
  const existsInBase = await fileExists(baseImagePath);
  if (existsInBase) {
    return {
      path: baseImagePath,
      pathData: {
        location: baseDir,
        fileName: fileName,
        fileType: fileType,
        modifierString: stringifiedModifiers,
      },
      fromCache: false,
    };
  }

  return undefined;
};

const resolveImage = async (
  path: string,
  imageModifiers: ImageModifiers = {},
): Promise<string | undefined> => {
  const imageData = await findImage(path, imageModifiers);

  if (imageData && imageData.fromCache && imageData.path) {
    return imageData.path;
  }

  if (imageData && !imageData.fromCache) {
    return await modifyImage(imageData, imageModifiers);
  }

  return undefined;
};

export default {
  findImage,
  resolveImage,
};
