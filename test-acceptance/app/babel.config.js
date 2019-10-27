module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "cypress-localstorage-commands": `../../`
        }
      }
    ]
  ]
};
