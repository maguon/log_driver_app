import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, Linking, ImageBackground, View, Text, Dimensions, StatusBar} from 'react-native'
import {Button} from 'native-base'
import Spinkit from 'react-native-spinkit'
import {Actions} from 'react-native-router-flux'
import * as action from '../../actions/index'
import Login from "./Login";

const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.width / 9 * 16


class Initialization extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCommunicationSetting()
    }


    render() {
         const {initializationReducer:{data,initApp,validateVersion}} = this.props
        return (

            <View style={styles.container}>
                {/*<StatusBar hidden={true}/>*/}
                <ImageBackground source={require('../../images/init_back.png')} style={styles.image}>
                    {initApp.isResultStatus == 1 && <Spinkit type={'Wave'}
                                                             color='rgba(255,255,255,0.5)'
                                                             size={70}
                                                             style={{ marginBottom: 50, alignSelf: 'center' }}
                                                             isVisible={initApp.isResultStatus == 1} />}
                    <Button block style={styles.button} onPress={() => Actions.Login()}>
                        <Text style={styles.buttonText}>重新获取版本号</Text>
                    </Button>


                    <Button block style={styles.button} onPress={() => Actions.homeBlock()}>
                        <Text style={styles.buttonText}>立即更新</Text>
                    </Button>


                    <Button block style={styles.button} onPress={() => Actions.Login()}>
                        <Text style={styles.buttonText}>重新获得deviceToken</Text>
                    </Button>

                </ImageBackground>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: ImageWidth,
        height: ImageHeight,
        justifyContent: "flex-end"
    },
    buttonText: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.4)'
    },
    button: {
        marginBottom: 30,
        width: window.width / 4 * 3,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 25,
        alignSelf: 'center'
    }
})
const mapStateToProps = (state) => {
    return {
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    // initPush: () => {
    //     dispatch(action.InitializationAction.initPush())
    // },
    getCommunicationSetting: () => {
        // dispatch(action.InitializationAction.validateVersion())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Initialization)
