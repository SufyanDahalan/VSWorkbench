export const AUTH_TOKEN_KEY = "GITLABCODE_PEROSONAL_AUTH_TOKEN";
export const GITLAB_INSTANCE_KEY = "GITLABCODE_GITLAB_INSTANCE_KEY";
export const UPDATE_FOCUSED_TV_ITEM = 'UPDATE_FOCUSED_TV_ITEM'
export const GitLab_SaaS_Base_URL = "https://gitlab.com/api/";

export const enum VALIDATION_RULES {
	GitlabGroupName = 0,
	GitlabGroupPath,
	NotEmptyOrNull,
}
export enum ViewEvents {
    GROUP_SELECTED = 0,
    PROJECT_SELECTED,
    PIPELINE_SELECTED,
    JOB_SELECTED,
    API_TOKEN,
    WIKI,
    SNIPPET,
    PENDING
}
export function CreateHtmlNode(type: string, attributes: { key: string; value: string | Function | boolean }[] | null, innerHTML: string): Node {
	const el = document.createElement(type);
	el.innerHTML = innerHTML;
	if (attributes) {
		for (const attribute of attributes) {
			const key = attribute.key as string;
			const value = attribute.value;
			if (key.startsWith("on") && typeof value === "function") {
				el.addEventListener(key.substring(2) as keyof HTMLElementEventMap, value as EventListenerOrEventListenerObject);
			} else if (typeof value === "boolean") {
				el.setAttribute(key, "");
			} else if (typeof value !== "function") {
				el.setAttribute(key, value);
			} else {
				console.log("Error! Element attribute cannot be set");
			}
		}
	}
	return el;
}
