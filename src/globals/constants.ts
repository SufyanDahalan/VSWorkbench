export const AUTH_TOKEN_KEY = "GITLABCODE_PEROSONAL_AUTH_TOKEN";
export const GITLAB_INSTANCE_KEY = "GITLABCODE_GITLAB_INSTANCE_KEY";
export const UPDATE_FOCUSED_TV_ITEM = "UPDATE_FOCUSED_TV_ITEM";
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
	PENDING,
}
/**
 * HTML icons used to save on package size
 */
export enum Icons {
	/**
	 * Resembles a check mark.
	 *
	 * Official Name: 'CHECK MARK'
	 *
	 * https://www.fileformat.info/info/unicode/char/2713/index.htm
	 */
	CHECK = "&#10003;",
	/**
	 * Resembles a multiplication x
	 *
	 * Official name: 'MULTIPLICATION X'
	 * https://www.fileformat.info/info/unicode/char/2715/index.htm
	 */
	X = "&#10005;",
	/**
	 * Resembles a stopwatch icon.
	 *
	 * Official name: 'STOPWATCH'
	 *
	 * https://www.fileformat.info/info/unicode/char/23f1/index.htm
	 */
	STOPWATCH = "&#9201;",
	/**
	 * Resembles a trash icon.
	 * Official name : 'WASTEBASKET'
	 * https://www.fileformat.info/info/unicode/char/1f5d1/index.htm
	 */
	TRASH = "&#x1f5d1;",
	/**
	 * Resembles a return icon.
	 *
	 * Official name: 'LEFTWARDS ARROW WITH HOOK'
	 *
	 * https://www.fileformat.info/info/unicode/char/21a9/index.htm
	 */
	RETURN = "&#x21A9;",

	/**
	 * Resembles a delete icon.
	 *
	 * Official name: 'ERASE TO THE LEFT'
	 *
	 * https://www.fileformat.info/info/unicode/char/232b/index.htm
	 */
	LEFT_ERASE = "&#9003;",
	/**
	 * Resembles a refresh icon.
	 *
	 * Official name: 'CLOCKWISE GAPPED CIRCLE ARROW'
	 *
	 * https://www.fileformat.info/info/unicode/char/27f3/index.htm
	 */
	REFRESH = "&#10227",
	/**
	 * Resembles a mug icon.
	 *
	 * Official name: 'HOT BEVERAGE'
	 *
	 * https://www.fileformat.info/info/unicode/char/2615/index.htm
	 */
	COFFEE_MUG = "&#9749;",
	/**
	 * Resembles an arrow pointing right.
	 *
	 * Official name: 'MODIFIER LETTER RIGHT ARROWHEAD'
	 *
	 * https://www.fileformat.info/info/unicode/char/02c3/index.htm
	 */
	ARROW_RIGHT = "&#707;",
	/**
	 * Resembles an arrow pointing down.
	 *
	 * Official name: 'MODIFIER LETTER DOWN ARROWHEAD'
	 *
	 * https://www.fileformat.info/info/unicode/char/02c5/index.htm
	 */
	ARROW_DOWN = "&#709;",
}
interface HtmlNodeArgs {
	type: string;
	attributes?: { key: string; value: string | Function | boolean | HtmlNodeArgs }[] | null;
	innerHTML?: string;
}
export function CreateHtmlNode(args: HtmlNodeArgs): Node {
	const el = document.createElement(args.type);
    if(args.innerHTML){
        el.innerHTML = args.innerHTML;
    }
	if (args.attributes) {
		for (const attribute of args.attributes) {
			const key = attribute.key as string;
			const value = attribute.value;
			if (key === "child") {
                el.appendChild(CreateHtmlNode(value as HtmlNodeArgs))
			} else if (key.startsWith("on") && typeof value === "function") {
				el.addEventListener(key.substring(2) as keyof HTMLElementEventMap, value as EventListenerOrEventListenerObject);
			} else if (typeof value === "boolean") {
				el.setAttribute(key, "");
			} else if (typeof value === "string") {
				el.setAttribute(key, value);
			} else {
				console.log("Error! Element attribute cannot be set");
			}
		}
	}
	return el;
}

export function loadingSpinner() {
	return CreateHtmlNode({type: "div",attributes: [{ key: "class", value: "lds-dual-ring" }], innerHTML: ""});
}

export function html(str: string): HTMLElement{
    let parser = new DOMParser()
    let body = parser.parseFromString(str, 'text/html').body;
    addAttributes(body)
    return body
}

function addAttributes(body: HTMLElement): HTMLElement {
    let children = body.children;
    // children.forEach((child) => {
    //     child.ATTRIBUTE_NODE
    // })
    // children
    for(var i = 0; i <  children.length; i++){
        if(children.item(i)!.hasAttribute('onclick')){
            let attribute = children.item(i)!.attributes.getNamedItem('onclick')
            // // console.log(children.item(i)!.attributes)
            // console.log(attribute?.name)
            // console.log(attribute?.value)
            console.log(attribute)
            console.log(Function(attribute!.value))
            // children.item(i)!.removeAttribute('onclick')
            // children.item(i)!.addEventListener('click' as keyof HTMLElementEventMap, Function(attribute!.value) as  EventListenerOrEventListenerObject)
            
        }
    }
    return body
}