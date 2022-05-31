// https://docs.gitlab.com/ee/api/wikis.html
import { Api } from "../api";
const api = Api.Instance;


export async function  createNewProjectIssueCommand(project_id: number, issue_iid: number, newComment: string){
    return api.createNewProjectIssueComment(project_id, issue_iid, newComment);
}
export default {
    createNewProjectIssueCommand
}