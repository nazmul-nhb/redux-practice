// import { bugAdded, bugRemoved, bugResolved } from "./actionCreator.js";
import { bugAdded, bugRemoved, bugResolved } from "./store/bugs.js";
import bugsStore from "./store/bugsStore.js";
import { addProject } from "./store/projects.js";
import projectsStore from "./store/projectsStore.js";
// import { store } from "./store.js";

const unsubscribe = bugsStore.subscribe(() => {
    console.log("Store Changed!", bugsStore.getState());
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

bugsStore.dispatch(bugAdded({ description: "Bug 1" }));
bugsStore.dispatch(bugAdded({ description: "Bug 2" }));
bugsStore.dispatch(bugAdded({ description: "Bug 3" }));
bugsStore.dispatch(bugAdded({ description: "Bug 4" }));
bugsStore.dispatch(bugAdded({ description: "Bug 5" }));

bugsStore.dispatch(bugRemoved({ id: 1 }));
bugsStore.dispatch(bugResolved({ id: 3 }));

unsubscribe();

console.log(bugsStore.getState());

projectsStore.dispatch(addProject({ description: "Foul Project!" }))

console.log(projectsStore.getState());
