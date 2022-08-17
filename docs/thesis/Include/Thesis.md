<!-- # Introduction | Motivation -->

# Problem and Goal


## Developer Productivity
Programming and software development has its deep roots in the scientific communities and largely resided, for the first couple of decades, in the (obscure|dark|somepoeticthing)? rooms of researchers. 
As programming found its way into commercialization not bound to any hardware product and was made generally available to the public through the internet/web,
the demand for programmers and software developers soared in a way that made it hard to (keep the pipeline fed|keep up with demand). 
This great demand and meager supply of programmers made it a highly vital task to squeeze efficiency out of the very few programmers available. Hence developer tools. 

Developer tools try to achieve a big subset of things, enabling developers to cooperate on a higher scale (communication software [teams, zoom, email], 
collaboration tools for technical and nontechnical staff [jira, trello, atlassian wiki], collaboration tools for technicals that touch on many different 
subjects [git, gitlab, github], tools made to save time [CICD, gitlab ci, github action], tools made to increase precision and correctness of work output   
made by programmers [automated testing frameworks => cypress, playwright], and debugging).

These developer tools are essential in the work life of a programmer. Use them fluently and efficiently, and your output will easily multiply.

## Affects of Context Switching on Developer Productivity

Research shows that there is a special state of mind in which a person shows hightened focus. 

Developer's heavily rely on getting into the 'zone', also called flow in scientific circles, in order to get through their tasks.

Flow is essentially characterized by the complete absorption in what one does, and a resulting transformation in one's sense of time and improving 
one's productivity \cite{FLOW}. todo{paraphraze}

Research shows that to get into the state of flow, a developer needs a an average of 10-15 minutes of clear thinking and uninterrupted work \cite{FLOW:ENTRANCE}.

Interruptions, however, can lead to a reset of the flow state. The developer would then need to boot up his flow state again, where he/she will need 
another 10 minutes of bootup focus to get in his/her flow state again.

VSWorkbench is a trial to minimize these interruptions in the context of developers who utilize GitLab in their daily life. 
VSWorkbench should cut the time needed to look up a project, search for an issue or looking where that button is again by 
bringing the most used functionalities of GitLab closer to where the developer is usually to be found when he is in his state of flow:
the code editor.

The goal of VSWorkbench within the framework of this bachelor's thesis is to bring the 20% of functionality of GitLab as a start that is used 80% of the time
and present them in a familiar manner that is not much distinguishable from the native webapp gitlab experience, with the end goal being minimizing 
interruptions and hightening developer's productivity. 

<!--

## Context Switching: Concept in theory and affects on day to day reality of developers

tasks needing high memory load and/or requiring the developer to be in a state of high flow can have sinked productivity when they are even slightly interrupted[1](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.76.2685&rep=rep1&type=pdf, experiment 3) todo

## Developer Tooling
### History | Development of Developer Tools Over the Years, Current Status of Developer Tools 
## Problem and Goal
-->

# Fundamentals


### Tech Stack

#### HTML

