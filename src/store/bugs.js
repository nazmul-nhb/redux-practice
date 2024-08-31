import { createAction, createReducer } from "@reduxjs/toolkit";

export const bugAdded = createAction("bugAdded");

export const bugRemoved = createAction("bugRemoved");

export const bugResolved = createAction("bugResolved");

let lastId = 0;

// use latest createReducer with builder
export default createReducer([], (builder) => {
    builder
        .addCase(bugAdded, (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            });
        })
        .addCase(bugRemoved, (bugs, action) => {
            return bugs.filter(bug => bug.id !== action.payload.id);
        })
        .addCase(bugResolved, (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id);
            if (index !== -1) {
                bugs[index].resolved = true;
            }
        });
});

// reducer function without createReducer
// export default function reducer(state = [], action) {
//     switch (action.type) {
//         case bugAdded.type:
//             return [
//                 ...state, {
//                     id: ++lastId,
//                     description: action.payload.description,
//                     resolved: false
//                 }
//             ];
//         case bugRemoved.type:
//             return state.filter(bug => bug.id !== action.payload.id);
//         case bugResolved.type:
//             return state.map(bug => bug.id === action.payload.id ? { ...bug, resolved: true } : bug);
//         default:
//             return state;
//     }
// }