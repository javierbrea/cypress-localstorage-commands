const sinon = require("sinon");

class Cy {
  constructor() {
    this._sandbox = sinon.createSandbox();

    this._windowMock = {
      localStorage: {
        setItem: () => {},
        getItem: () => {},
        removeItem: () => {},
        clear: () => {},
      },
    };

    this._stubs = {
      on: this._sandbox.stub().callsFake((eventName, callback) => {
        this._callback = callback;
      }),
      log: this._sandbox.stub(),
      stub: this._sandbox.stub,
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

  loadWindow() {
    this._callback(this._windowMock);
  }

  get window() {
    return this._windowMock;
  }
}

module.exports = Cy;
