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
import DisposableList from '../views/select/DisposableList'
import { Actions } from 'react-native-router-flux'

const margin = 15
const { width } = Dimensions.get('window')
const ApplyAccident = props => {
    const { parent,
        getAccidentTypeWaiting,
        getAccidentType,
        getCityRouteList,
        getCityRouteListWaiting } = props

    console.log('state', props.state)
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <Field name='dpRouteTask'
                    label='调度任务：'
                    component={Select}
                    getList={getCityRouteList}
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
        state
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
        console.log('onSubmit')
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