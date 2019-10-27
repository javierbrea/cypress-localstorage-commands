const sinon = require("sinon");

const LOCALSTORAGE_METHODS = ["getItem", "setItem", "removeItem", "clear"];

const Mock = class Mock {
  constructor() {
    this._sandbox = sinon.createSandbox();

    this._stubs = {
      getItem: this._sandbox.stub().callsFake(key => {
        return this._stubs[key];
      }),
      setItem: this._sandbox.stub().callsFake((key, value) => {
        if (!LOCALSTORAGE_METHODS.includes(key)) {
          this._stubs[key] = value;
        }
      }),
      removeItem: this._sandbox.stub().callsFake(key => {
        delete this._stubs[key];
      }),
      clear: this._sandbox.stub().callsFake(() => {
        Object.keys(this._stubs).forEach(key => {
          if (!LOCALSTORAGE_METHODS.includes(key)) {
            delete this._stubs[key];
          }
        });
      })
    };
  }

  get stubs() {
    return this._stubs;
  }

  restore() {
    this._sandbox.restore();
  }

  reset() {
    this._sandbox.reset();
  }
};

module.exports = Mock;
