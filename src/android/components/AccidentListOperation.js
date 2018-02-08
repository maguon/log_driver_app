import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Modal,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Spinner, Icon } from 'native-base'
import { submit } from 'redux-form'

export default class AccidentListOperation extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false };
        this.setModalVisible=this.setModalVisible.bind(this)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button transparent onPress={() => Alert.alert()}>
                    <Icon name='md-search' color='#fff' />
                </Button>
                <Button transparent onPress={() => { }}>
                    <Icon name='md-add' color='#fff' />
                </Button>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}