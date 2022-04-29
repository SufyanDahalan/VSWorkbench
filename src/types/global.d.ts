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
		reference: string; // ie [Group Name]/[Repo/Project Name]#1
		due_date: string;
		author: { username: string; name: string; id: string }; // Sufyan Dahalan
		project_id: number;
	}
	interface IComment {
		id: number;
		body: string;
		author: { username: string; name: string; id: string }; // Sufyan Dahalan
	}

	interface IPipelineListItem {
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
        node_id: number;
        parent_id: number;
        url: URL;        
	}
}
