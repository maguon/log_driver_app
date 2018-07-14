import {
    StyleSheet
} from 'react-native'
import { fontSizeCoeff } from '../util/util'

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: '#F0EFF5'
    },
    styleColor: {
        color: '#73B52B'
    },
    styleBackgroundColor: {
        backgroundColor: '#73B52B'     
    },
    textColor:{
        color: '#777'
    },
    midText: {
        fontSize: 14 * fontSizeCoeff,
        color: '#777'
    },
    smallText: {
        fontSize: 12 * fontSizeCoeff,
        color: '#777'
    },
    ssText: {
        fontSize: 10 * fontSizeCoeff,
        color: '#777'
    },
    largeText:{
        fontSize: 16 * fontSizeCoeff,
        color: '#777'
    },
    xlText:{
        fontSize: 18 * fontSizeCoeff,
        color: '#777'
    },
    formIcon:{
        marginLeft: 10,
        fontSize:20,
        color: '#777'
    },
    listBackgroundColor:{
        backgroundColor: '#f8fafb'   
    },
    errorText:{
        fontSize: 12 * fontSizeCoeff,
        color: 'red'
    },
    separator:{
        height:20
    }
})

export const styleColor='#73B52B'

export default globalStyles