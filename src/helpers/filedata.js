import { join } from "path"
import { readFile, writeFile } from "fs/promises"

const getFilePath = (fileName) =>
  join(process.cwd(), `src/data/${fileName}`);

export async function getData(fileName) {
  try {
    const filePath = getFilePath(fileName);
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`getData da xatolik: ${error.message}`);
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function setData(fileName, data) {
  const filePath = getFilePath(fileName);
  await writeFile(filePath, JSON.stringify(data, null, 2));
}