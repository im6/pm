import * as fs from "fs";
import * as path from "path";

const dbPath = "";
const filePath = path.join(dbPath, "pm.config");
const configStr = fs.readFileSync(filePath, "utf8");
const configJson = JSON.parse(configStr);

export const getConfig = () => configJson;