HTML (HyperText Markup Language) is the standard  language used to used to create hypertext documents that are platform independent, usually rendered on a browser. HTML documents can be used with generic semantics to represent information from a wide range of domain, including but not limited to: mail, hypermedia, news, documentation, or simple structured documents with inlined graphics. \cite{RFC:1866}
HTML in its current form traces its origins to a Request For Comment [^1] by Tim Berners-Lee and has ever since been developed by a [set of companies](https://www.w3.org/Consortium/Member/List) (for WHATWG: Apple, Google, Mozilla, Microsoft) under the umbrella of the [w3c](https://www.w3c.org) and the [WHATWG](https://whatwg.org).
<!-- Latest HTML version is HTML5, which is a name used for a living standard instead of a  -->
HTML is a living standard, meaning changes occur without maintaining or incrementing a version number. Informally , however, the HTML living standard is called HTML5.
<!-- It was created when different standards created by different companies where joined together in 2016? and work on the next/upcoming html standards is now managed and organized by a a [joint committe](link to website of this committee, link to their work and rfc, maybe a link to email list) -->

[^1]: An RFC is a document that contains technical specifications and organizational notes for the Internet. For more information see https://www.ietf.org/standards/rfcs/ .
#### CSS

CSS is a style sheet mechanism that allows web page authors and readers to attach style \cite{RFC:CSS}. Using CSS, a developer can, among other things, specify fonts, colors and spacing. <!-- Lately, CSS transitions were developed, which enable smooth transitions when a property's value changes {TODO link to graphic}. --> Latest CSS standard is CSS3, put forward by the W3C \cite{RFC:CSS}. It has also been standardized in (TODO year) and progress and future development on it 
is managed by a joint committee under the umbrella of the W3C.

#### Javascript

Javascript (often abbreviated JS) is an event driven language developed to be used in browsers. It features JIT, or just-in-time-compilation, which means that
the javascript files received by the browser will be compiled and run simultaneously. 
The two most common variants of Javascript are CommonJS and EcmaScript. While EcmaScript is developed solely for the browser, packaging DOM TODO{explain more}
manipulation libraries with it, CommonJS is developed for server-side use, therefore it is shipped with modules that enable Javascript to interact with its
hardware, including but not limited to IO, template engines, object relational mappers, and middleware \cite{COMMONJS}.
The Javascript variant used in this project is EcmaScript.

#### Typescript

Typecript is a statically typed subset of js todo{cite wikipedia or smth}, developed and maintained by Micosoft. While there were multiple trials to create a 
statically typed language that transpiles to Javascript, Typescript is the langauge that saw the most adoption by the community, consistently scoring 
high on StackOverflow Developer Surveys \cite{TS:STACKOVERFLOW:21}\cite{TS:STACKOVERFLOW:22}. Typescript currently has approximately 82.9k stars on GitHub, making it the 48th 
most starred repository on GitHub currently \cite{TS:GH:RANKING}.


#### tsconfig, TS interfaces, eventemitter and their use in notifications across contexts

## The modern web architecture (web 2.0)

### Client-Server Architecture

The client-server architecture describes the relationship between the device of a website owner (server) and the devices of users (client). It has it's roots in
the early ARPANET days in the 1970s where the Stanford researchers worked toward creating interactive programms that function across computer networks 
\cite{RFC:5}. The server receives HTTP requests across the network and returns data, usually in the form of HTML, CSS, JS for the rendering of a website or raw 
data, usually as JSON or raw text data. 
The client-server architecture is used as an abstraction to simplify the workflow of clients. The client does not need to knwo bla bla. Conversely, the server
must take care of business logic required to retrieve data requested by the client, and return an internet package, containing the response,
in a way that follows common API specifications such as ReST or GraphQL todo{cite smth? idk}.
The client then takes care of building a user friendly interface to hold the information given back by the server.  

### HTTP methods, REST, GraphQL

HTTP \cite{RFC:2616} is an application-level protocol for distributed, collaborative information systems. It is a generic, stateless, protocol which
can be used for many tasks beyond its use for hypertext through extension of its request methods, error codes and headers. It defines the specification through
which common internet communication between systems happens. It sets standards for interactions between different systems, most notabely the HTTP GET 
and HTTP POST methods. The HTTP GET method is used to retrieve data from an API. In case authentication is required, it is achieved through a special `Authentication` header, enabled by the generic nature of HTTP. An HTTP POST method is used to transfer data back to the API, e.g. to perform a set of operations
based on the data transferred or to simply save it.

REST defines a way to 

todo{attach a screenshot of the api.ts file, showcasing REST api requests}

GraphQL is a technology that defines a way to query data from the server, enabling the developer to get exactly the data he needs, nothing more 
and nothing less \cite{GRAPHQL}. 
GraphQL is a project released by developed by Facebook and released to the opensource community in 2015. Since then, its further developement has been a 
collaboration between Facebook and volunteers from open source community. 

<!-- It abstracts some stuff and make shit easier blablabla -->
GraphQL enables a frontend developer todo{explain what a frontend developer does in a footnote} to describe the data that he or she wants to receive.
This way, the developer gets exactly the data he asks for, allowing the internet packets to be smaller when allowed, improving performance for the end user.
GraphQL can only be used in combination with a POST request, because it strictly needs an `HTTP body`, a feature that GET requests lack according to the 
HTTP spec\cite{RFC:2616}. 
It features a simple intuitive syntax

<!-- see https://pandoc.org/MANUAL.html#images -->
![GraphQL Query and Result](./Medien/GraphQL Syntax.png){#id .class width=612px height=118px}

### iframes

An `iframe`, or an inline frame, is an html tag todo{link somewhere to explain what a tag is?} that is used to embed an html document into another.
It has many uses, most notably embedding web resources of other companies, websites into others, e.g. youtube videos on wordpress websites or personal blogs.
The way it works is as follows: 

The `iframe` HTML element was first introduced by Microsoft Internet Explorer in 1997, they were a notable addition to HTML5
iframes are used as a way of guerrela marketing, e.g. iframes of youtube videos, or collaboration and arbitrary extension of a document, such as in vscode. 

While iframes present a challenge for search engines and accessibility readers, they are a considerable solution for extending web applications.


### vscode and electron js


ElectronJS was started in 2013 \cite{FC:ELECTRONJS} to enable web developer to build cross platform desktop application in a familiar way to web development. 
Electron apps (such as microsoft teams, vscode and others) are bundled together with the nodejs runtime and chromium browser engine, causing a simple hello world 
programm to reach hundreds of Megabytes in size. Electron, however, allows developers to benefit from the already existing cross platform compatibility of 
browsers and lowers the bar for companies building desktop apps by allowing them to tap into the abundant web developer talent.  
ElectronJS essentially proposed a new view into desktop app development. It's wide adoption, inspite of it's lack of performance compared to traditional 
technologies, speaks for it's success.

Visual Studio Code (short: VSCode) is an open source cross platform language agnostic extendible code editor started in 2015 by microsoft \cite{FC:VSCODE}. 
It was intended to be part of Microsoft's trend towards open source. It was based in it's core on open source/open standard technologies such as html,
css, javascript and electronjs, with all developers as end users in mind. It's extensibility makes it appealing to web developers and vim/emacs users.

Furthermore, major companies have endorsed VSCode by writing language/platform specific extensions for them and offering them free of charge. Examples of 
such are the Docker extension by Microsoft, java language support extensions by redhat and microsoft, and many other language support and cloud development
extensions developed by major companies. Each and every extension of these are a step into bringing together the scattered bits and pieces of 
developers' workplace and tools into one workbench.


### Authentication, Authorization and Personal Access Tokens

Authentication is the process of ensuring the identity of the user is correct.
Authorization is the process of checking priviliges of a user during the processing of an action started by the user.

Personal Access Tokens (short: PATs) are user specific unique strings that can be generated by the service. All valid PATs can be assigned to one unique user.
On the other hand, a user can create multiple PATs with varying privilige levels. PATs are usually issued with an expiration date, in the case of microsoft and 
visualstudio.marketplace.com, it can reach a max of 120 days?. However, in some cases, such as GitLab, PATs can be issued by the user to never expire. 

PATs are used to gain access to APIs and services ^[see [https://docs.gitlab.com/ee/api/index.html](https://docs.gitlab.com/ee/api/index.html)]. The GitLab service, whether self-hosted or the SAAS version,
The GitLab API checks if the user has enough priviliges before executing the action, and provides an HTTP response based on the result.
If authentication information is not valid or is missing, GitLab returns an error message with a status code of 401:
```javascript
{
    "message": "401 Unauthorized"
}
```

todo{add screenshot of user priviliges / access levels, and screenshot of exemplary reponses for a 200 and a 401}


### Version Control Software and Git

As projects grow in complexity and software teams grow in size, a coordination and communication overhead starts to take place. One of the developer tools
Used to minimize this overhead is Source Code Management (short: SCM).  

SCM tools enable multiple developers to work individually and simultaneously on the same files, incrementally introducing changes in order to implement different 
features without much friction. With the help of SCM, multiple versions of the same software can coexist, where they can be deployed to different environments
for different purposes (testing, staging, and production). 

The most widespread SCM tool currently is Git, a project started by the linux kernel maintainer Linus Torvalds in 2005 for use in the development of the Linux 
Kernel. It was developed with the intent to keep it open source, in contrary to previous SCM tools that were proprietary and in part paid 
^[See BitKeeper, StarTeam, Rational Synergy, and Vault VCS].

Git was designed to be fast and efficient. As it follows the unix philosophy of programming \cite{UNIXPHILOSOPHY}, it's functionality can also be extended 
^[see [Git Flow](https://github.com/nvie/gitflow)].

### Gitlab

As git started to gain traction, multiple trials to introduce a graphical user interface where made. The most successful were webapp based user interfaces, which
implies the existence of a central repository (or a central source of truth). Most notable examples are GitHub, GitLab, and BitBucket. 
These services also began to extend their functionlality beyond being a simple git graphical interface, integrating state of the art tools like
CICD and  tools that adhere to new methodologies that make developing and deploying software to users easier, more frictionless and more efficient.
GitLab therefore started integrating more and more CICD tooling and support, starting in 2012. Over the course of the years, GitLab developed and integrated
more DevOps tools, enabling developers to publish their software packages through gitlab ^[e.g. nuget packages for dotnet, npm packages for node]. 
As a result, Gitlab was able to build a platform/system that is effectively a fully featured toolbox:
1. Developers can develop, collaborate, communicate, build and release their libraries, packages and software incrementally and efficiently. Furthermore, 
Developers can incorporate user support and communication into gitlab using features like Service Desk 
^[See [Service Desk Documentation](https://docs.gitlab.com/ee/user/project/service_desk.html)]. 

GitLab is working towards an all encompassing platform that eliminates that need for multiple scattered services, each with it's own maintenance 
and administration overhead. This is essentially the philisophy that inspired the development of VSWorkbench. 
 

### Module Bundlers and Webpack

Module bundlers are tools that combine multiple JS files into one. They can additionally minimize the file (by e.g. ommiting extra spaces and using 
shorter names for variables and functions). In addition to that, the output file can have a concatenated hash in it's name in order to support better caching.
The end result will be automatic inclusion of new JS code from new files into the webpages/websites/webapps per the config of the module bundler.
A famous module bundler is wbepack. Webpack was started in 2014 by Tobias Koppers in order to simplify bundling/compilation workflow of JS(HTML? CSS?) 
based projects. Webpack is used in VSWorkbench to seperately build the extension and the three vanilla TS apps in a way that facilitates them working as one unit.
Webpack also bundles and (optionally) inlines css styles.

### Docusaurus and GitLab CI.

VSWorkbench aims to be opensource and will be extended through collaboration by the open source community. To enable this and make the contribution process as
frictionless as possible, documentation has to be tackled. 

Docusaurus is a tool developed by facebook that enables developers to write documentation in markdown and deploy it without needing to dive into the 
details of building and deploying a documentation website. It outputs a static website and does not create the need for server side services that will need
maintenance and will incur costs. The static build can also be deployed on gitlab using gitlab pages with the help of cicd and gitlab ci. 

The process is as follows:

1. The developer defines a gitlab ci job, named pages, in the repository's gitlab-ci.yml file.
2. When a commit is pushed into remote (aka gitlab server), the `pages` job runs on the repository where it is defined. It builds the website according to 
the steps predefined in the gitlab ci job, and saves the build in an artifact
3. The gitlab ci artifact, which contains the website build, will then be accessible by the end users through a domain made availabe by gitlab. It usually 
follows the following syntax? : [gitlab username].gitlab.ioa/[repository name].
Alternatively, the developer can bind the artifact to a domain name of his own choosing, e.g. VSWorkbench.Dahalan.De

4. When an enduser navigates to the url to which the artifact is mapped, the gitlab servers/CDN? send a reply with the artifact. The artifact will contain
HTML, CSS, JS, and possibly assets (images, pdfs, etc.) that the end user's browser can parse and build the website from. 

Gitlab CI and docusaurus dramatically decrease the overhead of generating and hosting documentation, enabling the developer to focus on major tasks such 
as new features, refactoring or pull requests.

## npm, npm scripts

NPM (short for Node Package Manager) is one of the most popular pacakge managers for javascript (along with yarn and others) created by Isaac Z. Schlueter 
and maintaned by npm, Inc. Due to its popularity, it is the default package manager for the JavaScript runtime environment Node.js. 
NPM the CLI program is used to install packages, run tests available in a specific project and run scripts.

When using NPM, it will create a file in the project by the name of `package.json`. In the `package.json` file, packages along iwth their versions are defined, 
scripts that can be run using `npm run XXX` and meta data that can be used by platforms hosting projects to display information.

An example of this is defining the repository link in the `package.json` file, where it will be linked by visual studio marketplace to give the extension viewer
quick access to the repository, if it is opensourced. A package/extension publisher can also define different tags that will help users in visual 
studio marketplace to search and find his or her package.

The `package.json` file furthermore allows it's user to define custom reusable scripts in the sections block. 

<!-- ![The VSWorkbench package.json file](./Medien/packageJson.png){#id .class width=532px height=171px} -->

```json
	"scripts": {
		"vscode:prepublish": "npm run package",
		"ts": "npm run esbuild-base -- --minify",
		"compile": "webpack",
		"watch": "webpack --watch",
		"package": "webpack --mode production --devtool hidden-source-map",
		"compile-tests": "tsc -p . --outDir out",
		"watch-tests": "tsc -p . -w --outDir out",
		"pretest": "npm run compile-tests && npm run compile && npm run lint",
		"lint": "eslint src --ext ts",
		"test": "node ./out/test/runTest.js",
		"deploy": "vsce publish --no-yarn",
		"postinstall": "cd docs && npm install && cd ..",
	},
```

The above code block showcases an excerpt from the `package.json` file used in developing VSWorkbench. It defines commands to test, compile and package,
continiously build and test the extension. Furthermore, it also defines steps that are run before testing (pretest script) and after installing packages 
(postinstall script). 

The `package.json` file is a tool that facilitates contribution and collaboration between developers by enabling them to declaratively define the dependencies
needed to develop and deploy the project.

Futhermore, the `package-lock.json` file will be automatically created and updated after each package installation. It describes the exact dependency tree 
that represents the node_modules file in order to build the exact dependency tree again on different machines, ensuring the all developers will always have 
the same dependencies with the same versions installed. To build the dependency tree using the `package-lock.json` file, a developer has to run 
```bash
npm ci;
```  
in his or her command line interface.



# Implementation

## VSCode API

To facilitate the process of extending the functionality of VSCode, an API is exposed that can be used by the extension developer.
The API provided by VSCode provides visual and functional components.

### Tree View


The Tree View API is a visual component exposed by VSCode that can be utilized by creating a class that inherits from the `vscode.TreeDataProvider` class and implementing it's functions.
The developer also has to define an entry for the implemented class in the `package.json` file.
```json
{
...
"contributes": {
    ...
    "viewsContainers": {
        "activitybar": [
            {
                "id": "gitLabCode-activityBar",
                "title": "VSWorkbench",
                "icon": "src/assets/icon.png"
            }
        ],
        "panel": [
            {
                "id": "gitlabcode-panel",
                "title": "VSWorkbench",
                "icon": "src/assets/icon.png"
            }
        ]
    },
    "views": {
        "gitLabCode-activityBar": [
            {
                "id": "groupView",
                "name": "Groups",
                "contextualTitle": "VSWorkbench",
                "visibility": "visible",
                "when": "VSWorkbench.authenticated"
            },
            ...
            ]
        ...
        }
}
}

```
The `contributes` entry in the `package.json` file declaratively defines the visual and functional exntesions that the extension provides.
The `views` entry refers to containers of visual componets, such as the container `gitLabCode-activityBar`. The `gitLabCode-activityBar` container then accepts 
an array of components, in the above example the `groupView` tree view.
The `gitLabCode-activityBar` component container will then be embedded, also declaratively, into the VSCode activity bar. 

The following picture explains the anatomy and components of VSCode visually.

![VSCode Extension Anatomy | Contribution ](./Medien/Extension Anatomy.png){}
todo{add source. URL: https://code.visualstudio.com/assets/api/ux-guidelines/examples/architecture-sections.png}
The Drap and Drop API can is used by implementing two functions for the drag and drop functionality respectively in the `GroupTreeDataProvider` that are 
inhereted from the `vscode.TreeDragAndDropController` class. 

```javascript
	public async handleDrag(source: GroupNode[], treeDataTransfer: vscode.DataTransfer,

     _token: vscode.CancellationToken): Promise<void> {
		if (source[0].contextValue !== "user") {
			treeDataTransfer.set("application/vnd.code.tree.groupView",
             new vscode.DataTransferItem(source));
		}
	}
	public async handleDrop(target: GroupNode | undefined, sources: vscode.DataTransfer,

     _token: vscode.CancellationToken): Promise<void> {
		const transferItem = sources.get("application/vnd.code.tree.groupView");
		...
```

The `handleDrag` function takes two GroupNode as a parameter in addition to a cancellation token paramter todo{explain more}. The source, the GroupNode that is currently being dragged and a `vscode.DataTransfer` object.
The function checks if the source object is the user namespace todo{exaplin more about namepsaces n stuff}, which is not a group and cannot be moved or deleted. 
If the node is not a user namepsace, i.e. if it is a group or a project node, it's status will be set to be dragged.

This prevents user namespaces from entering the `handleDrop` function, which would potentially result in illegal actions that will be later rejected by the 
GitLab API.

The `handleDrop` function accepts three parameters, the source node, or the node being dragged, and a target node, where the source node was dropped. 
The target node is allowed to be `null`, which means that the source node was dropped into an empty area where no node exists. If the target node is not `null`,
it is of type `GroupNode`. A GroupNode can be a user namespace, a Group or a subgroup, or a project.
The function will check if the action is legal, and then call the correct function to conclude the operation.
The user can move a project between groups, subgroups and personal namespaces. However; the user cannot move a project into another project or otherwise move a 
group, subgroup or user namepsaces into projects.
Furthermore the user can convert groups into subgroups by moving them into other groups or subgroups, but cannot move them into user namespaces. 

The functions that will be called are defined in the `api.ts` file and have the following declarations:


```typescript

	transferGroup(id: number, group_id?: number): Promise<AxiosResponse> {
		return Api.instance.api.post(`v4/groups/${id}/transfer`,

        group_id ? { group_id } : null);
	}
	transferProjectToGroup(group_id: number, project_id: number): 
    
    Promise<AxiosResponse> {
		return Api.instance.api.put
        
        (`v4/projects/${project_id}/transfer?namespace=${group_id}`);
	}
```

The transferGroup function accepts two arguments, the id of the group (id), and the id of the namespace (group_id) where it should be moved.
The reason behind making the 'group_id' parameter optional is to enable to make groups top level groups, i.e. not nested in other groups, depending on this 
parameter.

![The groupView Tree View in VSWorkbench](./Medien/groupView.png){#xid .xclass width=612px height=118px}


### Webview 

The Webview component is a visual component that is used to utilize the editor space todo{reference the reader to the VSCode anatomy} by adding an editor tab. 
It is used by VSWorkbench to display snippets and wiki pages of a specific project. 

The webviews, or editor tabs, are in their essence dynamic html wrapped in a container. When the user changes the selected tab, javascript is used to 
instantly delete the previous content of the container, evaluate the new content and append it to the container again.

To utilize the Webview API exposed by VSCode, an instance of the class vscode.WebviewPanel by utilizing the {vscode.window.createWebviewPanel} function.

```typescript
let panel = vscode.window.createWebviewPanel(this.viewType, `${name} | ${ViewEvents[type]}`, vscode.ViewColumn.One, {
			enableScripts: true,
			retainContextWhenHidden: true,
		});
```

The function is called with three parameters, namely the view type of the webview, it's title, the show options for the webview, which specify the location of 
the webview, and finally a set of optional parameters. 
The optional parameters are used to enable the use of javascript in the webview context and to prevent the discardment of the webview context in case it is 
hidden, or when the user switches to another tab.

Moreover, the webview panel is instantiated without any html assigned. Therefore, the developer has to assign it html. 

The HTML is assigned to the webview using the follow function.


```typescript
private getHtml(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri!, "dist", "editor", "main.js"));
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy">
            <title>GitLab CI | Editor</title>
        </head>
        <body>
        <div id="app"></div>
            <script src="${scriptUri}"></script>
        </body>
        <script >window.vscode = acquireVsCodeApi();</script>
        </html>`;
}
```

The function `getHtml` first locates the extension in order to locate the Javascript file used for dynamic html and css content and assigns the value to the 
variable `scriptUri`. Secondly, the function embeds the `scriptUri` variable in an html script tag so that the html document embedded in the can access the 
Javascript file. Lastly, the function assigns the VSCode API to a variable named `window.vscode` that will later be used for communication between the 
Webview embedded app/html document and the extension context. 
To prevent any confusion, the VSCode API refered to in the above snippets refers to an API that can merely send messages back and forth between the extension
context and the contexts of the apps/html documents embedded and managed by the extension, not the API exposed by vscode to enable the extension to communicate 
with VSCode and make use of it's components. 


The embedded app will first import the API class used to communicate with gitlab and instantiate an object. It will stand by until it receives a message from 
the parent context informing it of the API token for authentication with gitlab and additional information, such as whether the context to be loaded belongs to 
a wiki or a snippet, and the ID of the object to be loaded. 
After receiving the aforementioned information, the embedded app will start querying gitlab for the information needed to model the HTML document around. 
After the HTML document is ready, the result will be injected via Javascript into the uppermost parent container, the `div` element with the id `app`.   





### Webview View API

### Commands



tree classes , tree models, drag n drop, webview and webviewview

## Gitlab REST and GraphQL apis

GitLab exposes APIs for users


## publishing on marketplace.visualstudio.com , current progress


vsce publish, how to compiles and packages and link the three apps ot the one parent app
## Documentation, jsdoc, api file


JSDOC is an API documentation generator for JavaScript, that utilizes comments to generate websites, output to JSON format, and add hover support on code 
editors and IDEs like VSCODE.
JSDOC's syntax allows the developer to quickly add documentation in the form of comments, with specific keywords that will highlight important aspects of code, 
such as return value, parameters and their qualities, or references to other documented snippets of code that help other developers understand the function 
of the referencing code snippet.

JSDOC facilitates the steps of maintaining, refactoring and extending software.


```typescript
/**
 * Issues Query
 * @param isGroup describes whether the query targets a group or a project
 * @param fullpath full path of group or project, i.e. 
   
 * 'gitlab-org' or  'gitlab-org/gitlab-foss'
 * @returns Issues of the specified project with adequate information about them
 */
export const issuesQuery = (isGroup: boolean, fullpath: string): string =>
	...
```

The above code snippet showcases a function along with its JSDOC comments. 

![JSDOC Output](./Medien/JSDOC.png){#sid .sclass width=612px height=118px}


It will be visualized in VSCode to developers at hover will be represented in a similiar fashion on the documentation website that is wrapped with Docusaurus.



The NPM package `jsdoc-to-markdown` is a package that enables the developer to extract jsdoc comments into markdown files. It takes a minimum of one paramater,
specifying the files from which the documentation is to be extracted.  
To automate documentation and build of the documentation website, I utilized the npm package `jsdoc-to-markdown` wrapped in an npm script that extracts jsdoc documentation from the specified files into 
a markdown file. This markdown file will then be fed into the docusaurus build pipeline, where it will be rendered in it's own tab. 
Docusaurus, built on react, will build html files out of the markdown documents available and create a client side rendered web app. 

The architecture of Docusaurus, primarely relying on client side rendering enabled by react and CI infrastructure enabled by GitLab CI lowers overhead that 
accompanies the task of documenting software while simultaneously building it.


## telemetry? 

analyze how much specific functions/services/features are used and say smth about it.

## contexts

write something about having 4 contexts running at the same time. (3 vanilla apps, and the extension, therefore requiring 4 api singletons)


## Design Patterns Used 

Due VSCode is built with web technologies, and JS being a slower language, VSCode has notoriously slower start up times compared to other code editors. 
Additionally, VSCode has trouble rendering big files, as opposed to c/c++ based code editors like sublime text. 

Therefore, it is vital to make smart decisions when possible in order to not slow down the user's VSCode instance, or worse the user's operating system.


To lower memory expense, the API was implemented using the singleton design pattern. 

```typescript
public static get Instance() {
		if (!this.instance) {
			this.instance = new Api();
		}
		return Api.instance;
	}
```

The singleton will be instantiated once for each running context, namely the extension (parent) context, and the three child contexts representing the webviews
and the webview views.

This contributes to minimizing resources consumed in total by an already resource heavy application that is VSCode.

```typescript
import { Api } from "../../api";
let api = Api.Instance;
```


<!-- e.g. singleton for the api class -->


## write about making it look native, aka resemble gitlab very well (goal)

## write about extensibility, PR requests, Opensource, a bit about why github 

VSWorkbench is not intended to target only GitLab. Lots of other software tools used by developers make great candidates for further development.  Therefore it 
was essential to make VSWorkbench extensible inorder to support more platforms and tools in the future. 

todo{write about PR template.md or something and contributing.md and so on blz. trunk based development and so on}







## write about making it small, improving performance and time needed to start up, and how it holds up comapred to gitlab workflow (goal, plus comparison and results section)

OS: linux(5.15.0-46-generic)
CPUs: Intel(R) Core(TM) i7-10750H CPU @ 2.60GHz(12 x 3500)
Memory(System): 31.02 GB(13.82GB free)

<!-- \tiny -->
| Extension                           | Eager | Load Code | Call Activate | Finish Activate | Event                             | By                                  |
| :---------------------------------: | :---: | :-------: | :-----------: | :-------------: | :-------------------------------: | :---------------------------------: |
| vscode.debug-auto-launch            | true  | 2         | 0             | 2               | *                                 | vscode.debug-auto-launch            |
| vscode.git                          | true  | 22        | 13            | 27              | *                                 | vscode.git                          |
| vscode.git-base                     | true  | 2         | 0             | 2               | *                                 | vscode.git                          |
| vscode.github                       | true  | 3         | 0             | 0               | *                                 | vscode.github                       |
| SufyanDahalan.vsworkbench           | false | 2         | 3             | 3               | onStartupFinished                 | SufyanDahalan.vsworkbench           |
| Vue.volar                           | false | 51        | 3             | 0               | onLanguage:markdown               | Vue.volar                           |
: Demo or smth

## goals moving forward



todo{write about using html/utf8 icons and so on.}