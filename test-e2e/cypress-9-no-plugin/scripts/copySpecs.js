const path = require("path");
const fsExtra = require("fs-extra");

const rootPath = path.resolve(__dirname, "..");
const destPath = path.resolve(rootPath, "cypress", "integration");
const specsPath = path.resolve(rootPath, "..", "specs", "cypress", "e2e");

const copyLib = () => {
  fsExtra.removeSync(destPath);
  fsExtra.copySync(specsPath, destPath);
};

copyLib();
