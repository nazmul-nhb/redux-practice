import { createAction, createReducer, createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallRequested } from "./api";

let lastId = 0;

// 3.create slice
const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        isLoading: false,
        lastFetch: null
    },
    reducers: {
        bugsRequested: (bugs, action) => {
            bugs.isLoading = true;
        },
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.isLoading = false;
        },
        bugsRequestFailed: (bugs, action) => {
            bugs.isLoading = false;
        },
        bugAdded: (bugs, action) => {
            bugs.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            });
        },
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            if (index !== -1) {
                bugs.list[index].resolved = true;
            }
        },
        bugRemoved: (bugs, action) => {
            return bugs.list.filter(bug => bug.id !== action.payload.id);
        },
        bugAssignedToUser: (bugs, action) => {
            const { bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        }
    }
});

export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed } = slice.actions;

export default slice.reducer;

const url = '/bugs';

export const loadBugs = () => apiCallRequested({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type,
    onError:bugsRequestFailed.type
});

// manual selector
// export const getUnresolvedBugs = (state) => {
//     return state.entities.bugs.filter(bug => !bug.resolved);
// }

// createSelector from reselect via rtk
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => !bug.resolved)
);

export const getBugsByUser = (userId) => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
);

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