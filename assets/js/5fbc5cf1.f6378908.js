"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[207],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return k}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=u(n),k=r,m=c["".concat(s,".").concat(k)]||c[k]||d[k]||o;return n?a.createElement(m,l(l({ref:t},p),{},{components:n})):a.createElement(m,l({ref:t},p))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=c;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var u=2;u<o;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},7480:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return k},frontMatter:function(){return i},metadata:function(){return u},toc:function(){return d}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),l=["components"],i={},s=void 0,u={unversionedId:"api",id:"api",title:"api",description:"Modules",source:"@site/docs/api.md",sourceDirName:".",slug:"/api",permalink:"/api",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Translate your site",permalink:"/tutorial-extras/translate-your-site"}},p={},d=[{value:"Modules",id:"modules",level:2},{value:"Classes",id:"classes",level:2},{value:"Members",id:"members",level:2},{value:"Functions",id:"functions",level:2},{value:"commands",id:"commands",level:2},{value:"IssueNode",id:"issuenode",level:2},{value:"new IssueNode()",id:"new-issuenode",level:3},{value:"Node",id:"node",level:2},{value:"new Node()",id:"new-node",level:3},{value:"GroupTreeDataProvider",id:"grouptreedataprovider",level:2},{value:"IssueView",id:"issueview",level:2},{value:"createGroupCommand()",id:"creategroupcommand",level:2},{value:"openProjectInGitLab()",id:"openprojectingitlab",level:2},{value:"openGroupInGitLab()",id:"opengroupingitlab",level:2},{value:"viewIssueBoard()",id:"viewissueboard",level:2},{value:"openIssueBoardInGitLab()",id:"openissueboardingitlab",level:2},{value:"openIssueListInGitLab()",id:"openissuelistingitlab",level:2}],c={toc:d};function k(e){var t=e.components,n=(0,r.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"modules"},"Modules"),(0,o.kt)("dl",null,(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#module_commands"},"commands")),(0,o.kt)("dd",null)),(0,o.kt)("h2",{id:"classes"},"Classes"),(0,o.kt)("dl",null,(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#IssueNode"},"IssueNode")),(0,o.kt)("dd",null),(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#Node"},"Node")),(0,o.kt)("dd",null)),(0,o.kt)("h2",{id:"members"},"Members"),(0,o.kt)("dl",null,(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#GroupTreeDataProvider"},"GroupTreeDataProvider")),(0,o.kt)("dd",null,(0,o.kt)("p",null,"class GroupView")),(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#IssueView"},"IssueView")),(0,o.kt)("dd",null)),(0,o.kt)("h2",{id:"functions"},"Functions"),(0,o.kt)("dl",null,(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#createGroupCommand"},"createGroupCommand()")),(0,o.kt)("dd",null),(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#openProjectInGitLab"},"openProjectInGitLab()")),(0,o.kt)("dd",null,(0,o.kt)("p",null,"navigates to project in gitlab in default browser")),(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#openGroupInGitLab"},"openGroupInGitLab()")),(0,o.kt)("dd",null,(0,o.kt)("p",null,"simply navigates to group in gitlab website in the default browser")),(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#viewIssueBoard"},"viewIssueBoard()")),(0,o.kt)("dd",null,(0,o.kt)("p",null,"opens an issue board as a webview in vscode")),(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#openIssueBoardInGitLab"},"openIssueBoardInGitLab()")),(0,o.kt)("dd",null,(0,o.kt)("p",null,"opens gitlab issue board in gitlab in the default browser")),(0,o.kt)("dt",null,(0,o.kt)("a",{href:"#openIssueListInGitLab"},"openIssueListInGitLab()")),(0,o.kt)("dd",null,(0,o.kt)("p",null,"opens gitlab issue list in gitlab in the default browser"))),(0,o.kt)("a",{name:"module_commands"}),(0,o.kt)("h2",{id:"commands"},"commands"),(0,o.kt)("a",{name:"IssueNode"}),(0,o.kt)("h2",{id:"issuenode"},"IssueNode"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Kind"),": global class  "),(0,o.kt)("a",{name:"new_IssueNode_new"}),(0,o.kt)("h3",{id:"new-issuenode"},"new IssueNode()"),(0,o.kt)("p",null,'vscode.TreeItem.contextValue possible values: "group", "user" value depends on kind of gitlab namespace TODO: maybe turn into enum to keep em clear? idk'),(0,o.kt)("a",{name:"Node"}),(0,o.kt)("h2",{id:"node"},"Node"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Kind"),": global class",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("strong",{parentName:"p"},"Todo")),(0,o.kt)("ul",{className:"contains-task-list"},(0,o.kt)("li",{parentName:"ul",className:"task-list-item"},(0,o.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","maybe turn into enum to keep em clear? idk")),(0,o.kt)("a",{name:"new_Node_new"}),(0,o.kt)("h3",{id:"new-node"},"new Node()"),(0,o.kt)("p",null,'possible values: "group", "user", "project" value depends on kind of gitlab namespace'),(0,o.kt)("a",{name:"GroupTreeDataProvider"}),(0,o.kt)("h2",{id:"grouptreedataprovider"},"GroupTreeDataProvider"),(0,o.kt)("p",null,"class GroupView"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Kind"),": global variable  "),(0,o.kt)("a",{name:"IssueView"}),(0,o.kt)("h2",{id:"issueview"},"IssueView"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Kind"),": global variable",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("strong",{parentName:"p"},"Feature"),": Some extra functionality/features:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"When clicking on an issue, open a webview where the issue can be seen along with all the comments.")),(0,o.kt)("p",null,"!FEATURE as a view/title action, implement ","[see issues list]"," action. This should take the user to a web view where the issues of the\nparent can be viewed in a list.\n!feature as a view/title action, implement ","[see issues list]"," action. This should take the user to a web view where the issues of the\nparent can be viewed in on a board. User can switch boards and will be able to drag and drop issues from one list to another.",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("strong",{parentName:"p"},"Feature"),": add icon to feature. choose the icon to be based off of ",(0,o.kt)("inlineCode",{parentName:"p"},"labels"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"urgency"),", or smth else. maybe just the color to represent the label, implies\nmigrating to a custom webviewview tho",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("strong",{parentName:"p"},"Feature"),": add avatar of assignee to the left of the issue. might require a custom webviewview",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("strong",{parentName:"p"},"Todo")),(0,o.kt)("ul",{className:"contains-task-list"},(0,o.kt)("li",{parentName:"ul",className:"task-list-item"},(0,o.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","implement actions for issues:")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Comment"),(0,o.kt)("li",{parentName:"ol"},"Delete"),(0,o.kt)("li",{parentName:"ol"},"Close"),(0,o.kt)("li",{parentName:"ol"},"Create")),(0,o.kt)("a",{name:"createGroupCommand"}),(0,o.kt)("h2",{id:"creategroupcommand"},"createGroupCommand()"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Kind"),": global function  "),(0,o.kt)("a",{name:"openProjectInGitLab"}),(0,o.kt)("h2",{id:"openprojectingitlab"},"openProjectInGitLab()"),(0,o.kt)("p",null,"navigates to project in gitlab in default browser"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Kind"),": global function  "),(0,o.kt)("a",{name:"openGroupInGitLab"}),(0,o.kt)("h2",{id:"opengroupingitlab"},"openGroupInGitLab()"),(0,o.kt)("p",null,"simply navigates to group in gitlab website in the default browser"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Kind"),": global function  "),(0,o.kt)("a",{name:"viewIssueBoard"}),(0,o.kt)("h2",{id:"viewissueboard"},"viewIssueBoard()"),(0,o.kt)("p",null,"opens an issue board as a webview in vscode"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Kind"),": global function  "),(0,o.kt)("a",{name:"openIssueBoardInGitLab"}),(0,o.kt)("h2",{id:"openissueboardingitlab"},"openIssueBoardInGitLab()"),(0,o.kt)("p",null,"opens gitlab issue board in gitlab in the default browser"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Kind"),": global function  "),(0,o.kt)("a",{name:"openIssueListInGitLab"}),(0,o.kt)("h2",{id:"openissuelistingitlab"},"openIssueListInGitLab()"),(0,o.kt)("p",null,"opens gitlab issue list in gitlab in the default browser"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Kind"),": global function"))}k.isMDXComponent=!0}}]);