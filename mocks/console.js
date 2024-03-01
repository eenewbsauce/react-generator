const mocks = {};

const muteConsole = () => {
  mocks.error = jest.spyOn(console, "error");
  mocks.info = jest.spyOn(console, "info");
  mocks.log = jest.spyOn(console, "log");
  mocks.warn = jest.spyOn(console, "warn");

  mocks.error.mockImplementation(() => {});
  mocks.info.mockImplementation(() => {});
  mocks.log.mockImplementation(() => {});
  mocks.warn.mockImplementation(() => {});

  return restoreConsole;
};

const restoreConsole = () => {
  mocks.error.mockRestore();
  mocks.info.mockRestore();
  mocks.log.mockRestore();
  mocks.warn.mockRestore();
};

module.exports = {
  muteConsole,
  mocks,
};
