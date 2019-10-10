import React, { Component } from 'react'
import {
    View,
    Text,
    Vibration,
    InteractionManager,
    Animated,
    StyleSheet,
    Easing,
    } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import { change } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import * as actions from '../../actions/index'



class VinScanner extends Component {

    constructor(props) {
        super(props)
        // this.barcodeReceived = this.barcodeReceived.bind(this)
        this.state = {
            barcodeStatus: true,
             moveAnim: new Animated.Value(0)
        }
    }




    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -200,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };

    barcodeReceived=(e) =>{
        // console.log("========================="+JSON.stringify(e))
        if (this.state.barcodeStatus) {
            this.setState({barcodeStatus: false}, () => {
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
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onBarCodeRead={this.barcodeReceived}
                >
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}/>
                        <Animated.View style={[
                        styles.border,
                        {transform: [{translateY: this.state.moveAnim}]}]}/>
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>
                </RNCamera>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00',
    }
 });

const mapDispatchToProps = (dispatch) => ({
    changeSearchCarForm: (param) => {
        dispatch(change('searchCarForm', 'vin', param))
    },
    getCarList: () => {
        dispatch(actions.searchCarAction.getCarList())
    },
    getCarListWaiting: () => {
        dispatch(actions.searchCarAction.getCarListWaiting())
    }
})

export default connect(null, mapDispatchToProps)(VinScanner)


