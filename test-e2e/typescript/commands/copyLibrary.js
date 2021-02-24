const path = require("path");
const fsExtra = require("fs-extra");

const rootPath = path.resolve(__dirname, "..");
const rootLibPath = path.resolve(rootPath, "..", "..");
const destPath = path.resolve(rootPath, "cypress", "support", "cypress-localstorage-commands");

const SRC_FOLDER = "src";
const INDEX_FILE = "index.js";
const INDEX_TS_FILE = "index.d.ts";

const libPath = path.resolve(rootLibPath, SRC_FOLDER);
const indexFile = path.resolve(rootLibPath, INDEX_FILE);
const indexTsFile = path.resolve(rootLibPath, INDEX_TS_FILE);

const copyLib = () => {
  fsExtra.removeSync(destPath);
  fsExtra.ensureDirSync(destPath);
  fsExtra.copySync(libPath, path.resolve(destPath, SRC_FOLDER));
  fsExtra.copySync(indexFile, path.resolve(destPath, INDEX_FILE));
  fsExtra.copySync(indexTsFile, path.resolve(destPath, INDEX_TS_FILE));
};

copyLib();
