// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const remarkMermaid = require("remark-mermaid");
const lunrSearch = require.resolve("docusaurus-lunr-search");

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "VSWorkbench",
	tagline: "Dinosaurs are cool",
	url: "https://vsworkbench.dahalan.de/",
	baseUrl: "/",
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	organizationName: "SufyanDahalan", // Usually your GitHub org/user name.
	projectName: "vsworkbench", // Usually your repo name.
	trailingSlash: true,
    deploymentBranch: "gh-pages",
	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
                    routeBasePath: '/', // Serve the docs at the site's root
                    sidebarPath: require.resolve("./sidebars.js"),
                    remarkPlugins: [[remarkMermaid, { simple: true }]]
				},
				blog: {
					showReadingTime: true,
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: "VSWorkbench",
				logo: {
					alt: "My Site Logo",
					src: "img/logo.svg",
				},
				items: [
					{
						type: "doc",
						docId: "intro",
						position: "left",
						label: "Tutorial",
					},
					{ to: "/blog", label: "Blog", position: "left" },
					{
						href: "https://github.com/SufyanDahalan/vsworkbench",
						label: "GitHub",
						position: "right",
					},
				],
			},
			footer: {
				style: "dark",
				links: [
					{
						title: "Docs",
						items: [
							{
								label: "Documentation",
								to: "/",
							},
						],
					},
					{
						title: "Community",
						items: [
							{
								label: "Stack Overflow",
								href: "https://stackoverflow.com/questions/tagged/docusaurus",
							},
							{
								label: "Discord",
								href: "https://discordapp.com/invite/docusaurus",
							},
							{
								label: "Twitter",
								href: "https://twitter.com/docusaurus",
							},
						],
					},
					{
						title: "More",
						items: [
							{
								label: "Blog",
								to: "/blog",
							},
							{
								label: "GitHub",
								href: "https://github.com/SufyanDahalan/vsworkbench",
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Sufyan Dahalan.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
        plugins: [lunrSearch]
};

module.exports = config;
