import React from 'react'
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native'
import { Header, Title, Right, Left, Body } from 'native-base'
import globalStyles, { styleColor } from '../utils/GlobalStyles'

const { width } = Dimensions.get('window')

const NavBar = props => {
    const { title, RightButton, LeftButton, parent, initParam, layout: { initWidth } } = props
    console.log("我的心在等待"+props.title)
    return (
        <View style={[styles.container, { width: initWidth }]}>
            <StatusBar hidden={false} />
            <Header
                style={[styles.header, globalStyles.styleBackgroundColor]}>
                {LeftButton && <Left style={{ flex: 1 }}>
                    <LeftButton parent={parent} />
                </Left>}
                {title && <Body style={styles.body}>
                    <Title style={[globalStyles.xlText, { color: '#fff' }]}>{title}</Title>
                </Body>}

                <Right style={{ flex: title ? 2 : 1 }}>
                    {RightButton && <RightButton parent={parent} initParam={initParam} />}
                </Right>
            </Header>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
        flex: 4
    }
})

export default NavBar
