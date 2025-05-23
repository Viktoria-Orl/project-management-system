export default {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      // если название отличное от tsconfig.json
      tsconfig: "tsconfig.app.json",
    },
  },
  testEnvironment: "jsdom",
};
