import { combineReducers } from "@reduxjs/toolkit";
import bugsReducer from "./bugs.js";
import projectsReducer from "./projects.js";

export default combineReducers({
    bugs: bugsReducer,
    projects: projectsReducer
})