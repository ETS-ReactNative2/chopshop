import { setTestDriveVideo } from "./testDrive";

export const SET_COMP_CAR_CONFIG = 'SET_COMP_CAR_CONFIG';
export const CLEAR_COMP_CAR_CONFIG = 'CLEAR_COMP_CAR_CONFIG';

export const setCompCarConfig = (config)=>{
    return {
        type: SET_COMP_CAR_CONFIG,
        value: config
    }
}

export const clearCompCarConfig = ()=>{
    return {
        type: CLEAR_COMP_CAR_CONFIG
    }
}

export const selectCompCar = (type,index) =>{
    return (dispatch, getState) => {
        let compCar = getState()[type][index]
        dispatch(setCompCarConfig(compCar));
        dispatch(setTestDriveVideo(compCar.video));
        return;
    }
};