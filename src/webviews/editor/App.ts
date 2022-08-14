import { CreateHtmlNode, ViewEvents, html } from "../../globals/constants";
import { Api } from "../../api";
import "./App.css";

let api = Api.Instance;
let app = document.getElementById("app")!;

window.addEventListener("message", (event) => {
	switch (event.data.type) {
		case ViewEvents.API_TOKEN: {
			Api.updateAuthToken(event.data.Token);
			break;
		}
		case ViewEvents.Wiki: {
			Wiki(event.data.isGroup, event.data.id);
			break;
		}
		case ViewEvents.Snippets: {
			Snippet(event.data.id);
			break;
		}
	}
});
async function Snippet(id?: number, snippet_id?: number) {
	if (snippet_id) {
		api.getSnippet(id, snippet_id).then((res) => {
			api.getSnippetContent(id, snippet_id).then((contentRes) => {
				app.innerHTML = "";
				app.append(
					html(`
                    <div>
                        <h1>${res.data.title}</h1>
                        ${res.data.files
							.map((file: any) => {
								return `<div><h1>${file.raw_url}</h1>
                        ${contentRes.data
							.split("\n")
							.map((line: any) => `<div> ${line} </div>`)
							.join("")}
                        </div>`;
							})
							.join("")}
                    </div>
                    `)
				);
			});
		});
	} else if (!snippet_id) {
		api.getSnippets(id).then((res) => {
			let author: string = res.data[0].title;
			res.data.forEach((snippet: any) => {
				app.innerHTML = "";
				app.append(
					CreateHtmlNode({
						type: "div",
						attributes: [
							{
								key: "child",
								value: {
									type: "a",
									attributes: [
										{ key: "href", value: snippet.author.web_url },
										{
											key: "child",
											value: {
												type: "img",
												attributes: [
													{ key: "src", value: snippet.author.avatar_url },
													{ key: "alt", value: "Avatar" },
												],
											},
										},
									],
								},
							},
							{
								key: "child",
								value: {
									type: "a",
									innerHTML: snippet.title,
									attributes: [{ key: "onclick", value: () => Snippet(id, snippet.id) }],
								},
							},
							{
								key: "child",
								value: { type: "a", innerHTML: snippet.id, attributes: [{ key: "href", value: snippet.web_url }] },
							},
							{
								key: "child",
								value: { type: "a", innerHTML: snippet.author.name, attributes: [{ key: "href", value: snippet.author.web_url }] },
							},
						],
					})
				);
			});
		});
	}
}
async function Wiki(isGroup: boolean, id: number, slug?: string) {
	api.getWikis(isGroup, id).then((res) => {
		api.getWikiPage(isGroup, id, slug || "home").then(function (homeRes) {
			let pages = res.data;
			let homePage = homeRes.data;
			let pageDiv = CreateHtmlNode({ type: "div", attributes: [{ key: "class", value: "page" }] });
			console.log(homePage);
			homePage.content.split(/\r?\n/).forEach((line: any) => {
				if (line) {
					pageDiv.appendChild(CreateHtmlNode({ type: "div", innerHTML: line }));
				} else {
					pageDiv.appendChild(CreateHtmlNode({ type: "br" }));
				}
			});
			let sideBarDiv = CreateHtmlNode({ type: "div", attributes: [{ key: "class", value: "sidebar" }] });

			pages.map((page: any) => {
				sideBarDiv.appendChild(
					CreateHtmlNode({
						type: "div",
						attributes: [
							{
								key: "child",
								value: {
									type: "a",
									attributes: [
										{ key: "onclick", value: () => Wiki(isGroup, id, page.slug) },
										{ key: "href", value: "#" },
									],
									innerHTML: page.title,
								},
							},
						],
					})
				);
			});
			app.innerHTML = "";
			app.appendChild(pageDiv);
			app.appendChild(sideBarDiv);
		});
	});
}
