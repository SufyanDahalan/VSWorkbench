import { pipelinesQuery } from "../../api/Queries";
import { Api } from "../../api";
import { Icons, ViewEvents, CreateHtmlNode, loadingSpinner, html } from "../../globals/constants";
import Convert from "ansi-to-html";
import "./App.css";

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

function someFunc(i: number) {
	console.log(1);
	console.log(i);
}
function Route(route: Routes, args?: RouteArguments) {
	app.innerHTML = "";
	app.append(loadingSpinner());
	switch (route) {
		case Routes.PENDING: {
			app.innerHTML = "";
			app.append(
				html(
					`
                <p onclick="(s)(5)" class="pending">  
                Please choose a project from the groups view in order to load the chosen project's pipelines
                </p>
                <script>let s = ${someFunc}</script>
                `
				)
			);

			break;
		}
		case Routes.PIPELINES: {
			api.graphql(pipelinesQuery(fullpath)).then((res) => {
				let pipelines: IPipelineListItem[] = res.data.data.project.pipelines.nodes as IPipelineListItem[];

				if (pipelines.length > 0) {
					let table = CreateHtmlNode({ type: "table" });
					let tableHeader = CreateHtmlNode({ type: "tr" });
					tableHeader.appendChild(CreateHtmlNode({ type: "th", innerHTML: "Status" }));
					tableHeader.appendChild(CreateHtmlNode({ type: "th", innerHTML: "Pipeline" }));
					tableHeader.appendChild(CreateHtmlNode({ type: "th", innerHTML: "Triggerer" }));
					tableHeader.appendChild(CreateHtmlNode({ type: "th", innerHTML: "Stages" }));
					tableHeader.appendChild(CreateHtmlNode({ type: "th" })); // for options

					table.appendChild(tableHeader);
					pipelines.forEach((pipeline) => table.appendChild(CreatePipelineNode(pipeline)));
					app.innerHTML = "";
					app.appendChild(table);
				} else {
					app.innerHTML = "";
					app.appendChild(CreateHtmlNode({ type: "p", innerHTML: "no pipelines to view :(" })); // TODO
				}
			});
			break;
		}
		case Routes.JOB: {
			api.getJob(selection, args!.item_id).then((job) => {
				api.getJobLogs(selection, args!.item_id).then((res) => {
					let logs = convert.toHtml(res.data).split("<br/>");
					let logLines: Node[] = [];
					let child = false;
					for (let i = 0; i < logs.length; i++) {
						if (logs[i].startsWith("section_start")) {
							(child = true), i++;
							logLines.push(CreateHtmlNode({ type: "div", attributes: [{ key: "class", value: "hidden" }] }));
							logLines[logLines.length - 1].appendChild(
								CreateHtmlNode({
									type: "p",
									attributes: [
										{ key: "class", value: "header" },
										{
											key: "onclick",
											value: () => {
												let parent = document.getElementById(logs[i].split(":")[1])!.parentElement!;
												parent.classList.contains("hidden")
													? parent.classList.remove("hidden")
													: parent.classList.add("hidden");
											},
										},
										{ key: "id", value: logs[i].split(":")[1] },
									],
									innerHTML: logs[i],
								})
							);
						} else if (logs[i].startsWith("section_end")) {
							(child = false), i++;
						} else if (!child) {
							logLines.push(CreateHtmlNode({ type: "p", innerHTML: logs[i] }));
						} else if (child) {
							logLines[logLines.length - 1].appendChild(
								CreateHtmlNode({ type: "p", attributes: [{ key: "class", value: "hidable" }], innerHTML: logs[i] })
							);
						}
					}

					app.innerHTML = "";
					let logsDiv = CreateHtmlNode({
						type: "div",
						attributes: [
							{ key: "style", value: "white-space: pre-wrap;" },
							{ key: "class", value: "logs" },
						],
					});
					logLines.forEach((line) => logsDiv.appendChild(line));
					let jobDiv = CreateHtmlNode({ type: "div", attributes: [{ key: "class", value: "jobDiv" }] });
					jobDiv.appendChild(logsDiv);

					// begin left sidebar
					let sideBarDiv = CreateHtmlNode({ type: "div", attributes: [{ key: "class", value: "jobSideBar" }] });
					let div = CreateHtmlNode({ type: "div" });
					div.appendChild(CreateHtmlNode({ type: "p", innerHTML: job.data.name }));
					div.appendChild(
						CreateHtmlNode({
							type: "button",
							attributes: [
								{
									key: "onclick",
									value: () => {
										api.deleteJobArtifacts(selection, args!.item_id);
									},
								},
							],
							innerHTML: Icons.TRASH,
						})
					);
					div.appendChild(
						CreateHtmlNode({
							type: "button",
							attributes: [
								{
									key: "onclick",
									value: () => {
										api.retryJob(selection, args!.item_id);
									},
								},
							],
							innerHTML: Icons.REFRESH,
						})
					);
					div.appendChild(
						CreateHtmlNode({
							type: "p",
							innerHTML: "Duration: " + new Date(0, 0, 0, 0, 0, job.data.duration).toString().substring(16, 24),
						})
					);
					div.appendChild(CreateHtmlNode({ type: "p", innerHTML: "Runner: #" + job.data.runner.id + " " + job.data.runner.description }));
					div.appendChild(CreateHtmlNode({ type: "p", innerHTML: "Tags: " + job.data.runner.tag.join(" ") }));
					// ----
					let temp = CreateHtmlNode({ type: "div" });
					temp.appendChild(CreateHtmlNode({ type: "p", innerHTML: "Commit" }));
					temp.appendChild(
						CreateHtmlNode({
							type: "a",
							attributes: [{ key: "href", value: job.data.commit.web_url }],
							innerHTML: job.data.commit.short_id,
						})
					);
					temp.appendChild(CreateHtmlNode({ type: "span", innerHTML: job.data.commit.message }));
					div.appendChild(temp);
					sideBarDiv.appendChild(div);
					sideBarDiv.appendChild(CreateHtmlNode({ type: "span", innerHTML: "Pipeline" }));
					sideBarDiv.appendChild(
						CreateHtmlNode({ type: "span", innerHTML: " #" + job.data.pipeline.id + " for " + job.data.pipeline.ref })
					);

					// end left sidebar
					app.appendChild(jobDiv);
					console.log(convert.toHtml(res.data));
				});
			});

			break;
		}
	}
}
// https://graphemica.com/%E2%9F%B3
function CreatePipelineNode(pipeline: IPipelineListItem): Node {
	let row = CreateHtmlNode({ type: "tr" });

	let statusRow = CreateHtmlNode({ type: "td" });
	statusRow.appendChild(
		CreateHtmlNode({
			type: "button",
			attributes: [
				{
					key: "class",
					value: "status-button",
				},
				{
					key: pipeline.detailedStatus.text,
					value: true,
				},
			],
			innerHTML: pipeline.detailedStatus.text,
		})
	);
	if (pipeline.duration) {
		statusRow.appendChild(
			CreateHtmlNode({
				type: "div",
				attributes: [
					{
						key: "class",
						value: "placeholder",
					},
				],
				innerHTML: Icons.STOPWATCH + " " + new Date(0, 0, 0, 0, 0, pipeline.duration).toString().substring(16, 24),
			})
		);
	}

	let pipelineRow = CreateHtmlNode({ type: "td" });
	// begin row 1
	let div = CreateHtmlNode({ type: "div" });
	div.appendChild(CreateHtmlNode({ type: "a", attributes: [{ key: "href", value: pipeline.commit.webUrl }], innerHTML: pipeline.commit.title }));
	pipelineRow.appendChild(div);
	// end row 1
	// begin row 2
	div = CreateHtmlNode({ type: "div" });

	// pipelineRow.appendChild(
	div.appendChild(
		CreateHtmlNode({
			type: "a",
			attributes: [
				{
					key: "href",
					value: checkUrl(pipeline.path, pipeline.commit.webUrl),
				},
			],
			innerHTML: gidToId(pipeline.id),
		})
	);
	// pipelineRow.appendChild(
	div.appendChild(
		CreateHtmlNode({
			type: "a",
			attributes: [
				{
					key: "href",
					value: checkUrl(pipeline.ref, pipeline.commit.webUrl),
				},
			],
			innerHTML: pipeline.ref,
		})
	);

	let a = CreateHtmlNode({
		type: "a",
		attributes: [
			{
				key: "href",
				value: `${pipeline.commit.author ? pipeline.commit.author.webUrl : "mailto:" + pipeline.commit.authorEmail}`,
			},
		],
		innerHTML: "",
	});
	a.appendChild(
		CreateHtmlNode({
			type: "img",
			attributes: [
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
			innerHTML: "",
		})
	);

	// pipelineRow.appendChild(a);
	div.appendChild(
		CreateHtmlNode({
			type: "a",
			attributes: [
				{
					key: "href",
					value: pipeline.commit.webUrl,
				},
			],
			innerHTML: pipeline.commit.shortId,
		})
	);
	div.appendChild(a);
	pipelineRow.appendChild(div);
	// end row 2

	let triggererRow = CreateHtmlNode({ type: "td", attributes: [{ key: "class", value: "triggererRow" }] });
	a = CreateHtmlNode({
		type: "a",
		attributes: [
			{
				key: "href",
				value: `${pipeline.user.webUrl}`,
			},
		],
	});
	a.appendChild(
		CreateHtmlNode({
			type: "img",
			attributes: [
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
		})
	);
	triggererRow.appendChild(a);
	let stagesRow = CreateHtmlNode({
		type: "td",
		attributes: [
			{
				key: "class",
				value: "stages",
			},
		],
	});
	pipeline.jobs.nodes.forEach((job) => {
		stagesRow.appendChild(
			CreateHtmlNode({
				type: "div",
				attributes: [
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
				innerHTML: job.status === "SUCCESS" ? Icons.CHECK : Icons.X,
			})
		);
	});

	let optionsRow = CreateHtmlNode({ type: "td" });

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
