import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { Input, Label} from 'native-base'
import globalStyles from '../utils/GlobalStyles'

const margin = 15

const RichTextBox = props => {
    const { input: { onChange, ...restProps },
        label = '',
        labelStyle = {},
        textStyle = {},
        isRequired=false,
        containerStyle = {},
        meta: { error, touched } } = props
    return (
        <View style={[styles.item, containerStyle]}>
            <Label style={[styles.label, globalStyles.midText, labelStyle]}>{isRequired && <Text style={styles.errText}>*</Text>}{label}</Label>
            <Input
                multiline={true}
                style={[styles.inputArea, globalStyles.midText, textStyle]}
                onChangeText={onChange}
                {...restProps} />
            {touched && error && <Text style={[globalStyles.errorText, { marginTop: 15 }]}>* {error}</Text>}
        </View>
    )
}

export default RichTextBox

const styles = StyleSheet.create({
    item: {
        marginLeft: margin,
        paddingVertical: margin,
        paddingRight: margin,
    },
    label: {
        marginBottom: margin
    },
    itemSelectContainer: {
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingBottom: margin
    },
    itemSelect: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    errText: {
        color: 'red'
    },
    inputArea: {
        height: 200,
        textAlignVertical: 'top',
        borderWidth: 0.3,
        borderColor: '#777'
    }
})

