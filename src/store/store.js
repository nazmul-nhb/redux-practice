import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer.js";
import logger from "./middleware/logger.js";
import func from "./middleware/func.js";
import api from "./middleware/api.js";

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger("Manush"), api)
});

export default store;
