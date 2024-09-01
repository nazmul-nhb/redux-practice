const logger = param => store => next => action => {
    // console.log("Param: ", param);
    next(action)
}

export default logger;