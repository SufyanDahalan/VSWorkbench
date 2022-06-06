export {};

declare global {
	interface IIssue {
		id: number;
		iid: number;
		title: string;
		state: string;
		updated_at: string;
		created_at: string;
		labels: string[];
		references: {
			full: string;
			relative: string;
			short: string;
		}; // ie [Group Name]/[Repo/Project Name]#1
		due_date: string;
		author: { username: string; name: string; id: string }; // Sufyan Dahalan
		assignee: { username: string; name: string; id: string }; // Sufyan Dahalan
		project_id: number;
		user_notes_count: number;
	}
	interface IComment {
		issue_id: number;
		issue_iid: number;
		project_id: number;
		id: number;
		body: string;
		author: { username: string; name: string; id: string }; // Sufyan Dahalan
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
		status: string;
		source: string; //can prob be made into an enum, TODO
		id: number;
		iid: number;
		project_id: number;
		web_url: URL;
		/**
		 * commit message of triggering commit
		 * should be fetched over commit api
		 */
		message: string;
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
	}
}
