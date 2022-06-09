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
export const issueQuery = (issue_gid: string): string =>
	JSON.stringify({
		query: `
 {
    issue(id: "gid://gitlab/Issue/${issue_gid}") {
      projectId
      userNotesCount
      iid
      title
      labels {
        nodes {
          id
          color
          title
        }
      }
      author {
        id
        name
        avatarUrl
      }
      notes {
        nodes {
          id
          body
          author {
            name
            avatarUrl
            id
          }
        }
      }
      assignees {
        nodes {
          id
          name
          avatarUrl
        }
      }
    }
  }
`,
	});

/**
 * Issues Query
 * @param isGroup describes whether the query targets a group or a project
 * @param fullpath full path of project, i.e. 'gitlab-org/gitlab-foss'
 * @returns Issues of the specified project with adequate information about them
 */
export const issuesQuery = (isGroup: boolean, fullpath: string): string =>
	JSON.stringify({
		query: `
{
    ${isGroup ? 'group' : 'project'}(fullPath: "${fullpath}") {
      issues {
        nodes {
          title
          labels {
            nodes {
              title
              color
            }
          }
          id
          iid
          userNotesCount
          author {
            id
            avatarUrl
            name
          }
          createdAt
          closedAt
        }
      }
    }
  }
`,
	});

// export const issueQuery = (fullpath: string, issue_iid: string): string =>
// 	JSON.stringify({query: `{ project ( fullPath: "${fullpath}" ) { issue ( iid: "${issue_iid}" ) { title labels { edges { node { id color title } } } author { id name avatarUrl } notes { edges { node { id body } } } assignees { edges { node { id } } } } } }`,});
