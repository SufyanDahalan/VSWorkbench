import { pipelinesQuery } from "../../api/Queries";
import { Api } from "../../api";
import { ViewEvents, CreateHtmlNode } from "../../globals/constants";
// import { CreateHtmlNode } from "../../globals/functions";
import "./App.css";

let api = Api.Instance;
let app = document.getElementById("app")!;
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

	let statusRow = CreateHtmlNode("td", null, "");
	statusRow.appendChild(
		CreateHtmlNode(
			"button",
			[
				{
					key: "class",
					value: "status-button",
				},
				{
					key: pipeline.detailedStatus.text,
					value: true,
				},
			],
			pipeline.detailedStatus.text
		)
	);
	statusRow.appendChild(
		CreateHtmlNode(
			"div",
			[
				{
					key: "class",
					value: "placeholder",
				},
			],
			"&#9201;" + new Date(0, 0, 0, 0, 0, pipeline.duration).toString().substring(16, 24)
		)
	);

	let pipelineRow = CreateHtmlNode("td", null, "");
	pipelineRow.appendChild(CreateHtmlNode("p", null, pipeline.commit.title));
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
	let a = CreateHtmlNode(
		"a",
		[
			{
				key: "href",
				value: `${pipeline.commit.author ?  pipeline.commit.author.webUrl : "mailto:" + pipeline.commit.authorEmail}`,
			},
		],
		""
	);
	a.appendChild(
		CreateHtmlNode(
			"img",
			[
				{
					key: "title",
					value: pipeline.commit.authorName,
				},
				{
					key: "src",
					value: pipeline.commit.author ? checkUrl(pipeline.commit.author.avatarUrl, pipeline.commit.author.webUrl) : checkUrl(pipeline.commit.authorGravatar, pipeline.commit.webUrl),
				},
                {
					key: "alt",
					value: 'Author Avatar',
				},
				{
					key: "style",
					value: `width: 16px; height: 16px;`,
				},
				{
					key: "class",
					value: "avatar",
				},
			],
			""
		)
	);

	pipelineRow.appendChild(a);

	let triggererRow = CreateHtmlNode("td", [{ key: "class", value: "triggererRow" }], "");
    a = CreateHtmlNode(
        "a",
        [
            {
                key: "href",
                value: `${pipeline.user.webUrl}`,
            },
        ],
        ""
    ) 
    a.appendChild(
        CreateHtmlNode(
			"img",
			[
				{
					key: "title",
					value: pipeline.user.name,
				},
				{
					key: "src",
					value: checkUrl(pipeline.user.avatarUrl, pipeline.commit.webUrl),
				},
                {
					key: "alt",
					value: 'Triggerer Avatar',
				},
				{
					key: "style",
					value: `width: 32px; height: 32px;`,
				},
				{
					key: "class",
					value: "avatar",
				},
			],
			""
		)
    )
	triggererRow.appendChild(a);
	let stagesRow = CreateHtmlNode(
		"td",
		[
			{
				key: "class",
				value: "stages",
			},
		],
		""
	);
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
					{
						key: "title",
						value: stage.name + ": " + stage.detailedStatus.text,
					},
				],
				stage.status === "success" ? "&#10003;" : "&#10005;"
			)
		);
	});

	let optionsRow = CreateHtmlNode("td", null, "");

	row.appendChild(statusRow); // Status
	row.appendChild(pipelineRow); // Pipeline
	row.appendChild(triggererRow); // Triggerer
	row.appendChild(stagesRow); // Stages
	row.appendChild(optionsRow); // options, i.e. download artifacts
	// let el = CreateHtmlNode("div", null, pipeline.id + pipeline.status);
	// return el;
	return row;
}
function checkUrl(url: string, someFullUrl: string): string{
    let domain = someFullUrl.split('/').slice(0, 3).toString().replaceAll(',', '/')
    if(url.startsWith('https://'))
        return url;
    else {
        return domain + url
    }
}