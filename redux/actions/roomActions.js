import axios from "axios";
import absoluteUrl from "next-absolute-url";

import {
    ALL_ROOMS_FAIL,
    ALL_ROOMS_SUCCESS,
    CLEAR_ERRORS,
    ROOM_DETAIL_FAIL,
    ROOM_DETAIL_SUCCESS

} from "../constants/roomConstants";

// get all rooms

export const getRooms = (req) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req);

        const { data } = await axios.get(`${origin}/api/rooms`);

        dispatch({
            type: ALL_ROOMS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_ROOMS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get room detail
export const getRoomDetails = (req, id) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req);

        const { data } = await axios.get(`${origin}/api/rooms/${id}`);
        console.log(data)

        dispatch({
            type: ROOM_DETAIL_SUCCESS,
            payload: data.room,
        });
    } catch (error) {
        dispatch({
            type: ALL_ROOMS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear errors

export const claseError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};