import fs from 'fs';
import archiver from 'archiver';
import { SagaAsyncReturn } from '../types';

export function findObjectIndex(array: Array<any>, attr: string, value: any): number {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}
export type FolderPaginationReturnType = {
  status: boolean;
  files?: any;
  error?: any;
};

export function replaceArray(find: string[], replace: string[], stringToReplace: string) {
  for (let i = 0; i < find.length; i += 1) {
    // eslint-disable-next-line no-param-reassign
    stringToReplace = stringToReplace.replace(find[i], replace[i]);
  }
  return stringToReplace;
}

export async function saveJsonFile(path: string, data: any, fileName?: string) {
  fs.writeFileSync(`${path + fileName}.json`, JSON.stringify(data));
}

export async function deleteJsonFile(path: string, fileName?: string) {
  fs.unlinkSync(`${path + fileName}.json`);
}

export async function getJsonFile(
  path: string,
  fileName: string,
  defaultData: string = '[]'
): Promise<SagaAsyncReturn> {
  try {
    if (!fs.existsSync(path + fileName)) {
      fs.writeFileSync(path + fileName, defaultData);
      return {
        status: true,
        data: [],
        error: '',
      };
    }

    const fileContents = fs.readFileSync(path + fileName, 'utf8');
    try {
      const data = JSON.parse(fileContents);
      if (data !== undefined || data !== null || data !== '') {
        return {
          status: true,
          data,
          error: '',
        };
      }
    } catch (error) {
      // json error
      fs.writeFileSync(path + fileName, defaultData);
      return {
        status: true,
        data: [],
        error: '',
      };
    }
    return { status: false, error: 'Corrupted json.' };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
}

export async function getFolderWithPagination(
  path: string,
  page: number = 0,
  limit: number,
  fileFormats: Array<string> = ['.json']
): Promise<FolderPaginationReturnType> {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    const offset = page * limit;

    let index = 0;
    const files: Array<string> = [];
    fs.readdirSync(path).forEach((file) => {
      if (fileFormats.indexOf(file.substr(file.length - 5)) !== -1) {
        index += 1;
        if (offset + limit === index) {
          return;
        }
        if (offset < index) {
          files.push(replaceArray(fileFormats, [''], file));
        }
      }
    });
    return { status: true, files, error: '' };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
}

export function zipDirectory(
  zipPath: string,
  folderToZip: string,
  formats: Array<string> = ['.json']
) {
  const stream = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    archive.on('error', (err) => reject(err)).pipe(stream);
    fs.readdirSync(folderToZip).forEach((file) => {
      if (formats.includes(file.substr(file.length - 5)) !== false) {
        archive.append(folderToZip, { name: file } as archiver.EntryData);
      }
    });

    stream.on('close', () => resolve(true));
    archive.finalize();
  });
}

export type MoveToNewPath = {
  oldPath: string;
  newPath: string;
};
export function moveToNewPaths(
  paths: Array<MoveToNewPath>,
  formats: Array<string> = ['.json']
) {
  return new Promise((resolve, reject) => {
    try {
      for (let i = 0; i < paths.length; i += 1) {
        if (paths[i].newPath !== '' && paths[i].oldPath !== paths[i].newPath) {
          fs.readdirSync(paths[i].oldPath).forEach((file) => {
            if (formats.includes(file.substr(file.length - 5)) !== false) {
              fs.renameSync(paths[i].oldPath + file, paths[i].newPath + file);
            }
          });
        }
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

export async function checkIfDirectoryEmpty(dir: string) {
  return fs.promises.readdir(dir).then((files) => {
    return files.length === 0;
  });
}
