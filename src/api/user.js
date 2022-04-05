module.exports = {
    getStarredProjects(userID){
        return this.api.get(`users/${userID}/starred_projects`)//
    },
    getUserInfo(){
        return this.api.get(`user/`)
    }
}