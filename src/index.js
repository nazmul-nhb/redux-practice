import { bugAdded, bugRemoved, bugResolved } from "./actionCreator.js";
import { store } from "./store.js";

const unsubscribe = store.subscribe(() => {
    console.log("Store Changed!", store.getState());
})

store.dispatch(bugAdded("Bug 5"));

unsubscribe();

// store.dispatch(bugRemoved(1));

store.dispatch(bugResolved(1))

console.log(store.getState());
