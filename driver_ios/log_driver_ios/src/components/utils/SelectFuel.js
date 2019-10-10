import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import {Icon} from 'native-base'
import globalStyles, {styleColor} from './GlobalStyles'

const {width} = Dimensions.get('window')
const margin = 15

const TextValue = props => <Text style={globalStyles.midText}>{props.value.value}</Text>

const SelectFuel = props => {
    let {
        input: {onChange, value, ...restProps},
        label = '',
        last = false,
        isRequired = false,
        textStyle = {},
        ValueComponent = TextValue,
        onPress,
        meta: {error, touched}
    } = props
    // console.log('value', value)
    // console.log('props' + JSON.stringify(props))
    return (
        <TouchableOpacity style={styles.body} onPress={() => onPress({onChange})}>
            <View style={styles.item}>
                <Text style={[globalStyles.midText]}>{isRequired && <Text style={styles.errText}>*</Text>}<Text
                    style={textStyle}>{label}</Text></Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <ValueComponent value={value}/>
                    <Icon name='ios-arrow-forward' color='#777' fontSize={15}
                          style={{fontSize: 18, color: '#bbb', paddingLeft: 15}}/>
                </View>
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


export default SelectFuel
