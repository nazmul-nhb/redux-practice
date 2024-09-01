const logger = param => store => next => action => {
    // console.log("logger: ", param);
    return next(action)
}

export default logger;