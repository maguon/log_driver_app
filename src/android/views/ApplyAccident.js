import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native'
import { Container, Content } from 'native-base'
import { Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles from '../GlobalStyles'
import Select from '../components/share/Select'
import RichTextBox from '../components/share/RichTextBox'
import DatePicker from '../components/share/DatePicker'
import CheckBox from '../components/share/CheckBox'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as selectAccidentTypeAction from '../../actions/SelectAccidentTypeAction'
import * as cityRouteListAction from '../../actions/CityRouteListAction'
import * as applyAccidentAction from '../../actions/ApplyAccidentAction'
import DisposableList from '../views/select/DisposableList'
import { Actions } from 'react-native-router-flux'
import { requiredObj, required } from '../../util/Validator'
import moment from 'moment'

const margin = 15
const { width } = Dimensions.get('window')

const validateRequired = required('必选')

const ApplyAccident = props => {
    const { parent,
        getAccidentTypeWaiting,
        getAccidentType,
        getCityRouteList,
        getCityRouteListWaiting } = props
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <Field name='dpRouteTask'
                    label='调度任务：'
                    isRequired={true}
                    component={Select}
                    getList={getCityRouteList}
                    validate={[validateRequired]}
                    getListWaiting={getCityRouteListWaiting}
                    showList={({ onSelect }) => {
                        return Actions.listCennect({
                            mapStateToProps: routeMapStateToProps,
                            mapDispatchToProps: routeMapDispatchToProps,
                            List: DisposableList,
                            title: '调度任务',
                            onSelect: (param) => {
                                Actions.pop()
                                onSelect(param)
                            }
                        })
                    }} />
                <Field name='accidentType'
                    label='车辆类型：'
                    isRequired={true}
                    component={Select}
                    validate={[validateRequired]}
                    getList={getAccidentType}
                    getListWaiting={getAccidentTypeWaiting}
                    showList={({ onSelect }) => {
                        return Actions.listCennect({
                            mapStateToProps: accidentTypeMapStateToProps,
                            mapDispatchToProps: accidentTypeMapDispatchToProps,
                            List: DisposableList,
                            title: '车辆类型',
                            onSelect: (param) => {
                                Actions.pop()
                                onSelect(param)
                            }
                        })
                    }} />
                <Field name='address'
                    label='事故地点：'
                    isRequired={true}
                    component={Select}
                    validate={[validateRequired]}
                    getList={() => { }}
                    getListWaiting={() => { }}
                    showList={({ onSelect }) => {
                        return Actions.selectAddress({
                            onSelect
                        })
                    }} />
                <Field name='accidentDate'
                    label='发生时间：'
                    component={DatePicker} />
                <Field name='accidentExplain'
                    label='事故描述：'
                    isRequired={true}
                    validate={[validateRequired]}
                    component={RichTextBox} />
            </Content>
        </Container>
    )
}

const routeMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.cityRouteListReducer.getCityRouteList,
            data: {
                list: state.cityRouteListReducer.data.cityRouteList.map(item => {
                    return {
                        id: item.id,
                        value: `${item.city_route_start} --> ${item.city_route_end} (${item.id})`
                    }
                })
            }
        }
    }
}

const routeMapDispatchToProps = (dispatch) => ({

})

const accidentTypeMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectAccidentTypeReducer.getAccidentType,
            data: {
                list: state.selectAccidentTypeReducer.data.typeList
            }
        }
    }
}

const accidentTypeMapDispatchToProps = (dispatch) => ({

})


const mapStateToProps = (state) => {
    return {
        initialValues: {
            accidentDate:moment().format('YYYY-MM-DD')
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAccidentTypeWaiting: () => {
        dispatch(selectAccidentTypeAction.getAccidentTypeWaiting())
    },
    getAccidentType: () => {
        dispatch(selectAccidentTypeAction.getAccidentType())
    },
    getCityRouteList: () => {
        dispatch(cityRouteListAction.getCityRouteList())
    },
    getCityRouteListWaiting: () => {
        dispatch(cityRouteListAction.getCityRouteListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'applyAccidentForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(applyAccidentAction.applyAccident(values))
        console.log('onSubmitvalues',values)
    }
})(ApplyAccident))

const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: margin,
        paddingVertical: margin,
        paddingRight: margin,
        borderBottomWidth: 0.3,
        borderColor: '#ccc'
    },
    item: {
        width: width - margin * 2,
        borderBottomWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errView: {
        marginTop: margin
    }
})