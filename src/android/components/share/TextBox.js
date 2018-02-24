import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Item, Input } from 'native-base'
import globalStyles from '../../GlobalStyles'

const TextBox = props => {
    const { input: { onChange, ...restProps },
        label = '',
        last = false,
        secureTextEntry = false,
        isRequired = false,
        textStyle = {},
        itemStyle = {},
        meta: { error, touched } } = props
    return <Item inlineLabel last={last} style={styles.body}>
        <Item style={[styles.item,itemStyle]}>
            <Text style={[globalStyles.midText, textStyle]} >{isRequired&&<Text style={styles.errText}>*</Text>}{label}</Text>
            <Input
                secureTextEntry={secureTextEntry}
                style={[globalStyles.midText, textStyle]}
                onChangeText={onChange}
                {...restProps}
            />
        </Item>
        {touched && (error && <View style={styles.errView}>
            <Text style={[globalStyles.smallText, styles.errText]}>{`*${error}`}</Text>
        </View>)}
    </Item>
}

const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    item: {
        borderBottomWidth: 0
    },
    errView: {
        marginBottom: 10
    }
})


export default TextBox