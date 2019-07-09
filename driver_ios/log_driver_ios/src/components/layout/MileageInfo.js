import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import {fontSizeCoeff} from "../../util/util";


const window=Dimensions.get('window')

const MileageInfo = props => {
      const { mileageInfoReducer: { data: { mileageInfo }, MileageInfo: { isResultStatus } } } = props
       // if (isResultStatus == 1) {
         return (
             <View style={[styles.container]}>
                 <View style={[styles.betweenItem, styles.borderShadow]}>
                     <Text style={styles.betweenText}>本月工资</Text>
                     <Text style={styles.betweenNumber}>{mileageInfo.distanceCount ? `${mileageInfo.distanceCount}` : '0'}</Text>
                 </View>
                 <View style={[styles.betweenItem, styles.background]}>

                     <View style={[styles.leftItem, styles.borderShadow]}>
                         <Text style={styles.betweenText}>本月里程</Text>
                         <Text style={styles.betweenNumber}>{mileageInfo.distanceCount ? `${mileageInfo.distanceCount}` : '0'}</Text>
                     </View>
                     <View style={[styles.rightItem, styles.borderShadow]}>
                         <Text style={styles.betweenText}>本月运车</Text>
                         <Text style={styles.betweenNumber}>{mileageInfo.carCount ? `${mileageInfo.carCount}` : '0'}</Text>
                     </View>

                 </View>

             </View>
         )
      // }
}



const styles = StyleSheet.create({
    betweenItem: {
        width:window.width*0.95,
        height: 60,
        marginTop:10,
        backgroundColor:'#73B52B',
        borderRadius:5,
        flexDirection:'row',
    },
    //阴影样式
    borderShadow:{
        shadowOffset:{ width:4, height:4 },
        shadowColor:'black',
        shadowOpacity:0.2,
        shadowRadius:2,
    },
    background:{
        backgroundColor:'white',
    },

    betweenText:{
        color: "white",
        fontSize: 14 * fontSizeCoeff,
        marginTop: 10,
        marginLeft:20,
        fontWeight: "bold",

    },
    betweenNumber:{
        color: "white",
        fontSize: 24 * fontSizeCoeff,
        position:"absolute",
        bottom:5,
        right:10,
    },

    leftItem:{
        width:window.width*0.95/2.1,
        backgroundColor:'#ea7f80',
        borderRadius:5,
        height: 60,
        flexDirection:'row',

    },
    rightItem:{
        width:window.width*0.95/2.1,
        height: 60,
        backgroundColor:'#f3a723',
        borderRadius:5,
        position:"absolute",
        right:0,
        flexDirection:'row',
    },
    container: {
        marginTop:50,
        backgroundColor:'white',
        flexDirection:"column",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

})
const mapStateToProps = (state) => {
    return {
        mileageInfoReducer: state.mileageInfoReducer,
    }
}
 export default connect(mapStateToProps)(MileageInfo)


