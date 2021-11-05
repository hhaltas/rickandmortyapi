import * as actionTypes from '../../actions/actiontypes'
import initialState from '../../initialstate'

export default function characteridReducer(state=initialState.characterid, action) {
    switch (action.type) {
        case actionTypes.TAKE_CHARACTERID:
            return action.payload;
        default:
            return state;
    }
}