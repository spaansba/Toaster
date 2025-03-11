// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  plugins: ["eslint-plugin-react-compiler"],
  rules: {
    "react-compiler/react-compiler": "error",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./"], // Or point to your project's root folder
          ["@10play/tentap-editor", "./node_modules/@10play/tentap-editor"],
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
  },
}
