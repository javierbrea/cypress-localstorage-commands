const { GET_SNAPSHOT_TASK, SET_SNAPSHOT_TASK, CLEAR_SNAPSHOT_TASK } = require("./constants");

module.exports = (on, config) => {
  let snapshot = {};

  // Create cypress-local-storage-commands tasks
  on("task", {
    [GET_SNAPSHOT_TASK]: function () {
      return snapshot;
    },
    [SET_SNAPSHOT_TASK]: function (value) {
      snapshot = value;
      return null;
    },
    [CLEAR_SNAPSHOT_TASK]: function () {
      snapshot = {};
      return null;
    },
  });

  return config;
};
