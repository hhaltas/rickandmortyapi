import * as actionTypes from '../actiontypes';

export function episodeID(eid){
    return {type:actionTypes.TAKE_EPISODEID,payload:eid}
}