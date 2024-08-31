import { createSlice } from "@reduxjs/toolkit";
import { generateID } from "@nazmul-nhb/id-generator";

const slice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        addProject: (projects, action) => {
            projects.push({
                id: generateID({ timeStamp: false, length: 16, caseOption:"upper" }),
                name: action.payload.name,
                isRunning: true
            });
        }
    }
});

export const { addProject } = slice.actions;
export default slice.reducer;
