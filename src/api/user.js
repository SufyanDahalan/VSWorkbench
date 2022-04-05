
module.exports= {
     getStarredProjects: (userID)=>{
        return this.api.get(`users/${userID}/starred_projects`)//
    },
    getUserInfo(){
        return this.api.get(`user/`)
    },
    createPersonalProject(projectName){
        // TODO: allow for the user to set more information, and based on that add that informtion to the request. 
        // should be done in the tree view instead of a simple input
        return this.api.post(`projects?name=${projectName}`)
    },
    deletePersonalProject(projectID){
        return this.api.delete(`projects/${projectID}`)
    },
    getUserProjects(userID){
        return this.api.get(`users/${userID}/projects`)
    },
    async getUserGroups(){
        return await this.api.get(`groups?all_available&pagination=keyset&per_page=50&order_by=name&sort=asc`)
    },

}