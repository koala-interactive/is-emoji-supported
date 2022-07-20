module.exports = {
  resetMocks: true,
  restoreMocks: true,

  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  }
};
