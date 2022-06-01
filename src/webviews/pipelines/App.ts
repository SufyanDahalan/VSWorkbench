import { Api } from "../../api";
import { IssueViewEvents } from "../../globals/constants";
import "./App.css";

let api = Api.Instance;
let app = document.getElementById("app");
let selection = 0;

enum Routes {
	PENDING = 0,
	PIPELINES,
	PIPELINE,
}

window.addEventListener("message", (event) => {
	switch (event.data.type) {
		case IssueViewEvents.API_TOKEN: {
			Api.updateAuthToken(event.data.Token);
			Route(Routes.PENDING);
			break;
		}
		case IssueViewEvents.PROJECT_SELECTED: {
			selection = event.data.id;
			Route(Routes.PIPELINES);
			break;
		}
	}
});

async function Route(route: Routes) {
	switch (route) {
		case Routes.PENDING: {
			break;
		}
		case Routes.PIPELINES: {
			api.getProjectPipelines(selection).then((res) => {
				let pipelines: IPipelineListItem[] = res.data as IPipelineListItem[];
				for (const pipeline of pipelines) {
					app!.appendChild(CreatePipelineNode(pipeline));
				}
			});
			break;
		}
		case Routes.PIPELINE: {
			break;
		}
	}
}
// https://graphemica.com/%E2%9F%B3
function CreatePipelineNode(pipeline: IPipelineListItem): Node {
	let el = CreateHtmlNode("div", null, pipeline.id + pipeline.status);
	return el;
}
function CreateHtmlNode(type: string, attributes: { key: string; value: string | Function | boolean }[] | null, innerHTML: string): Node {
	const el = document.createElement(type);
	el.innerHTML = innerHTML;
	if (attributes) {
		for (const attribute of attributes) {
			const key = attribute.key as string;
			const value = attribute.value;
			if (key.startsWith("on") && typeof value === "function") {
				el.addEventListener(key.substring(2) as keyof HTMLElementEventMap, value as EventListenerOrEventListenerObject);
			} else if (typeof value === "boolean") {
				el.setAttribute(key, "");
			} else if (typeof value !== "function") {
				el.setAttribute(key, value);
			} else {
				console.log("Error! Element attribute cannot be set");
			}
		}
	}
	return el;
}
