import {
    ALL_ROOMS_FAIL,
    ALL_ROOMS_SUCCESS,
    ROOM_DETAIL_FAIL,
    ROOM_DETAIL_SUCCESS,
    CLEAR_ERRORS
} from '../constants/roomConstants'

// All rooms reducer

export const allRoomsReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ALL_ROOMS_SUCCESS:
            return {
                roomsCount: action.payload.roomsCount,
                resPerPage: action.payload.resPerPage,
                filteredRoomsCount: action.payload.filteredRoomsCount,
                rooms: action.payload.rooms
            }
        case ALL_ROOMS_FAIL:
            return {
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


// Room detail reducer

export const roomDetailReducer = (state = { room: {} }, action) => {
    switch (action.type) {
        case ROOM_DETAIL_SUCCESS:
            return {

                rooms: action.payload
            }
        case ROOM_DETAIL_FAIL:
            return {
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}