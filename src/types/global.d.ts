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
		web_url: URL;
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
		stages: {
			nodes: {
				id: string;
				status: string;
				name: string;
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
}
