# Contributing


## Run tests

* Open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac) and from the launch configuration dropdown pick `Extension Tests`.
* Press `F5` to run the tests in a new window with your extension loaded.
* See the output of the test result in the debug console.
* Make changes to `src/test/suite/extension.test.ts` or create new test files inside the `test/suite` folder.
  * The provided test runner will only consider files matching the name pattern `**.test.ts`.
  * You can create folders inside the `test` folder to structure your tests any way you want.

Registering a plugin:-
1. Register VSWorkbench as a dependency in your package.json file:

```json
  "extensionDependencies": [
    "sufyandahalan.vsworkbench"
  ],
```
2. 


















------
-------

# Contributing

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

When contributing to this project, please first discuss the changes you wish to make via an issue before making changes.

Please note the [Code of Conduct](CODE_OF_CONDUCT.md) document, please follow it in all your interactions with this project. 
## Your First Code Contribution


Unsure where to begin contributing? You can start by looking through the [`help-wanted`](https://github.com/SufyanDahalan/VSWorkbench/labels/help-wanted) issues.

### Getting the code

```
git clone https://github.com/SufyanDahalan/VSWorkbench.git
```

Prerequisites

- [Git](https://git-scm.com/), `>= 2.7.2`
- [NodeJS](https://nodejs.org/), `>= 14.16.0`
- [npm](https://www.npmjs.com/), `>= 8.11.0`


### Dependencies
### Build

```bash
npm run build
```
<!-- ### Watch
### Formatting
### Linting
### Bundling
### Debugging
#### Using VS Code
## Submitting a Pull Request
### Contributions to GitLens+ Licensed Files
 -->

### Registering a platform specific plugin

```typescript
import { extensions } from 'vscode';
const VSWorkbench = extensions.getExtension<any>('sufyandahalan.vsworkbench');

VSWorkbench.registerPlugin({TreeViews, Commands})
```
Please refer to the [extension.ts file](https://github.com/SufyanDahalan/VSWorkbench/tree/main/src/extension.ts) for more information about the `registerPlugin` 
function.
