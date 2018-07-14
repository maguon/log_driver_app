import { Actions } from 'react-native-router-flux'


export const singlePhotoView = (parent) => {
    if (parent === 'truckBlock') return Actions.singlePhotoViewAtTruckBlock
}

