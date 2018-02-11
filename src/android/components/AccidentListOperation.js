import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Spinner, Icon, } from 'native-base'
import { submit } from 'redux-form'
import { reduxForm, Field } from 'redux-form'
import DatePicker from './share/DatePicker'



const { width } = Dimensions.get('window')

class AccidentListOperation extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false };
        this.setModalVisible = this.setModalVisible.bind(this)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button transparent onPress={() => this.setModalVisible(true)}>
                    <Icon name='md-search' color='#fff' />
                </Button>
                <Button transparent onPress={Actions.applyAccident}>
                    <Icon name='md-add' color='#fff' />
                </Button>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 3 }}>
                            <Field name='accidentDateStart'
                                label='起始时间：'
                                component={DatePicker}
                                itemStyle={{ width: width - 90 }} />
                            <Field name='accidentDateEnd'
                                last={true}
                                label='终止时间：'
                                component={DatePicker}
                                itemStyle={{ width: width - 90 }}
                            />
                            <TouchableHighlight underlayColor={'rgba(0,202,222,0.2)'}
                                style={{ alignItems: 'center', borderBottomRightRadius: 3, borderBottomLeftRadius: 3, padding: 20 }}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}>
                                <Text >确定</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}


export default reduxForm({
    form: 'AccidentSearchForm',
    onSubmit: (values, dispatch, props) => {
        console.log('onSubmit')
    }
})(AccidentListOperation)
