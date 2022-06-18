# Introduction

## first section

example for citation:

\cite{thesis:vorlage}

example for sm maths:

$x_i = 5$

$\sqrt{x^2+1}$

example for sm centered maths:

$$x_i = 5$$

$$\sqrt{x^2+1}$$

image example

![alt](./Medien/suzanne-albedo.png)

caption used is the alt text


## second section

### first subsection

# Introduction

## Developer Tooling

### Development of Developer Tools Over the Years

### Current Status of Developer Tools

## Context Switching: Concept in theory and affects on day to day reality of developers

## second section

### first subsection

# Foundation

## TypeScript

## Electron

## API

### REST

### GraphQL





```typescript
import { AUTH_TOKEN_KEY, GITLAB_INSTANCE_KEY } from "./globals/";

function initStorage(context: vscode.ExtensionContext) {
	context.globalState.setKeysForSync([AUTH_TOKEN_KEY]);
	context.globalState.setKeysForSync([GITLAB_INSTANCE_KEY]);
}
```

# Foundation2
