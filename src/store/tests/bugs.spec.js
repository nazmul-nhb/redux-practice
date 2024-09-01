import { apiCallBegan } from "../api";
import { addBug, bugAdded } from "../bugs"
import store from "../store";

describe("bugsSlice", () => {
    // solitary test
    // describe("action creators", () => {
    //     it("addBug", () => {
    //         const bug = { description: "Bug Test" }
    //         const result = addBug(bug);

    //         const expected = {
    //             type: apiCallBegan.type,
    //             payload: {
    //                 url: '/bugs',
    //                 method: 'post',
    //                 data: bug,
    //                 onSuccess: bugAdded.type
    //             }
    //         }

    //         expect(result).toEqual(expected)
    //     });
    // });
    it("should handle the addBug action", async () => {
        const bug = { description: "Bug Test" };
        await store.dispatch(addBug(bug));
        expect(store.getState().entities.bugs.list).toHaveLength(1);
    })
});