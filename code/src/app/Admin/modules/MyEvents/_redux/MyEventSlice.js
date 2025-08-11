import {createSlice} from "@reduxjs/toolkit";

const initialMyEvent = {
    entities: []
};

export const MyEventSlice = createSlice({
    name: "myEventASU",
    initialState: initialMyEvent,
    reducers: {
        setEntities: (state, action) => {
            state.entities = action.payload;
        }
    }
});
