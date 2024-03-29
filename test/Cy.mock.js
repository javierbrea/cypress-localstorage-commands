const sinon = require("sinon");

const doNothing = () => {
  // do nothing
};

class Cy {
  constructor() {
    this._sandbox = sinon.createSandbox();

    this._windowMock = {
      localStorage: {
        setItem: doNothing,
        getItem: doNothing,
        removeItem: doNothing,
        clear: doNothing,
      },
    };

    this._stubs = {
      on: this._sandbox.stub().callsFake((_eventName, callback) => {
        this._callback = callback;
      }),
      log: this._sandbox.stub(),
      stub: this._sandbox.stub,
      task: this._sandbox.stub().resolves(),
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
