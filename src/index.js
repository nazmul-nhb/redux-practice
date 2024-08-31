// import { bugAdded, bugRemoved, bugResolved } from "./actionCreator.js";
import { bugAdded, bugRemoved, bugResolved } from "./store/bugs.js";
import store from "./store/store.js";
// import { store } from "./store.js";

const unsubscribe = store.subscribe(() => {
    console.log("Store Changed!", store.getState());
})

// store.dispatch(bugAdded("Bug 1"));
// store.dispatch(bugAdded("Bug 2"));
// store.dispatch(bugAdded("Bug 3"));
// store.dispatch(bugAdded("Bug 4"));
// store.dispatch(bugAdded("Bug 5"));

// unsubscribe();

// // store.dispatch(bugRemoved(1));

// store.dispatch(bugResolved("cswj"))
// store.dispatch(bugResolved(3))

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugAdded({ description: "Bug 4" }));
store.dispatch(bugAdded({ description: "Bug 5" }));

store.dispatch(bugRemoved({ id: 1 }));
store.dispatch(bugResolved({ id: 3 }));

unsubscribe();

console.log(store.getState());
