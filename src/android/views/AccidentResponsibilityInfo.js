import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import globalStyles from '../GlobalStyles'

const AccidentResponsibilityInfo = props => {
    console.log('props',props)
    const {responsibilityInfo}=props
    return (
        <View>
            <View style={styles.itemContainer}>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockTitle]}>事故责任</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Text style={globalStyles.midText}>2017-09-12 11:30</Text>
                    <Text style={[globalStyles.midText, styles.warnColor]}>已结</Text>
                </View>
            </View>
            <View style={styles.itemColorBlock}>
                <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>事故编号：</Text>12345678</Text>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.itemBlock}>
                    <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>事故类型：</Text>普通／严重</Text>
                    <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>处理人：</Text>张建国</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>责任人承担：</Text><Text style={styles.warnColor}>3200.00元</Text></Text>
                </View>
                <View style={styles.itemBlock}>
                    <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>完结时间：</Text>2017-09-12 11:30</Text>
                </View>
            </View>
        </View>
    )
}

export default AccidentResponsibilityInfo


const styles = StyleSheet.create({
    itemContainer: {
        padding: 10
    },
    itemBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    itemColorBlock: {
        backgroundColor: '#f4f8fa',
        padding: 15,
        borderBottomWidth: 0.3,
        borderTopWidth: 0.3,
        borderColor: '#ddd'
    },
    itemBlockTitle: {
        fontWeight: 'bold'
    },
    warnColor: {
        color: '#fe7378'
    }
})