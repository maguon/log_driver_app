import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    Image
} from 'react-native'
import {  Icon } from 'native-base'
import { file_host } from '../../../config/Host'

const window = Dimensions.get('window')
export default class PhotoItem extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        containerSytle: { marginLeft: 10, marginRight: 5, marginTop: 10 },
        width: (window.width - 30) / 2,
        title: '身份证',
        onShowPhoto: () => { }
    }

    render() {
        return (
            <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.props.onShowPhoto}>
                <View style={{ width: this.props.width, height: this.props.width / 16 * 9, ...this.props.containerSytle }}>
                    <Image source={{ uri: `${file_host}/image/59ae3181100f67405a123813` }} style={{ width: this.props.width, height: this.props.width / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: this.props.width, position: 'absolute', bottom: 0 }}>
                        <Text style={{ textAlign: 'center', fontSize: 10, paddingVertical: 4, color: '#fff' }}>{this.props.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}