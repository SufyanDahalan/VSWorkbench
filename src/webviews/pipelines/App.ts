import { pipelinesQuery } from "../../api/Queries";
import { Api } from "../../api";
import { ViewEvents, CreateHtmlNode } from "../../globals/constants";
// import { CreateHtmlNode } from "../../globals/functions";
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
		case ViewEvents.API_TOKEN: {
			// Api.updateAuthToken(event.data.Token);
            Api.updateAuthToken(event.data.Token);
            Api.updateBaseURL(event.data.baseURL);
        
			Route(Routes.PENDING);
			break;
		}
		case ViewEvents.PROJECT_SELECTED: {
			selection = event.data.id;
			Route(Routes.PIPELINES);
			break;
		}
        case ViewEvents.PENDING: {
            Route(Routes.PENDING)
            break;
        }
	}
});

async function Route(route: Routes) {
	app!.innerHTML = "";
	switch (route) {
		case Routes.PENDING: {
			break;
		}
		case Routes.PIPELINES: {
            let res = await api.graphql(pipelinesQuery(selection.toString()))
            	let pipelines: IPipelineListItem[] = res.data as IPipelineListItem[];
				for (const pipeline of pipelines) {
					app!.appendChild(CreatePipelineNode(pipeline));
                }
			// api.getProjectPipelines(selection).then((res) => {
			// 	let pipelines: IPipelineListItem[] = res.data as IPipelineListItem[];
			// 	for (const pipeline of pipelines) {
			// 		app!.appendChild(CreatePipelineNode(pipeline));
			// 	}
			// });
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
