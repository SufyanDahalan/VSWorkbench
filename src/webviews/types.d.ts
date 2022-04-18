interface IIssue {
	id: number;
    iid: number;
	title: string;
	state: string;
	updated_at: string;
    created_at: string;
	labels: string[];
	reference: string; // ie 22SilverBullets/org#1
	due_date: string;
	author: { username: string; name: string; id: string }; // Sufyan Dahalan
    project_id: number
}
