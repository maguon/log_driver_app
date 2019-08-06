import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native'
import { Header, Title, Right, Left, Body} from 'native-base'
import globalStyles from '../utils/GlobalStyles'

const { width } = Dimensions.get('window')

const PhotoViewNavBar = props => {
    const { title, RightButton, LeftButton, parent } = props
    return (
        <View style={[styles.container, { width: width }]}>
            <StatusBar hidden={false} />
            <Header
                androidStatusBarColor={'#000'}
                style={[styles.header]}>

                {LeftButton && <Left style={{flex: 1}}>
                    <LeftButton />
                </Left>}

                <Body style={{ flex: 4}}>
                    <Title style={[globalStyles.xlText, { color: '#fff' }]}>{title}</Title>
                </Body>

                {RightButton &&  <Right style={{flex: 1}}>
                <RightButton parent={parent} />
                </Right>}

            </Header>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        backgroundColor: '#000'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },

})

export default PhotoViewNavBar
