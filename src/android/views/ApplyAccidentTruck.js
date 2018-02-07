import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import { Container } from 'native-base'
import { Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles from '../GlobalStyles'

const renderItem = props => {
    console.log('props', props)
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>No.123456778</Text>
                <Text style={[globalStyles.midText, styles.itemHeaderStatus]}>待处理</Text>
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <MaterialCommunityIcons name='truck' size={14} color={'#bbb'} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>辽B23456</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Icon name='ios-time-outline' style={styles.itemBlockIcon} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>2017-05-12 11:30</Text>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                <MaterialCommunityIcons name='alert-circle' size={14} color={'#bbb'} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}><Text>事故地点：</Text>大连市开发区金马路十元国际东门</Text>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                <MaterialCommunityIcons name='alert-circle' size={14} color={'#bbb'} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}><Text>事故描述：</Text>有后门，右后叶子板凹坑变形</Text>
                </View>
            </View>
        </View>
    )
}

const ApplyAccidentTruck = props => {
    return (
        <Container style={{ padding: 5, backgroundColor: '#edf1f4' }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[1, 2, 3, 4, 5]}
                renderItem={renderItem}
            />
        </Container>
    )
}

export default ApplyAccidentTruck

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        padding: 5,
        margin: 5,
        borderWidth: 0.3,
        borderColor: '#ddd'
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 5,
        marginBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 0.3,
        borderColor: '#ddd'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    itemHeaderStatus: {
        color: '#fe7378'
    },
    itemBlockIcon: {
        color: '#bbb',
        fontSize: 16
    },
    itemBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemBlockText: {
        paddingLeft: 5 
    },
    itemBlockTitle: {

    }
})