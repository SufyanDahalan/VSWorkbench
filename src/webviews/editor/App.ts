import { ViewEvents } from "../../globals/constants";
// import { CreateHtmlNode } from "../../globals/functions";
import { Api } from "../../api";
import "./App.css";

let api = Api.Instance;
let app = document.getElementById("app");

window.addEventListener("message", (event) => {
	switch (event.data.type) {
		case ViewEvents.API_TOKEN: {
			Api.updateAuthToken(event.data.Token);
			break;
		}
		case ViewEvents.WIKI: {
			Wiki(event.data.isGroup, event.data.id);
			break;
		}
		case ViewEvents.SNIPPET: {
			Snippet(event.data.isGroup, event.data.id);

			break;
		}
	}
});
async function Snippet(isGroup: boolean, id: number) {
	switch (isGroup) {
		case true: {
			break;
		}

		case false: {
			api.getProjectSnippets(id).then((res) => {
				let author: string = res.data[0].title;
				app!.innerHTML = `<div>${author}<div>`;
			});
			break;
		}
	}
}
async function Wiki(isGroup: boolean, id: number) {
	switch (isGroup) {
		case true: {
			break;
		}

		case false: {
			api.getProjectSnippets(id).then((res) => {
				let author: string = res.data[0].title;
				app!.innerHTML = `<div>${author}<div>`;
			});
			break;
		}
	}
}
