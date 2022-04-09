import * as vscode from "vscode";
import api from "../api";

export function getProjectPipelines(node_id: number) {
	return api.getProjectPipelines(node_id);
	// refresh view?
	// https://docs.gitlab.com/ee/api/pipelines.html#list-project-pipelines
}

export function getProjectPipeline() {
	// https://docs.gitlab.com/ee/api/pipelines.html#get-a-single-pipeline
}

export function createProjectPipeline() {
	// https://docs.gitlab.com/ee/api/pipelines.html#create-a-new-pipeline
}
export function retryJobInPipeline() {
	// https://docs.gitlab.com/ee/api/pipelines.html#retry-jobs-in-a-pipeline
}
export function cancelJobInPipeline() {
	// https://docs.gitlab.com/ee/api/pipelines.html#cancel-a-pipelines-jobs
}
export function deletePipeline() {
	// https://docs.gitlab.com/ee/api/pipelines.html#delete-a-pipeline
}

export function getVariablesOfPipeline() {
	// https://docs.gitlab.com/ee/api/pipelines.html#get-variables-of-a-pipeline
}
export function openPipelinesInGitLab() {
	// https://docs.gitlab.com/ee/api/pipelines.html#get-a-single-pipeline
}
export function openPipelineInGitLab() {
	// https://docs.gitlab.com/ee/api/pipelines.html#get-a-single-pipeline
}
export function openJobInGitLab() {
	// https://docs.gitlab.com/ee/api/pipelines.html#get-a-single-pipeline
}
export function viewPipelines() {
	// https://docs.gitlab.com/ee/api/pipelines.html#get-a-single-pipeline
}
export function viewPipeline() {
	// https://docs.gitlab.com/ee/api/pipelines.html#get-a-single-pipeline
}
export function viewJob() {
	// https://docs.gitlab.com/ee/api/pipelines.html#get-a-single-pipeline
}
// https://docs.gitlab.com/ee/api/pipeline_schedules.html#get-all-pipeline-schedules
// https://docs.gitlab.com/ee/api/pipeline_schedules.html#get-a-single-pipeline-schedule
// https://docs.gitlab.com/ee/api/pipeline_schedules.html#create-a-new-pipeline-schedule
// https://docs.gitlab.com/ee/api/pipeline_schedules.html#edit-a-pipeline-schedule
// https://docs.gitlab.com/ee/api/pipeline_schedules.html#take-ownership-of-a-pipeline-schedule takeOwnershipOfPipeline
// https://docs.gitlab.com/ee/api/pipeline_schedules.html#delete-a-pipeline-schedule
// https://docs.gitlab.com/ee/api/pipeline_schedules.html#run-a-scheduled-pipeline-immediately
// https://docs.gitlab.com/ee/api/pipeline_schedules.html#pipeline-schedule-variables
// https://docs.gitlab.com/ee/api/pipeline_schedules.html#edit-a-pipeline-schedule-variable
// https://docs.gitlab.com/ee/api/pipeline_schedules.html#delete-a-pipeline-schedule-variable
// https://docs.gitlab.com/ee/api/pipeline_triggers.html#list-project-triggers
// https://docs.gitlab.com/ee/api/pipeline_triggers.html#get-trigger-details
// https://docs.gitlab.com/ee/api/pipeline_triggers.html#create-a-project-trigger
// https://docs.gitlab.com/ee/api/pipeline_triggers.html#update-a-project-trigger
// https://docs.gitlab.com/ee/api/pipeline_triggers.html#remove-a-project-trigger
// https://docs.gitlab.com/ee/api/jobs.html#list-project-jobs // prob not needed, will get pipeline jobs only instead
// https://docs.gitlab.com/ee/api/jobs.html#list-pipeline-jobs
// https://docs.gitlab.com/ee/api/jobs.html#list-pipeline-bridges
// https://docs.gitlab.com/ee/api/jobs.html#get-job-tokens-job
// https://docs.gitlab.com/ee/api/jobs.html#get-gitlab-agent-by-ci_job_token
// https://docs.gitlab.com/ee/api/jobs.html#get-a-single-job
// https://docs.gitlab.com/ee/api/jobs.html#get-a-log-file
// https://docs.gitlab.com/ee/api/jobs.html#cancel-a-job
// https://docs.gitlab.com/ee/api/jobs.html#retry-a-job
// https://docs.gitlab.com/ee/api/jobs.html#erase-a-job
// https://docs.gitlab.com/ee/api/jobs.html#run-a-job

export default {
	getProjectPipelines,
	getProjectPipeline,
	createProjectPipeline,
	retryJobInPipeline,
	cancelJobInPipeline,
	deletePipeline,
	getVariablesOfPipeline,
	openPipelinesInGitLab,
	openPipelineInGitLab,
	openJobInGitLab,
	viewPipelines,
	viewPipeline,
	viewJob,
};
