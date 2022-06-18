import { pipelinesQuery } from "../../api/Queries";
import { Api } from "../../api";
import { ViewEvents, CreateHtmlNode, loadingSpinner } from "../../globals/constants";
import "./App.css";

import Convert from "ansi-to-html";

const convert = new Convert({ newline: true, escapeXML: true });

let api = Api.Instance;
let app = document.getElementById("app")!;
let selection = 0;
let fullpath = "";

enum Routes {
	PENDING = 0,
	PIPELINES,
	PIPELINE,
	JOB,
}
interface RouteArguments {
	project_id: number;
	item_id: number;
}

window.addEventListener("message", (event) => {
	switch (event.data.type) {
		case ViewEvents.API_TOKEN: {
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
		case ViewEvents.JOB_SELECTED: {
			Route(Routes.JOB);
			break;
		}
		default: {
			Route(Routes.PENDING);
			break;
		}
	}
});

function Route(route: Routes, args?: RouteArguments) {
	app.innerHTML = "";
	app.append(loadingSpinner());
	switch (route) {
		case Routes.PENDING: {
			app.innerHTML = "";
			app.appendChild(
				CreateHtmlNode(
					"p",
					[{ key: "class", value: "pending" }],
					"Please choose a project from the groups view in order to load the chosen project's pipelines"
				)
			);

			break;
		}
		case Routes.PIPELINES: {
			api.graphql(pipelinesQuery(fullpath)).then((res) => {
				let pipelines: IPipelineListItem[] = res.data.data.project.pipelines.nodes as IPipelineListItem[];

				if (pipelines.length > 0) {
					let table = CreateHtmlNode("table", null, "");
					let tableHeader = CreateHtmlNode("tr", null, "");
					tableHeader.appendChild(CreateHtmlNode("th", null, "Status"));
					tableHeader.appendChild(CreateHtmlNode("th", null, "Pipeline"));
					tableHeader.appendChild(CreateHtmlNode("th", null, "Triggerer"));
					tableHeader.appendChild(CreateHtmlNode("th", null, "Stages"));
					tableHeader.appendChild(CreateHtmlNode("th", null, "")); // for options

					table.appendChild(tableHeader);
					pipelines.forEach((pipeline) => table.appendChild(CreatePipelineNode(pipeline)));
					app.innerHTML = "";
					app.appendChild(table);
				} else {
					app.innerHTML = "";
					app.appendChild(CreateHtmlNode("p", null, "no pipelines to view :(")); // TODO
				}
			});
			break;
		}
		case Routes.JOB: {
			api.getJobLogs(selection, args!.item_id).then((res) => {
				let logs = convert.toHtml(res.data).split("<br/>");
				let logLines: Node[] = [];
				let child = false;
				for (let i = 0; i < logs.length; i++) {
					if (logs[i].startsWith("section_start")) {
						child = true, i++;
						logLines.push(CreateHtmlNode("div", [{ key: "class", value: "hidden" }], ""));
						logLines[logLines.length - 1].appendChild(
							CreateHtmlNode(
								"p",
								[
									{ key: "class", value: "header" },
									{
										key: "onclick",
										value: () => {
											let parent = document.getElementById(logs[i].split(":")[1])!.parentElement!;
											parent.classList.contains("hidden") ? parent.classList.remove("hidden") : parent.classList.add("hidden");
										},
									},
									{ key: "id", value: logs[i].split(":")[1] },
								],
								logs[i]
							)
						);
					} else if (logs[i].startsWith("section_end")) {
                        child = false, i++;
					} else if (!child) {
						logLines.push(CreateHtmlNode("p", null, logs[i]));
					} else if (child) {
						logLines[logLines.length - 1].appendChild(CreateHtmlNode("p", [{ key: "class", value: "hidable" }], logs[i]));
					}
				}

				app.innerHTML = "";
                let logsDiv = CreateHtmlNode("div", [{ key: "style", value: "white-space: pre-wrap;" }, { key: "class", value: "logs" }], '')
                logLines.forEach((line) => logsDiv.appendChild(line))
				app.appendChild(logsDiv);
				console.log(convert.toHtml(res.data));
			});
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
	if (pipeline.duration) {
		statusRow.appendChild(
			CreateHtmlNode(
				"div",
				[
					{
						key: "class",
						value: "placeholder",
					},
				],
				Icons.STOPWATCH + " " + new Date(0, 0, 0, 0, 0, pipeline.duration).toString().substring(16, 24)
			)
		);
	}

	let pipelineRow = CreateHtmlNode("td", null, "");
	// begin row 1
	let div = CreateHtmlNode("div", null, "");
	div.appendChild(CreateHtmlNode("a", [{ key: "href", value: pipeline.commit.webUrl }], pipeline.commit.title));
	pipelineRow.appendChild(div);
	// end row 1
	// begin row 2
	div = CreateHtmlNode("div", null, "");

	// pipelineRow.appendChild(
	div.appendChild(
		CreateHtmlNode(
			"a",
			[
				{
					key: "href",
					value: checkUrl(pipeline.path, pipeline.commit.webUrl),
				},
			],
			gidToId(pipeline.id)
		)
	);
	// pipelineRow.appendChild(
	div.appendChild(
		CreateHtmlNode(
			"a",
			[
				{
					key: "href",
					value: checkUrl(pipeline.ref, pipeline.commit.webUrl),
				},
			],
			pipeline.ref
		)
	);

	let a = CreateHtmlNode(
		"a",
		[
			{
				key: "href",
				value: `${pipeline.commit.author ? pipeline.commit.author.webUrl : "mailto:" + pipeline.commit.authorEmail}`,
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
					value: pipeline.commit.author
						? checkUrl(pipeline.commit.author.avatarUrl, pipeline.commit.webUrl)
						: checkUrl(pipeline.commit.authorGravatar, pipeline.commit.webUrl),
				},
				{
					key: "alt",
					value: "Author Avatar",
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

	// pipelineRow.appendChild(a);
	div.appendChild(
		CreateHtmlNode(
			"a",
			[
				{
					key: "href",
					value: pipeline.commit.webUrl,
				},
			],
			pipeline.commit.shortId
		)
	);
	div.appendChild(a);
	pipelineRow.appendChild(div);
	// end row 2

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
	);
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
					value: "Triggerer Avatar",
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
	);
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
	pipeline.jobs.nodes.forEach((job) => {
		stagesRow.appendChild(
			CreateHtmlNode(
				"div",
				[
					{
						key: job.status,
						value: "",
					},
					{
						key: "class",
						value: "stage",
					},
					{
						key: "title",
						value: job.name + ": " + job.detailedStatus.text,
					},
					{
						key: "onclick",
						value: () => Route(Routes.JOB, { project_id: +gidToId(pipeline.id), item_id: +gidToId(job.id) }),
					},
				],
				job.status === "SUCCESS" ? Icons.CHECK : Icons.X
			)
		);
	});

	let optionsRow = CreateHtmlNode("td", null, "");

	row.appendChild(statusRow); // Status
	row.appendChild(pipelineRow); // Pipeline
	row.appendChild(triggererRow); // Triggerer
	row.appendChild(stagesRow); // Stages
	row.appendChild(optionsRow); // options, i.e. download artifacts
	return row;
}

function checkUrl(url: string, someFullUrl: string): string {
	let domain = someFullUrl.split("/").slice(0, 3).toString().replaceAll(",", "/");
	if (url.startsWith("https://")) {
		return url;
	} else {
		return domain + url;
	}
}

function gidToId(id: string): string {
	return id.split("/").pop() ?? "Error. please report an issue in VSWorkbench GitHub Repository. Thank you";
}
