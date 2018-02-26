import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Button } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { reduxForm, Field } from 'redux-form'
import * as selectAccidentTypeAction from '../../../actions/SelectAccidentTypeAction'
import * as cityRouteListAction from '../../../actions/CityRouteListAction'
import * as accidentEditorAction from '../../../actions/AccidentEditorAction'
import DisposableList from '../../views/select/DisposableList'
import Select from '../share/Select'
import RichTextBox from '../share/RichTextBox'
import DatePicker from '../share/DatePicker'
import CheckBox from '../share/CheckBox'
import { requiredObj, required } from '../../../util/Validator'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'

const validateRequired = required('必选')

const AccidentEditor = props => {
    const { parent,
        getCityRouteList,
        getAccidentTypeWaiting,
        getAccidentType,
        getCityRouteListWaiting,
        accidentInfo: { id, updated_on, accident_status },
        handleSubmit } = props
    console.log('props', props)
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerItem}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor, {}]}>事故编号:{id ? `${id}` : ''}</Text>
                        <Text style={globalStyles.smallText}>{updated_on ? `${moment(updated_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                    </View>
                    <View style={styles.headerStatusItem}>
                        <Text style={[globalStyles.midText]}>{accident_status == 1 && '待处理'}{accident_status == 2 && '处理中'}</Text>
                    </View>
                </View>
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
                <Button full style={[globalStyles.styleBackgroundColor, { margin: 15 }]} onPress={handleSubmit}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>修改</Text>
                </Button>
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

const mapStateToProps = (state, ownProps) => {
    const { accidentInfo: { accident_date, accident_explain, dp_route_task_id,truck_id,truck_num,truck_type,
        city_route_start, city_route_end, lat, lng, address } } = ownProps
    return {
        initialValues: {
            accidentDate: accident_date ? moment(accident_date).format('YYYY-MM-DD') : null,
            accidentExplain: accident_explain,
            accidentType:{
                id: truck_id,
                num: truck_num,
                type: truck_type == 1 ? 0 : 1,
                value:`${truck_type == 1?'车头':'挂车'}(${truck_num})`
            },
            address: {
                lat,
                lng,
                value:address
            },
            dpRouteTask: {
                id: dp_route_task_id,
                value: `${city_route_start} --> ${city_route_end} (${dp_route_task_id})`
            }
        },
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
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
    form: 'editorAccidentForm',
    onSubmit: (values, dispatch, props) => {   
        console.log('onSubmit', values)
        dispatch(accidentEditorAction.updateAccident(values,props.accidentInfo.id))
    }
})(AccidentEditor))

const styles = StyleSheet.create({
    header: {
        paddingVertical: 5,
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingHorizontal: 15
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    headerStatusItem: {
        alignItems: 'flex-end',
        paddingVertical: 5
    },
    body: {
        padding: 15
    },
    bodyItem: {
        paddingVertical: 5
    },
    bodyItemTitle: {
        fontWeight: 'bold'
    }
})