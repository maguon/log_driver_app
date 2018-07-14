
import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Spinner, Icon, } from 'native-base'
import { submit } from 'redux-form'
import globalStyles, { textColor } from '../GlobalStyles'
import { reduxForm, Field } from 'redux-form'
import DatePicker from './share/DatePicker'
import Select from './share/Select'
import TextBox from './share/TextBox'
import * as demageListAction from '../notUsed/demageList/DemageListAction'
import DisposableList from '../views/select/DisposableList'
import * as selectCarAction from '../../actions/selectCarAction'
import * as demageListOperationAction from '../../actions/DemageListOperationAction'

const { width } = Dimensions.get('window')

const DemageListOperation = props => {
    const { cleanCarList, demageListOperationReducer: { status }, changeStatus,
        getDemageList, getDemageListWaiting } = props
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button transparent onPress={() => changeStatus(true)}>
                <Icon name='md-search' color='#fff' />
            </Button>
            <Button transparent onPress={Actions.applyDemage}>
                <Icon name='md-add' color='#fff' />
            </Button>
            <Modal
                animationType={"none"}
                transparent={true}
                visible={status}
                onRequestClose={() => changeStatus(!status)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 3 }}>
                        <Field name='damageId'
                            label='质损编号：'
                            component={TextBox}
                            itemStyle={{ width: width - 90, marginLeft: 15 }} />
                        <Field
                            itemStyle={{ width: width - 90 }}
                            last={true}
                            label='vin：'
                            name='car'
                            component={Select}
                            getList={() => { }}
                            getListWaiting={() => { }}
                            showList={({ onSelect }) => {
                                return Actions.listCennectDynamic({
                                    mapStateToProps: vinMapStateToProps,
                                    mapDispatchToProps: vinMapDispatchToProps,
                                    List: DisposableList,
                                    onSelect: (param) => {
                                        cleanCarList()
                                        onSelect(param)
                                    }
                                })
                            }} />
                        <Field name='createdOnStart'
                            label='起始时间：'
                            last={true}
                            component={DatePicker}
                            itemStyle={{ width: width - 90 }} />
                        <Field name='createdOnEnd'
                            last={true}
                            label='终止时间：'
                            component={DatePicker}
                            itemStyle={{ width: width - 90 }}
                        />
                        <TouchableHighlight underlayColor={'rgba(0,202,222,0.2)'}
                            style={{ alignItems: 'center', borderBottomRightRadius: 3, borderBottomLeftRadius: 3, padding: 20 }}
                            onPress={() => {
                                changeStatus(!status)
                                getDemageListWaiting()
                                InteractionManager.runAfterInteractions(getDemageList)
                            }}>
                            <Text >确定</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const vinMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectCarReducer.getCarList,
            //MoreAction: state.selectCarReducer.getCarListMore,
            data: {
                list: state.selectCarReducer.data.carList.map(item => {
                    return {
                        id: item.id,
                        value: item.vin
                    }
                })
            }
        }
    }
}

const vinMapDispatchToProps = (dispatch) => ({
    // getListMore: () => {
    //     dispatch(selectCarAction.getCarListMore())
    // }
})



const mapStateToProps = (state) => {
    return {
        demageListOperationReducer: state.demageListOperationReducer,
        initialValues: {
            car: {}
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getDemageList: () => {
        dispatch(demageListAction.getDemageList())
    },
    getDemageListWaiting: () => {
        dispatch(demageListAction.getDemageListWaiting())
    },
    cleanCarList: () => {
        dispatch(selectCarAction.cleanCarList())
    },
    changeStatus: (status) => {
        dispatch(demageListOperationAction.changeStatus(status))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'demageSearchForm'
    })(DemageListOperation)
)