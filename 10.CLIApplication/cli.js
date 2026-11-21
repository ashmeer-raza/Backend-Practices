#!/usr/bin/env node
import "dotenv/config";
import os from "os";
import path from "path";

const homedir = os.homedir();

console.log(homedir);
