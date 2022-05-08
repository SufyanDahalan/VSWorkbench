// @ts-check
"use strict";
//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

/** @type WebpackConfig */
const extensionConfig = {
	target: "node", // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
	mode: "none", // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

	entry: "./src/extension.ts", // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
	output: {
		// the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
		path: path.resolve(__dirname, "dist"),
		filename: "extension.js",
		libraryTarget: "commonjs2",
	},
	externals: {
		vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
		// modules added here also need to be added in the .vscodeignore file
	},
	resolve: {
		// support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader",
					},
				],
			},
		],
	},
	devtool: "nosources-source-map",
	infrastructureLogging: {
		level: "log", // enables logging required for problem matchers
	},
    optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
};
const viewConfig = {
	entry: "./src/webviews/issues/app/App.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "issues/[name].js",
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: { import: true, modules: true, importLoaders: 1, sourceMap: true },
					},
					"postcss-loader",
				],
			},
		],
	},
	externals: {
		vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
		// modules added here also need to be added in the .vscodeignore file
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
};
const pipelineConfig = {
	entry: "./src/webviews/pipelines/app/App.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "pipelines/[name].js",
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
	externals: {
		vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
		// modules added here also need to be added in the .vscodeignore file
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
	},
    optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
};

module.exports = [extensionConfig, viewConfig, pipelineConfig];
