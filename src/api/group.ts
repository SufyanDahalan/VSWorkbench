// module.exports = {
//     getGroupIssues(){
//         return this.api.get('issues')
//     },
//     createGroupProject(projectName:string, groupID:string){
//         return this.api.post(`projects?name=${projectName}&namespace_id=${groupID}`)
//         // well, its basically a createPersonalProject but with the namespace_id specified
//     },

//     async getGroupById(id:string){
//         return await this.api.get(`groups/${id}`)
//     }
// }