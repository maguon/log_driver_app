import { Actions } from 'react-native-router-flux'


export const singlePhotoView = (parent) => {
    if (parent === 'truckBlock') return Actions.singlePhotoViewAtTruckBlock
}

export const cleanFeeList = parent => {
    // console.log('parent', parent)
    if (parent === 'homeBlock') return Actions.cleanFeeListAtHomeBlock
    if (parent === 'truckBlock') return Actions.cleanFeeListAtTruckBlock
    if (parent === 'driverBlock') return Actions.cleanFeeListAtDriverBlock
}