import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions
} from 'react-native'
import QRCode from 'react-native-qrcode'
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window');

class DriverQRCode extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2b2b2b' }}>
                <View style={{ backgroundColor: '#fff', padding: 30, borderRadius: 10 }}>
                    <QRCode
                        value={JSON.stringify({ userId: this.props.userReducer.data.user.userId })}
                        size={width - 100}
                        bgColor='#000'
                        fgColor='#FFF'
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DriverQRCode)