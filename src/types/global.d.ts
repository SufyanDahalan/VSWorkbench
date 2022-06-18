export {};

declare global {
	interface IIssue {
		id: number;
		iid: number;
		title: string;
		state: string;
		updated_at: string;
		created_at: string;
		// labels: string[];
		references: {
			full: string;
			relative: string;
			short: string;
		};
		due_date?: string;
		author: { username: string; name: string; id: string; avatarUrl: string };
		assignee?: { username: string; name: string; id: string; avatarUrl: string };
		project_id: number;
		user_notes_count: number;
		labels?: {
			color: string;
			title: string;
		}[];
		description: string;
	}
	interface ILabel {
		color: string;
		title: string;
	}
	interface IComment {
		issue_id: number;
		issue_iid: number;
		project_id: number;
		id: number;
		body: string;
		author: { username: string; name: string; id: string; avatarUrl: string };
	}

	interface ICommit {
		id: number;
		short_id: number;
		title: string;
		author_name: string;
		author_email: string;
		authored_date: string;
		message: string;
		web_url: string;
		parent_ids: string[];
	}

	interface IPipelineListItem {
		detailedStatus: { text: string };
		source: string; //can prob be made into an enum, TODO
		id: string;
		iid: number;
		project_id: number;
		path: string;
		duration: number;
		ref: string;
		/**
		 * commit message of triggering commit
		 * should be fetched over commit api
		 */
		commit: {
			author: {
				name: string;
				avatarUrl: string;
				webUrl: string;
			};
			webUrl: string;
			title: string;
			id: string;
			shortId: string;
			authorGravatar: string;
			authorName: string;
			authorEmail: string;
		};
		user: {
			avatarUrl: string;
			id: string;
			name: string;
			webUrl: string;
		};
		jobs: {
			nodes: {
				id: string;
				status: string;
				name: string;
				tags: string[];
				artifacts: {
					nodes: {
						downloadPath: string;
						name: string;
						fileType: string;
					}[];
				};
				detailedStatus: { text: string };
			}[];
		};
	}
	interface SnippetObject {
		title: string;
		description?: string;
		visibility?: enum;
		files: {
			file_path: string;
			content: string;
		}[];
	}
	interface GroupNodeOptions {
		node_id: number;
		parent_id: number;
		visibility: string;
		url: URL;
		contextValue: string;
		collapsible: vscode.TreeItemCollapsibleState;
		label: string;
		archived?: string;
		path_with_namespace?: string;
	}
    /**
     * HTML icons used to save on package size
     */
	enum Icons {
		/**
		 * Resembles a check mark.
		 * Official Name: 'CHECK MARK'
		 * https://www.fileformat.info/info/unicode/char/2713/index.htm
		 */
		CHECK = "&#10003;",
		/**
		 * Resembles a multiplication x
		 * Official name: 'MULTIPLICATION X'
		 * https://www.fileformat.info/info/unicode/char/2715/index.htm
		 */
		X = "&#10005;",
		/**
		 * Resembles a stopwatch icon.
		 * Official name: 'STOPWATCH'
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
		 * Official name: 'LEFTWARDS ARROW WITH HOOK'
		 * https://www.fileformat.info/info/unicode/char/21a9/index.htm
		 */
		RETURN = "&#x21A9;",

		/**
		 * Resembles a delete icon.
		 * Official name: 'ERASE TO THE LEFT'
		 * https://www.fileformat.info/info/unicode/char/232b/index.htm
		 */
		LEFT_ERASE = "&#9003;",
		/**
		 * Resembles a refresh icon.
		 * Official name: 'CLOCKWISE GAPPED CIRCLE ARROW'
		 * https://www.fileformat.info/info/unicode/char/27f3/index.htm
		 */
		REFRESH = "&#10227",
		/**
		 * Resembles a mug icon.
		 * Official name: 'HOT BEVERAGE'
		 * https://www.fileformat.info/info/unicode/char/2615/index.htm
		 */
		COFFEE_MUG = "&#9749;",
		/**
		 * Resembles an arrow pointing right.
		 * Official name: 'MODIFIER LETTER RIGHT ARROWHEAD'
		 * https://www.fileformat.info/info/unicode/char/02c3/index.htm
		 */
		ARROW_RIGHT = '&#707;',
		/**
		 * Resembles an arrow pointing down.
		 * Official name: 'MODIFIER LETTER DOWN ARROWHEAD'
		 * https://www.fileformat.info/info/unicode/char/02c5/index.htm
		 */
		ARROW_DOWN = '&#709;',
	}
}
