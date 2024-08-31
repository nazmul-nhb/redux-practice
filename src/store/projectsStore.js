import { configureStore } from "@reduxjs/toolkit";
import reducer from "./projects.js";

const store = configureStore({ reducer });

export default store;
