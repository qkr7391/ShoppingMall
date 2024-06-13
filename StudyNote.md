# Online Shopping Mall Project

---

A project to create an online shopping mall site using React/Redux that allows users to register, add to cart, delete, or purchase simple products.

## Lecture 01 - Create React with Vite

---

npm init vite

Setting directories and files structure.

## Lecture 02 - Setting Vite ESlint

---

npm i -D vite-plugin-eslint eslint eslint-config-react-app

[frontend/vite.config.js]

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint"; //add

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslint()], //add eslint()
});
```

[frontend/.eslintrc.cjs]

```js
module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"react-app", // add
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh"],
	rules: {
		"react/jsx-no-target-blank": "off",
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
	},
};
```
