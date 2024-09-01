import { apiCallBegan } from "../api";
import { addBug, bugAdded, getUnresolvedBugs, loadBugs, resolveBug } from "../bugs"
import Store from "../store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

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

    let fakeAxios;
    let store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = Store();
    });

    // helper functions
    const bugsSlice = () => {
        return store.getState().entities.bugs;
    };

    const createState = () => {
        return {
            entities: {
                bugs: {
                    list: []
                }
            }
        }
    }

    // const flushPromises = () => new Promise(setImmediate);

    describe("loading bugs", () => {
        describe("if the bugs exist in the cache", () => {
            it("they should not be fetched from the server again.", async () => {
                fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

                await store.dispatch(loadBugs());
                await store.dispatch(loadBugs());

                expect(fakeAxios.history.get.length).toBe(1);
            });
        });

        describe("if the bugs don't exist in the cache", () => {
            it("they should be fetched from the server and put in the store", async () => {
                fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

                await store.dispatch(loadBugs());

                // Wait for the state to update
                // await flushPromises();

                expect(bugsSlice().list).toHaveLength(1);
            });

            describe("loading indicator", () => {
                it("should be true while fetching the bugs", () => {
                    fakeAxios.onGet("/bugs").reply(() => {
                        expect(bugsSlice().isLoading).toBe(true);
                        return [200, [{ id: 1 }]];
                    });

                    store.dispatch(loadBugs());
                });

                it("should be false after the bugs are fetched", async () => {
                    fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

                    await store.dispatch(loadBugs());

                    // Wait for the state to update
                    // await flushPromises();

                    expect(bugsSlice().isLoading).toBe(false);
                });

                it("should be false if the server returns an error", async () => {
                    fakeAxios.onGet("/bugs").reply(500);

                    await store.dispatch(loadBugs());

                    // Wait for the state to update
                    // await flushPromises();

                    expect(bugsSlice().isLoading).toBe(false);
                });
            });
        });
    });

    it("should add the bug to the store if it's saved to the server", async () => {
        // AAA --> 
        // -> Arrange
        const bug = { description: "Bug Test" };
        const savedBug = { ...bug, id: 1 };
        fakeAxios.onPost('/bugs').reply(200, savedBug);

        // -> Act 
        await store.dispatch(addBug(bug));

        // -> Assert
        expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it("should mark the bug as resolved if it's saved to the server", async () => {
        fakeAxios.onPost('/bugs').reply(200, { id: 1 });
        fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, resolved: true });

        await store.dispatch(addBug({}));
        await store.dispatch(resolveBug(1));

        expect(bugsSlice().list[0]?.resolved).toBe(true);
    })

    it("should not add the bug to the store if it's not saved to the server", async () => {
        // AAA --> 
        // -> Arrange
        const bug = { description: "Bug Test" };
        fakeAxios.onPost('/bugs').reply(500);

        // -> Act 
        await store.dispatch(addBug(bug));

        // -> Assert
        expect(bugsSlice().list).toHaveLength(0);
    });

    describe("selectors", () => {
        it('getUnresolvedBugs', () => {
            const state = createState();
            state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 2 }, { id: 3 }];

            const result = getUnresolvedBugs(state);

            expect(result).toHaveLength(2);
        });
    });
});