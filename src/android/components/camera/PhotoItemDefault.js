import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions
} from 'react-native'


const window = Dimensions.get('window')

export default class PhotoItemDefault extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        containerSytle: { marginLeft: 10, marginRight: 5, marginTop: 10 },
        width: (window.width - 30) / 2,
        title: '身份证',
    }

    render() {
        return (
            <View style={{ width: this.props.width, height: this.props.width / 16 * 9, justifyContent: 'center', alignItems: 'center', borderColor: '#e4e4e4', borderWidth: 1, ...this.props.containerSytle }}>
                <View >
                    <Text>暂无图片</Text>
                </View>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: this.props.width, position: 'absolute', bottom: 0 }}>
                    <Text style={{ textAlign: 'center', fontSize: 10, paddingVertical: 4, color: '#fff' }}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}
