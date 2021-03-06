import React from 'react'
import {
    View,
    Dimensions
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { connect } from 'react-redux'
import { Container } from 'native-base'
//0.0.4
const { width } = Dimensions.get('window')
const DriverQRCode = props => {
     const { loginReducer: { data: { user: { uid ,driveId} } } } = props
    // console.log("props",props)
    return (
        <Container style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#2b2b2b' }}>
            <View style={{ backgroundColor: '#fff', padding: 30, borderRadius: 10 }}>
                <QRCode
                    value={JSON.stringify({ userId:uid,driverId:driveId})}
                    size={width - 100}
                    bgColor='#000'
                    fgColor='#FFF'
                />
            </View>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer
    }
}

export default connect(mapStateToProps)(DriverQRCode)
