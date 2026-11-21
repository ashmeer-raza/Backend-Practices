import os from "os";
import path from "path";

export const HOME_DIR = os.homedir(); // /User/DELL
export const CONFIG_DIR = path.join(HOME_DIR, ".beta"); // /User/DELL/.beta/ (if beta folder not exist it will create there)
