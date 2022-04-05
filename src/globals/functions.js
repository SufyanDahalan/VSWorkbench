exports.BindToClass = function BindToClass(functionsObject, thisClass) { // https://stackoverflow.com/a/62142995
    for (let [ functionKey, functionValue ] of Object.entries(functionsObject)) {
        thisClass[functionKey] = functionValue.bind(thisClass);
    }
}
