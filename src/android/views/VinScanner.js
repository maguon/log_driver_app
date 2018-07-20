import React, { Component } from 'react'
import { Vibration, InteractionManager } from 'react-native'
import BarcodeScanner from 'react-native-barcodescanner'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import Orientation from 'react-native-orientation'
import { change } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import * as searchCarAction from '../views/select/searchCar/SearchCarAction'

class VinScanner extends Component {
    constructor(props) {
        super(props)
        this.barcodeReceived = this.barcodeReceived.bind(this)
        this.state = {
            barcodeStatus: true
        }
    }

    componentDidMount() {
        Orientation.lockToLandscape()
    }

    componentWillUnmount() {
        Orientation.lockToPortrait()
    }

    barcodeReceived(e) {
        if (this.state.barcodeStatus) {
            this.setState({ barcodeStatus: false }, () => {
                Vibration.vibrate()
                this.props.changeSearchCarForm(e.data)
                this.props.getCarListWaiting()
                Actions.pop()
                InteractionManager.runAfterInteractions(() => {
                    this.props.getCarList()
                })
            })
        }
    }

    render() {
        return (
            <Container>
                <BarcodeScanner
                    viewFinderHeight={80}
                    viewFinderWidth={450}
                    onBarCodeRead={this.barcodeReceived}
                    style={{ flex: 1 }}
                    torchMode='back'
                    cameraType='off'
                />
            </Container>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    changeSearchCarForm: (param) => {
        dispatch(change('searchCarForm', 'vin', param))
    },
    getCarList: () => {
        dispatch(searchCarAction.getCarList())
    },
    getCarListWaiting: () => {
        dispatch(searchCarAction.getCarListWaiting())
    }
})

export default connect(null, mapDispatchToProps)(VinScanner)
