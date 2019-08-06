import React, { Component } from 'react'
import {
    Text,
    View,
    Modal,
    TouchableHighlight,
    Dimensions,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Icon, } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import DatePicker from '../utils/DatePicker'
import * as actions from '../../actions/index'
import globalStyles from '../utils/GlobalStyles'

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
                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
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
                                    InteractionManager.runAfterInteractions(this.props.getAccidentList)
                                }}>
                                <Text style={globalStyles.midText}>确定</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAccidentList: () => {
        dispatch(actions.accidentListAction.getAccidentList())
    },
    getAccidentListWaiting: () => {
        dispatch(actions.accidentListAction.getAccidentListWaiting())
    }
})

export default connect(null, mapDispatchToProps)(
    reduxForm({
        form: 'accidentSearchForm'
    })(AccidentListOperation)
)
