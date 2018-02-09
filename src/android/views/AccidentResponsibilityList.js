import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import { Container } from 'native-base'
import { Icon } from 'native-base'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles from '../GlobalStyles'

const renderItem = props => {
    console.log('props', props)
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text style={[globalStyles.midText]}>事故责任</Text>
                <Text style={[globalStyles.midText, styles.itemWarnColor]}>未结</Text>
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <Icon name='ios-time-outline' style={styles.itemBlockIcon} style={styles.itemBlockIcon} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>2017-05-12 11:30 ~ 2017-05-12 11:30</Text>
                </View>
            </View>
            <View style={[styles.item,{justifyContent:'flex-end'}]}>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockText,styles.itemWarnColor]}>-3000 元</Text>
                </View>
            </View>
        </View>
    )
}

const AccidentResponsibilityList = props => {
    console.log('props', props)
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


const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AccidentResponsibilityList)

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
    itemWarnColor: {
        color: '#fe7378'
    },
    itemBlockIcon: {
        color: '#bbb',
        fontSize: 16,
        width: 20,
        textAlign: 'center'
    },
    itemBlockMaterialIcon: {
        width: 20,
        textAlign: 'center'
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