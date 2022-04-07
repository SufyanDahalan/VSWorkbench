module.exports = {
    getGroupIssues(){
        return this.api.get('issues')
    },
    createGroupProject(projectName, groupID){
        return this.api.post(`projects?name=${projectName}&namespace_id=${groupID}`)
        // well, its basically a createPersonalProject but with the namespace_id specified
    },

    async getGroupById(id){
        return await this.api.get(`groups/${id}`)
    }
}