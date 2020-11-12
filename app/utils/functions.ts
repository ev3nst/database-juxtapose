import fs from 'fs';
import archiver from 'archiver';

export function findObjectIndex(array: Array<any>, attr: string, value: any): number {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
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
