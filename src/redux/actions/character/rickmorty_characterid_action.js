import * as actionTypes from '../actiontypes';

export function characterID(cid){
    return {type:actionTypes.TAKE_CHARACTERID,payload:cid}
}