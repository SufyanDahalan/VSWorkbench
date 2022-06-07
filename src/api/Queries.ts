/**
 * Includes frequently used GraphQL queries
 */

export const getUser = ""; // first example GraphQL query

/**
 * Issue Query
 * @param fullpath path of project, i.e. [GroupName]/[ProjectName]
 * @param issue_iid issue_iid. The Id used in link
 * @returns GraphQL query for an issue, including adequate  information about their labels
 * and notes and authors of notes
 */
export const issueQuery = (fullpath: string, issue_iid: string): string =>
	JSON.stringify({query: `{ project ( fullPath: "${fullpath}" ) { issue ( iid: "${issue_iid}" ) { title labels { edges { node { id color title } } } author { id name avatarUrl } notes { edges { node { id body } } } assignees { edges { node { id } } } } } }`,});

