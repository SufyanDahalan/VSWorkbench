// /* module.exports= */export default {
//     getProjectIssueBoards(projectID:string):any{
//         return this.api.get(`projects/${projectID}/boards`)
//     },
//     getProjectIssues(projectID:string):any{
//         return this.api.get(`projects/${projectID}/issues`)
//     },
//     getProjectPipelines(projectID:string):any{
//         return this.api.get(`projects/${projectID}/pipelines`)
//     },
//     getPipeline(projectID:string, pipelineID:string):any{
//         return this.api.get(`projects/${projectID}/pipelines/${pipelineID}`)
//     },
//     createNewProjectIssue(projectID:string):any{
//         return this.api.post(`projects/${projectID}/issues`)
//     },
//     reorderProjectIssue(projectID:string, issueIID:string):any{ // https://docs.gitlab.com/ee/#api/issues.html#reorder-an-issue
//         return this.api.post(`projects/${projectID}/issues/${issueIID}/reorder`) 
//     }
// }