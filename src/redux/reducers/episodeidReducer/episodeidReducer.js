import * as actionTypes from '../../actions/actiontypes'
import initialState from '../../initialstate'

export default function episodeidReducer(state=initialState.episodeid.eid, action) {
    switch (action.type) {
        case actionTypes.TAKE_EPISODEID:
            return action.payload;
        default:
            return state;
    }
}