# Introduction | Motivation

# Problem und Goal

Programming and software development has its deep roots in the scientific communities and largely resided, for the first couple of decades, in the (obscure|dark|somepoeticthing)? rooms of researchers. 
As programming found its way into commercialization not bound to any hardware product and was made generally available to the public through the internet/web,
 the demand for programmers and software developers soared in a way that made it hard to (keep the pipeline fed|keep up with demand). 
This great demand and meager supply of programmers made it a highly vital task to squeeze efficiency out of the very few programmers available. Hence developer tools. 

Developer tools try to achieve a big subset of things, enabling developers to cooperate on a higher scale (communication software [teams, zoom, email], 
collaboration tools for technical and nontechnical staff [jira, trello, atlassian wiki], collaboration tools for technicals that touch on many different 
subjects [git, gitlab, github], tools made to save time [CICD, gitlab ci, github action], tools made to increase precision and correctness of work output   
made by programmers [automated testing frameworks => cypress, playwright], and debugging).

These developer tools are essential in the work life of a programmer. Use them fluently and efficiently, and you will make your life easier.
## Developer Tooling
### History | Development of Developer Tools Over the Years, Current Status of Developer Tools
## Problem and Goal

## Context Switching: Concept in theory and affects on day to day reality of developers

tasks needing high memory load and/or requiring the developer to be in a state of high flow can have sinked productivity when they are even slightly interrupted[1](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.76.2685&rep=rep1&type=pdf, experiment 3) todo
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

GraphQL is a project released by developed by Facebook and the opensource community that defines a way to query data from the server, enabling the developer to get exactly the data he needs, nothing more and nothing less \cite{GRAPHQL}. 

It abstracts some stuff and make shit easier blablabla

### iframes

### vscode and electron js

### Authentication, Authorization and OAuth Tokens

# Implementation

## Authentication and Authorization

## Gitlab REST and GRAPHQL apis

## publishing on marketplace.visualstudio.com , current progress

## goals moving forward





```typescript
import { AUTH_TOKEN_KEY, GITLAB_INSTANCE_KEY } from "./globals/";

function initStorage(context: vscode.ExtensionContext) {
	context.globalState.setKeysForSync([AUTH_TOKEN_KEY]);
	context.globalState.setKeysForSync([GITLAB_INSTANCE_KEY]);
}
```



example for sm maths:

$x_i = 5$

$\sqrt{x^2+1}$ 

example for sm centered maths:

$$x_i = 5$$

$$\sqrt{x^2+1}$$

image example

![alt](./Medien/suzanne-albedo.png)

caption used is the alt text