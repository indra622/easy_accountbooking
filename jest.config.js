module.exports = {
  testEnvironment: 'jsdom', // 테스트 환경을 jsdom으로 설정합니다.
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
