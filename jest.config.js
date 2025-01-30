module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/tests'], // Добавили tests в корневые каталоги
  moduleFileExtensions: ['ts', 'tsx', 'jsx', 'js'],
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jestSetupFile.js'],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '^tests(.*)$': '<rootDir>/tests$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.module\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  resolver: undefined,
  // transformIgnorePatterns: ['/node_modules/(?!react-file-drop)'],
  transformIgnorePatterns: ['/node_modules/(?!identity-obj-proxy)'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '\\.(ts|tsx)$': [
      'ts-jest',
      {
        babel: true,
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  modulePaths: ['src', 'tests'],
  testRegex: '(/tests/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  testPathIgnorePatterns: ['\\.snap$', '\\.sass$', '<rootDir>/node_modules/'],
  cacheDirectory: '.jest/cache',
};
