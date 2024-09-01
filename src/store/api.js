import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/callRequested");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");