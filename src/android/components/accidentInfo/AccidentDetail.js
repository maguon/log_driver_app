import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import globalStyles from '../../GlobalStyles'

const AccidentDetail = props => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerItem}>
                    <Text style={[globalStyles.largeText, globalStyles.styleColor]}>No.:1234454654</Text>
                    <Text style={globalStyles.smallText}>2017-05-12 11:30</Text>
                </View>
                <View style={styles.headerStatusItem}>
                    <Text style={[globalStyles.midText]}>未处理</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>事故地点：</Text>大连市开发区瑞港库</Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>发生时间：</Text>2017-05-12 11:30</Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>调度任务：</Text>大连->长春（123123）</Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>事故描述</Text></Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={globalStyles.midText}>123123123123123</Text>
                </View>
            </View>
        </View>
    )
}

export default AccidentDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    header: {
        paddingVertical: 5,
        borderBottomWidth: 0.3,
        borderColor: '#777'
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    headerStatusItem: {
        alignItems: 'flex-end',
        paddingVertical: 5
    },
    body: {
        paddingVertical: 15
    },
    bodyItem: {
        paddingVertical: 5
    },
    bodyItemTitle:{
        fontWeight:'bold'
    }
})
