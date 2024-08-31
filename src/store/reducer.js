import { combineReducers } from "@reduxjs/toolkit";
import entitiesReducers from "./entities.js"

export default combineReducers({
    entities: entitiesReducers
})