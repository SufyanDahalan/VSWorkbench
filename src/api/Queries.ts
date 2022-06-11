/**
 * Includes frequently used GraphQL queries
 */

/**
 * Issue Query
 * @param issue_gid issue_iid. The Id used in link
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
      description
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
 * @param fullpath full path of group or project, i.e. 'gitlab-org' or  'gitlab-org/gitlab-foss'
 * @returns Issues of the specified project with adequate information about them
 */
export const issuesQuery = (isGroup: boolean, fullpath: string): string =>
	JSON.stringify({
		query: `
{
    ${isGroup ? "group" : "project"}(fullPath: "${fullpath}") {
      issues {
        nodes {
          title
          id
          iid
          userNotesCount
          createdAt
          closedAt
          labels {
            nodes {
              title
              color
            }
          }
          author {
            id
            avatarUrl
            name
          }
        }
      }
    }
  }
`,
	});

/**
 * Pipeline Query
 * @param fullpath full path of project, i.e.  'gitlab-org/gitlab-foss'
 * @returns Pipelines of the specified project with adequate information about them
 */
export const pipelinesQuery = (fullpath: string): string =>
	JSON.stringify({
		query: `
    {
        project(fullPath: "${fullpath}") {
            pipelines {
                nodes {
                  id
                  status
                  duration
                  ref
                  updatedAt
                  detailedStatus {
                    text
                  }
                  commit {
                    id
                    title
                    shortId
                    webUrl
                    author {
                      name
                      avatarUrl
                      webUrl
                    }
                    authorName
                    authorGravatar
                    authorEmail
                  }
                  user {
                    id
                    name
                    avatarUrl
                    webUrl
                  }
                  stages {
                    nodes {
                      id
                      status
                      detailedStatus {
                        text
                      }
                      name
                    }
                  }
                }
              }
            }
          }
          
          
`,
	});
