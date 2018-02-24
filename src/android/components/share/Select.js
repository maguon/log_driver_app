import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    InteractionManager,
    Dimensions
} from 'react-native'
import { Item, Input, ListItem, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../GlobalStyles'

const { width } = Dimensions.get('window')
const margin = 15

const _onPress = ({ showList, getList, onChange, getListWaiting, isPop }) => {
    getListWaiting()
    showList({
        onSelect: (param) => {
            if (isPop) { Actions.pop() }
            InteractionManager.runAfterInteractions(() => {
                onChange(param)
            })
        }
    })
    InteractionManager.runAfterInteractions(getList)
}

const Select = props => {
    let { input: { onChange, value, ...restProps },
        label = '',
        last = false,
        secureTextEntry = false,
        isRequired = false,
        textStyle = {},
        itemStyle = {},
        getList,
        isPop = true,
        showList,
        getListWaiting,
        meta: { error, touched } } = props
    return (
        <TouchableOpacity style={last ? styles.lastBody : styles.body} onPress={() => _onPress({ showList, getList, onChange, getListWaiting, isPop })}>
            <View style={[styles.item, itemStyle]}>
                <Text style={[globalStyles.midText, textStyle, {}]} >{isRequired && <Text style={styles.errText}>*</Text>}{label}{value.value}</Text>
                <Icon name='ios-arrow-forward-outline' color='#777' fontSize={15} style={{ fontSize: 18, color: '#777' }} />
            </View>
            {touched && (error && <View style={styles.errView}>
                <Text style={[globalStyles.smallText, styles.errText]}>{`*${error}`}</Text>
            </View>)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: margin,
        paddingVertical: margin,
        paddingRight: margin,
        borderBottomWidth: 0.3,
        borderColor: '#ccc'
    },
    lastBody: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: margin,
        borderBottomWidth: 0.3,
        borderColor: '#ccc'
    },
    item: {
        width: width - margin * 2,
        borderBottomWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errView: {
        marginTop: margin
    }
})


export default Select