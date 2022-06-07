/**
 * Includes frequently used GraphQL queries
 */

export const getUser = ""; // first example GraphQL query
export const issueQuery = (/* fullpath: string, issue_iid: string */):string => JSON.stringify(

{
query: `{
project(fullPath: "strtporg/backend-chef") {
issue(iid: "27") {
title
labels {
edges {
node {
id
color
title
}
}
}
author {
id
name
avatarUrl
}
notes {
edges {
node {
id
body
}
}
}
assignees {
edges {
node {
id
}
}
}
}
}
}
` } );
export const issueQuerywParam = (fullpath: string, issue_iid: string):string => JSON.stringify(

{
query: `{
project(fullPath: "${fullpath}") {
issue(iid: "${issue_iid}") {
title
labels {
edges {
node {
id
color
title
}
}
}
author {
id
name
avatarUrl
}
notes {
edges {
node {
id
body
}
}
}
assignees {
edges {
node {
id
}
}
}
}
}
}
` } );
        