import * as vscode from 'vscode'
export const changeValidEmitter = new vscode.EventEmitter<object>();
export const newAuthentication = new vscode.EventEmitter<void>();