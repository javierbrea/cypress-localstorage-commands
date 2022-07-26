const path = require("path");
const fsExtra = require("fs-extra");

const rootPath = path.resolve(__dirname, "..");
const rootLibPath = path.resolve(rootPath, "..", "..");
const destPath = path.resolve(rootPath, "cypress", "support", "cypress-localstorage-commands");

const SRC_FOLDER = "src";
const INDEX_FILE = "index.js";
const INDEX_TS_FILE = "index.d.ts";
const PLUGIN_FILE = "plugin.js";
const PLUGIN_TS_FILE = "plugin.d.ts";

const libPath = path.resolve(rootLibPath, SRC_FOLDER);
const indexFile = path.resolve(rootLibPath, INDEX_FILE);
const indexTsFile = path.resolve(rootLibPath, INDEX_TS_FILE);
const pluginFile = path.resolve(rootLibPath, PLUGIN_FILE);
const pluginTsFile = path.resolve(rootLibPath, PLUGIN_TS_FILE);

const copyLib = () => {
  fsExtra.removeSync(destPath);
  fsExtra.ensureDirSync(destPath);
  fsExtra.copySync(libPath, path.resolve(destPath, SRC_FOLDER));
  fsExtra.copySync(indexFile, path.resolve(destPath, INDEX_FILE));
  fsExtra.copySync(indexTsFile, path.resolve(destPath, INDEX_TS_FILE));
  fsExtra.copySync(pluginFile, path.resolve(destPath, PLUGIN_FILE));
  fsExtra.copySync(pluginTsFile, path.resolve(destPath, PLUGIN_TS_FILE));
};

copyLib();
