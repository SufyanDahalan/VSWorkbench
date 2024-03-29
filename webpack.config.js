// @ts-check
"use strict";
//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/
const path = require("path");

/** @type WebpackConfig */
const extensionConfig = {
	target: "node",
	mode: "production",
	entry: "./src/extension.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "extension.js",
		libraryTarget: "commonjs2",
	},
	externals: {
		vscode: "commonjs vscode",
	},
	resolve: {
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
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
        
            },
		],
	},
	devtool: "nosources-source-map",
	infrastructureLogging: {
		level: "log",
	},
	optimization: { minimize: true },
      watchOptions: {
    ignored: /node_modules/,
  },
};
const viewConfig = {
	entry: "./src/webviews/issues/App.ts",
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
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
	externals: {
		vscode: "commonjs vscode",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
	},
	optimization: { minimize: true },
      watchOptions: {
    ignored: /node_modules/,
  },
};
const editorConfig = {
	entry: "./src/webviews/editor/App.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "editor/[name].js",
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
		vscode: "commonjs vscode",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
	},
	optimization: { minimize: true },
      watchOptions: {
    ignored: /node_modules/,
  },
};

const pipelineConfig = {
	entry: "./src/webviews/pipelines/App.ts",
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
		vscode: "commonjs vscode",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
	},
	optimization: { minimize: true },
      watchOptions: {
    ignored: /node_modules/,
  },
};

module.exports = [extensionConfig, viewConfig, pipelineConfig, editorConfig];
