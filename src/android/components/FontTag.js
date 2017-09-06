import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'

const FontTag = ({ size, color, title, fontColor }) => {
    let width = size
    let height = size
    let borderRadius = size / 2
    let fontSize = size / 8 * 5
    return (
        <View style={{ width, height, borderRadius, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
            <Text includeFontPadding={false} style={{color: fontColor, fontFamily: 'rubicon-icon-font', fontSize}}>{title}</Text>
        </View>
    )
}

export default FontTag