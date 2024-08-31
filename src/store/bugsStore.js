import { configureStore } from "@reduxjs/toolkit";
import reducer from "./bugs.js";

const store = configureStore({ reducer });

export default store;
