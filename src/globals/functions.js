exports.BindToClass = function BindToClass(functionsObject, thisClass) { // TODO: maybe move to src/globals/functions
    for (let [ functionKey, functionValue ] of Object.entries(functionsObject)) {
        thisClass[functionKey] = functionValue.bind(thisClass);
    }
}
