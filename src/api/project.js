module.exports = {
    getProjectIssues(){},
    getProjectPipelines(projectID){
        return this.api.get(`projects/${projectID}/pipelines`)
    },
    getPipeline(projectID, PipelineID){
        return this.api.get(`projects/${projectID}/pipelines/${PipelineID}`)
    }
}