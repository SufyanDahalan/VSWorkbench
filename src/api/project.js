module.exports= {
    getProjectIssueBoards(projectID){
        return this.api.get(`projects/${projectID}/boards`)
    },
    getProjectIssues(projectID){
        return this.api.get(`projects/${projectID}/issues`)
    },
    getProjectPipelines(projectID){
        return this.api.get(`projects/${projectID}/pipelines`)
    },
    getPipeline(projectID, pipelineID){
        return this.api.get(`projects/${projectID}/pipelines/${pipelineID}`)
    },
    createNewProjectIssue(projectID){
        return this.api.post(`projects/${projectID}/issues`)
    },
    reorderProjectIssue(projectID, issueIID){ // https://docs.gitlab.com/ee/#api/issues.html#reorder-an-issue
        return this.api.post(`projects/${projectID}/issues/${issueIID}/reorder`) 
    }
}