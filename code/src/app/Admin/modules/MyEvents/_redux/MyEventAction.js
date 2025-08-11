import {MyEventSlice} from "./MyEventSlice";

const {actions} = MyEventSlice;

export const setMyEvents = (myEvents) => dispatch => {
    dispatch(actions.setEntities(myEvents))
}