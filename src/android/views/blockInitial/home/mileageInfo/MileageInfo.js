import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import globalStyles from '../../../../GlobalStyles'

const MileageInfo = props => {
    const { mileageInfoReducer: { data: { mileageInfo }, getMileageInfo: { isResultStatus } } } = props
    if (isResultStatus == 1) {
        return (
            <View style={[globalStyles.styleBackgroundColor, styles.container]}>
                <View style={[styles.item, styles.betweenItem]}>
                    <Text style={[globalStyles.smallText, globalStyles.styleColor]}>重载里程</Text>
                    <Text style={[globalStyles.largeText, globalStyles.styleColor]}>----</Text>
                </View>
                <View style={[styles.item, styles.centerItem]}>
                    <Text style={[globalStyles.smallText, globalStyles.styleColor]}>本月里程</Text>
                    <Text style={[globalStyles.largeText, globalStyles.styleColor]}>----</Text>
                    <Text style={[globalStyles.smallText, globalStyles.styleColor]}>公里</Text>
                </View>
                <View style={[styles.item, styles.betweenItem]}>
                    <Text style={[globalStyles.smallText, globalStyles.styleColor]}>空载里程</Text>
                    <Text style={[globalStyles.largeText, globalStyles.styleColor]}>----</Text>
                </View>
            </View>
        )
    } else {
        return (
            <View style={[globalStyles.styleBackgroundColor, styles.container]}>
                <View style={[styles.item, styles.betweenItem]}>
                    <Text style={[globalStyles.smallText, globalStyles.styleColor]}>本月里程</Text>
                    <Text style={[globalStyles.largeText, globalStyles.styleColor]}>{mileageInfo.distanceCount ? `${mileageInfo.distanceCount}` : '0'}</Text>
                </View>
                <View style={[styles.item, styles.centerItem]}>
                    <Text style={[globalStyles.smallText, globalStyles.styleColor]}>本月工资</Text>
                    <Text style={[globalStyles.largeText, globalStyles.styleColor]}>{mileageInfo.salary ? `${mileageInfo.salary}` : '0'}</Text>
                    <Text style={[globalStyles.smallText, globalStyles.styleColor]}>元</Text>
                </View>
                <View style={[styles.item, styles.betweenItem]}>
                    <Text style={[globalStyles.smallText, globalStyles.styleColor]}>本月运车</Text>
                    <Text style={[globalStyles.largeText, globalStyles.styleColor]}>{mileageInfo.carCount ? `${mileageInfo.carCount}` : '0'}</Text>
                </View>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        mileageInfoReducer: state.mileageInfoReducer,
    }
}

const styles = StyleSheet.create({
    betweenItem: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    centerItem: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    item: {
        backgroundColor: '#e5f1dc',
        borderWidth: 4,
        borderColor: '#acd086',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default connect(mapStateToProps)(MileageInfo) 