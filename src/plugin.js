const { GET_SNAPSHOT_TASK, SET_SNAPSHOT_TASK, CLEAR_SNAPSHOT_TASK } = require("./constants");

module.exports = (on, config) => {
  const namedSnapshots = {};
  let globalSnapshot = {};

  // Create cypress-local-storage-commands tasks
  on("task", {
    [GET_SNAPSHOT_TASK]: function (name) {
      return name ? namedSnapshots[name] : globalSnapshot;
    },
    [SET_SNAPSHOT_TASK]: function ({ name, snapshot }) {
      if (name) {
        namedSnapshots[name] = snapshot;
      } else {
        globalSnapshot = snapshot;
      }
      return null;
    },
    [CLEAR_SNAPSHOT_TASK]: function (name) {
      if (name) {
        namedSnapshots[name] = {};
      } else {
        globalSnapshot = {};
      }
      return null;
    },
  });

  return config;
};
