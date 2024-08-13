import * as fs from "fs";
import * as path from "path";

const dbPath = "";
const filePath = path.join(dbPath, "pm.config");
const configStr = fs.readFileSync(filePath, "utf8");
const configJson = JSON.parse(configStr);

const mounted = {};
configJson.devices.forEach((v: string) => {
  if (fs.existsSync(v)) {
    mounted[v[14]] = true;
  }
});
export const getConfig = () => configJson;
export const findMountedDisc = () => mounted;
