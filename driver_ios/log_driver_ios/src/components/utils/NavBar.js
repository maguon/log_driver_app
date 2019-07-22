import React from 'react'
import {View, StatusBar, StyleSheet, Dimensions, Platform,PixelRatio} from 'react-native'
import { Header, Title, Right, Left, Body } from 'native-base'
import globalStyles from './GlobalStyles'

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */

export function ifIphoneX(iphoneXStyle, iosStyle, androidStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) return androidStyle;
        return iosStyle
    }
}


const NavBar = props => {
    const { title, RightButton, LeftButton, parent, initParam, layout: { initWidth } } = props
    return (
        <View style={ { width: initWidth}}>
            <StatusBar hidden={false} />
            <Header
                style={[styles.header, globalStyles.styleBackgroundColor]}>
                {LeftButton && <Left style={{ flex: 1 }}>
                    <LeftButton parent={parent} />
                </Left>}
                {title && <Body style={styles.body}>
                <Title style={[globalStyles.xlText, { color: '#fff'}]}>{title}</Title>
                </Body>}

                <Right style={{ flex:1}}>
                    {RightButton && <RightButton parent={parent} initParam={initParam} />}
                </Right>
            </Header>
        </View>
    )

}


const styles = StyleSheet.create({
    iphoneXStyle: {
        flex: 1,
        position: 'absolute',
        top: 10,
        backgroundColor: '#fff'
    },
    iosStyle:{
        flex: 1,
        position: 'absolute',
        top: 0,
        backgroundColor: '#fff'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 4,
    }
})

export default NavBar
