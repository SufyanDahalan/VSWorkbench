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

The goal of VSWorkbench within the framework of this bachelor's thesis is to bring the 20% of functionality of GitLab as a start thats used 20% of the time
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


# Implementation

## vscode api,

tree classes , tree models, drag n drop, webview and webviewview

## Gitlab REST and GraphQL apis

GitLab exposes APIs for users


## publishing on marketplace.visualstudio.com , current progress


vsce publush, how i t compiles and packages and link the three apps ot the one parent app
## Documentation, jsdoc, api file


the NPM package `jsdoc-to-markdown` is a package that enables the developer to extract jsdoc comments into markdown files. It takes a minimum of one paramater,
specifying the files from which the documentation is to be extracted.  
To automate documentation and build of the documentation website, I utilized the npm package `jsdoc-to-markdown` wrapped in an npm script that extracts jsdoc documentation from the specified files into 
a markdown file. This markdown file will then be fed into the docusaurus build pipeline, where it will be rendered in it's own tab. 
Docusaurus, built on react, will build html files out of the markdown documents available and create a client side rendered web app. It will automatically 


## telemetry? 

analyze how much specific functions/services/features are used and say smth about it.

## contexts

write something about having 4 contexts running at the same time. (3 vanilla apps, and the extension, therefore requiring 4 api singletons)


## design patterns used 


To facilitate blablabla
<!-- e.g. singleton for the api class -->


## write about making it look native, aka resemble gitlab very well


## write about making it small, improving performance and time needed to start up, and how it holds up comapred to gitlab workflow


## goals moving forward


