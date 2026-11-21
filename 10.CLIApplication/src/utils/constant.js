import os from "os";
import path from "path";

export const HOME_DIR = os.homedir(); // /User/ashmeerraza
export const CONFIG_DIR = path.join(HOME_DIR, ".beta"); // /User/ashmeerraza/.beta (if beta folder not exist it will create there)
