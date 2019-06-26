import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput
} from 'react-native'
import {fontSizeCoeff} from "../../util/util";

const { width } = Dimensions.get('window')
const margin = 15

const TextBox = props => {
    const { input: { onChange, ...restProps },
        label = '',
        last= false,
        secureTextEntry = false,
        placeholder = '',
        isRequired = false,
        renderIcon,
        meta: { error, touched } } = props
    return (
        <View style={styles.body} >
            <View style={styles.inputContainer} >
                {isRequired && <Text style={[styles.midText, styles.warnColor]}>*</Text>}
                <Text style={[styles.midText, styles.label]}>{label}</Text>
                <TextInput

                    placeholderTextColor='#ccc'
                    placeholder={placeholder}
                    style={[styles.midText, styles.input]}
                    secureTextEntry={secureTextEntry}
                    underlineColorAndroid='transparent'
                    onChangeText={onChange}
                    {...restProps} />
                {renderIcon && renderIcon()}
            </View>
            {touched && (error && <View style={styles.errView}>
                <Text style={[styles.smallText, styles.warnColor]}>{`*${error}`}</Text>
            </View>)}
        </View>
    )

}

const styles = StyleSheet.create({
    body: {
        borderBottomWidth: 0.3,
        borderColor: '#ddd',
        marginLeft: margin,
        paddingRight: margin
    },
    midText: {
        fontSize: 14 * fontSizeCoeff,
        color: '#777'
    },
    smallText: {
        fontSize: 12 * fontSizeCoeff,
        color: '#777'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        textAlignVertical: 'center',
        textAlign: 'right',
        flex: 1,
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0
    },
    label: {
        marginVertical: margin
    },
    labelError: {
        marginTop: margin,
        marginBottom: 0
    },
    warnColor: {
        color: 'red'
    },
    errView: {
        marginBottom: margin
    }
})

export default TextBox
