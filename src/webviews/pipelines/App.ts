import { pipelinesQuery } from "../../api/Queries";
import { Api } from "../../api";
import { ViewEvents, CreateHtmlNode } from "../../globals/constants";
// import { CreateHtmlNode } from "../../globals/functions";
import "./App.css";

let api = Api.Instance;
let app = document.getElementById("app");
let selection = 0;
let fullpath = "";

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
			fullpath = event.data.fullpath;
			Route(Routes.PIPELINES);
			break;
		}
		case ViewEvents.PENDING: {
			Route(Routes.PENDING);
			break;
		}
	}
});

function Route(route: Routes) {
	app!.innerHTML = "";
	switch (route) {
		case Routes.PENDING: {
			break;
		}
		case Routes.PIPELINES: {
			api.graphql(pipelinesQuery(fullpath)).then((res) => {
				let pipelines: IPipelineListItem[] = res.data.data.project.pipelines.nodes as IPipelineListItem[];

				console.log("pipelines: ", pipelines);

				// begin creating table
				let table = CreateHtmlNode("table", null, "");
				let rows: Node[] = [];
				rows.push(CreateHtmlNode("tr", null, ""));
				rows[0].appendChild(CreateHtmlNode("th", null, "Status"));
				rows[0].appendChild(CreateHtmlNode("th", null, "Pipeline"));
				rows[0].appendChild(CreateHtmlNode("th", null, "Triggerer"));
				rows[0].appendChild(CreateHtmlNode("th", null, "Stages"));
				rows[0].appendChild(CreateHtmlNode("th", null, "")); // for options
				// end creating table

				for (const pipeline of pipelines) {
					rows.push(CreatePipelineNode(pipeline));
				}
				rows.forEach((row: Node) => {
					table.appendChild(row);
				});
				app!.appendChild(table);
			});
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
	let row = CreateHtmlNode("tr", null, "");

	let statusRow = CreateHtmlNode("th", null, "");
	statusRow.appendChild(
		CreateHtmlNode(
			"button",
			[
				{
					key: "class",
					value: "status-button",
				},
				{
					key: pipeline.status,
					value: true,
				},
            ],
			pipeline.status
		)
	);
	statusRow.appendChild(
		CreateHtmlNode(
			"div",
			[
				{
					//
					key: "class",
					value: "placeholder",
				},
			],
			"&#128337;" + new Date(0, 0, 0, 0, 0, pipeline.duration).toString().substring(16, 24)
		)
	);

	let pipelineRow = CreateHtmlNode("th", null, "");
	pipelineRow.appendChild(CreateHtmlNode("p", null, pipeline.commit.message));
	pipelineRow.appendChild(
		CreateHtmlNode(
			"div",
			[
				{
					key: "onclick",
					value: () => {
						//go to commit or smth
					},
				},
			],
			pipeline.id.split("/").pop() ?? "Error. please report an issue in VSWorkbench GitHub Repository. Thank you"
		)
	);
	pipelineRow.appendChild(
		CreateHtmlNode(
			"div",
			[
				{
					key: "onclick",
					value: () => {
						//go to commit or smth
					},
				},
			],
			pipeline.ref
		)
	);
	pipelineRow.appendChild(
		CreateHtmlNode(
			"div",
			[
				{
					key: "onclick",
					value: () => {
						//go to commit or smth
					},
				},
			],
			pipeline.commit.shortId
		)
	);
	pipelineRow.appendChild(
		CreateHtmlNode(
			"img",
			[
				{
					key: "src",
					value: pipeline.commit.authorGravatar,
				},
				{
					key: "alt",
					value: true,
				},
			],
			""
		)
	);

	let triggererRow = CreateHtmlNode("th", [{ key: "class", value: "triggererRow" }], "");
	triggererRow.appendChild(
		CreateHtmlNode(
			"img",
			[
				{
					key: "src",
					value: pipeline.user.avatarUrl,
				},
				{
					key: "alt",
					value: true,
				},
			],
			""
		)
	);
	triggererRow.appendChild(
		CreateHtmlNode(
			"span",
			[
				{
					key: "class",
					value: "triggerer-tooltip",
				}, // see https://stackoverflow.com/questions/36921421/how-to-add-tooltip-to-image-on-hover-with-css
			],
			pipeline.user.name
		)
	);
	let stagesRow = CreateHtmlNode("th", null, "");
	pipeline.stages.nodes.forEach((stage) => {
		stagesRow.appendChild(
			CreateHtmlNode(
				"div",
				[
					{
						key: stage.status,
						value: "",
					},
					{
						key: "class",
						value: "stage",
					},
				],
				""
			)
		);
		stagesRow.appendChild(CreateHtmlNode("span", [{ key: "class", value: "" }], stage.name + ": " + stage.status));
	});

	let optionsRow = CreateHtmlNode("th", null, "");

	row.appendChild(statusRow); // Status
	row.appendChild(pipelineRow); // Pipeline
	row.appendChild(triggererRow); // Triggerer
	row.appendChild(stagesRow); // Stages
	row.appendChild(optionsRow); // options, i.e. download artifacts
	// let el = CreateHtmlNode("div", null, pipeline.id + pipeline.status);
	// return el;
	return row;
}
