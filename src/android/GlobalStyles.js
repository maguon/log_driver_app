import {
    StyleSheet
} from 'react-native'
import { fontSizeCoeff } from '../util/util'

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: '#eee'
    },
    styleColor: {
        color: '#00cade'
    },
    styleBackgroundColor: {
        backgroundColor: '#00cade'     
    },
    textColor:{
        color: '#777'
    },
    midText: {
        fontSize: 4.5 * fontSizeCoeff,
        color: '#777'
    },
    smallText: {
        fontSize: 4 * fontSizeCoeff,
        color: '#777'
    },
    ssText: {
        fontSize: 3.5 * fontSizeCoeff,
        color: '#777'
    },
    largeText:{
        fontSize: 6 * fontSizeCoeff,
        color: '#777'
    },
    xlText:{
        fontSize: 7 * fontSizeCoeff,
        color: '#777'
    },
    formIcon:{
        marginLeft: 10,
        fontSize:20,
        color: '#777'
    },
    listContainer: {
        backgroundColor: '#eee',
        padding: 5
    },
    listItem:{
        backgroundColor: '#fff',
        margin: 5
    },
    errorText:{
        fontSize: 4 * fontSizeCoeff,
        color: 'red'
    }
})

export const styleColor='#00cade'

export default globalStyles