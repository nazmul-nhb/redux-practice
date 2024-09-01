// func is thunk is redux toolkit ---> think-> thunk
// we don't need to create this, it's already built in rtk
const func = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
       return action(dispatch, getState);
    } else {return next(action) }
}

export default func;