module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
