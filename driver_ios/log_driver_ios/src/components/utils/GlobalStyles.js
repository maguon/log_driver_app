import {
    StyleSheet
} from 'react-native'
import { fontSizeCoeff } from '../../util/util'

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: '#F0EFF5'
    },
    styleColor: {
        color: '#76b92c'
    },
    styleBackgroundColor: {
        backgroundColor: '#76b92c'
    },
    textColor:{
        color: '#838485'
    },
    midText: {
        fontSize: 14 * fontSizeCoeff,
        color: '#838485'
    },
    smallText: {
        fontSize: 12 * fontSizeCoeff,
        color: '#838485'
    },
    ssText: {
        fontSize: 10 * fontSizeCoeff,
        color: '#838485'
    },
    largeText:{
        fontSize: 16 * fontSizeCoeff,
        color: '#414445'
    },
    xlText:{
        fontSize: 18 * fontSizeCoeff,
        color: '#414445'
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
    },

})

export const styleColor='#76b92c'

export default globalStyles
