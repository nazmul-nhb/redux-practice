import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

let lastId = 0;

// 3.create slice
const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        bugAdded: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            });
        },
        bugResolved: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id);
            if (index !== -1) {
                bugs[index].resolved = true;
            }
        },
        bugRemoved: (bugs, action) => {
            return bugs.filter(bug => bug.id !== action.payload.id);
        }
    }
});

export const { bugAdded, bugResolved, bugRemoved } = slice.actions;

export default slice.reducer;

// // 2.create actions
// export const bugAdded = createAction("bugAdded");

// export const bugRemoved = createAction("bugRemoved");

// export const bugResolved = createAction("bugResolved");

// // use latest createReducer with builder
// export default createReducer([], (builder) => {
//     builder
//         .addCase(bugAdded, (bugs, action) => {
//             bugs.push({
//                 id: ++lastId,
//                 description: action.payload.description,
//                 resolved: false
//             });
//         })
//         .addCase(bugRemoved, (bugs, action) => {
//             return bugs.filter(bug => bug.id !== action.payload.id);
//         })
//         .addCase(bugResolved, (bugs, action) => {
//             const index = bugs.findIndex(bug => bug.id === action.payload.id);
//             if (index !== -1) {
//                 bugs[index].resolved = true;
//             }
//         });
// });

// 1.reducer function without createReducer
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