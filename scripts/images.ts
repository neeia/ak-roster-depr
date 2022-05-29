import { promises as fs } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ACESHIP_ROOT = path.join(__dirname, "../../AN-EN-Tags");

/**@type {Array<{ sourceDir: string, destDir: string, replace?: (filename: string) => string, filter?: (filename: string) => boolean}} */
const tasks = [
  {
    sourceDir: `${ACESHIP_ROOT}/img/skills`,
    destDir: "img/skills",
    filter: (filename: string) => filename.endsWith(".png"),
    replace: (filename: string) =>
      path.parse(filename).name.replace(/^skill_icon_/, ""),
  },
  {
    sourceDir: `${ACESHIP_ROOT}/img/avatars`,
    destDir: "img/avatars",
    filter: (filename: string) => /^char_[^_]+_[^_]+(_\d+\+?)?\.png$/.test(filename),
  },
  {
    sourceDir: `${ACESHIP_ROOT}/img/equip/icon`,
    destDir: "img/equip",
    filter: (filename: string) => filename.endsWith(".png"),
  },
  {
    sourceDir: `${ACESHIP_ROOT}/img/portraits`,
    destDir: "img/portraits",
    filter: (filename: string) => /^char_[^_]+_[^_]+_\d+\+?\.png$/.test(filename),
  },
  //{
  //  sourceDir: `${ACESHIP_ROOT}/img/items`,
  //  destDir: "img/items",
  //  filter: (filename) => filename.endsWith(".png"),
  //},
];

const upload = async (existingFilePaths: Set<string>, task: any) => {
  let uploadCount = 0;
  const { sourceDir, destDir, replace: replaceFn, filter: filterFn } = task;
  const dirEntries = await fs.readdir(sourceDir, {
    withFileTypes: true,
  });
  const filenames = dirEntries
    .filter(
      (dirent) => dirent.isFile() && (filterFn == null || filterFn(dirent.name))
    )
    .map((dirent) => dirent.name);
  await Promise.all(
    filenames.map(async (filename) => {
      const targetFilePath = path.join(
        destDir,
        replaceFn ? replaceFn(filename) : path.parse(filename).name
      );
      if (targetFilePath && !existingFilePaths.has(targetFilePath)) {
        console.log(
          `images: "${targetFilePath}" not found in storage, saving...`
        ); 
        await fs.copyFile(filename, targetFilePath);
        uploadCount += 1;
      }
    })
  );
  return uploadCount;
};

const uploadAllImages = async () => {
  // first iterate through all images in the image directory
  const rawDirInfo = await fs.readdir("../img/", { withFileTypes: true });
  const directoryInfo = rawDirInfo.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
  const existingImageIDs = new Set<string>();
  while (directoryInfo.length > 0) {
    const dirName = directoryInfo.pop();
    const rawFileNames = await fs.readdir("../img/" + dirName)
    rawFileNames.forEach(value => existingImageIDs.add("../img/" + value))
  }
  
  console.log(
    `images: found ${existingImageIDs.size} existing images in project.`
  );

  try {
    const uploadCounts = await Promise.all(
      tasks.map((task) => upload(existingImageIDs, task))
    );
    const totalUploadCount = uploadCounts.reduce((acc, cur) => acc + cur, 0);
    console.log(`images: uploaded ${totalUploadCount} new files, done.`);
  } catch (e) {
    console.error(e);
  }
};

export default uploadAllImages;

//if (process.argv[1] === fileURLToPath(import.meta.url)) {
  uploadAllImages();
//}