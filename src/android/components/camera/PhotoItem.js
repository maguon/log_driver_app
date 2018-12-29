import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
import { Icon, Spinner } from 'native-base'
import { connect } from 'react-redux'

const window = Dimensions.get('window')
class PhotoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            spinnerDisplay: true
        }
    }

    static defaultProps = {
        containerSytle: { marginLeft: 10, marginRight: 5, marginTop: 10 },
        width: (window.width - 30) / 2,
        title: '身份证',
        type: 0,
        onShowPhoto: () => { }
    }

    render() {
        const { communicationSettingReducer: { data: { file_host } } } = this.props
        return (
            <TouchableOpacity onPress={this.props.onShowPhoto}>
                <View style={{ width: this.props.width, height: this.props.width / 16 * 9, justifyContent: 'center', alignItems: 'center', ...this.props.containerSytle }}>
                    <Image source={{ uri: `${file_host}/image/${this.props.uri}` }}
                        style={{ width: this.props.width, height: this.props.width / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }}
                        onLoadStart={() => { this.setState({ spinnerDisplay: true }) }}
                        onLoadEnd={() => { this.setState({ spinnerDisplay: false }) }} />
                    <Spinner color='#00cade' animating={this.state.spinnerDisplay} style={{ position: 'absolute' }} />
                    {this.props.type == 1 && !this.state.spinnerDisplay && <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: this.props.width, position: 'absolute', bottom: 0 }}>
                        <Text style={{ textAlign: 'center', fontSize: 10, paddingVertical: 4, color: '#fff' }}>{this.props.title}</Text>
                    </View>}
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        communicationSettingReducer: state.communicationSettingReducer
    }
}


export default connect(mapStateToProps)(PhotoItem)