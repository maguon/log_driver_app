import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Button } from 'native-base'
import globalStyles from '../utils/GlobalStyles'
import { reduxForm, Field } from 'redux-form'
import DisposableList from '../modules/DisposableList'
import Select from '../modules/Select'
import RichTextBox from '../utils/RichTextBox'
import DatePicker from '../utils/DatePicker'
import { required } from '../../util/Validator'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import * as actions from '../../actions/index'


const validateRequired = required('必选')

const AccidentEditor = props => {
    const { getCityRouteList,
        getAccidentTypeWaiting,
        getAccidentType,
        getCityRouteListWaiting,
        accidentInfo: { id, updated_on, accident_status },
        handleSubmit } = props
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerItem}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor, {marginLeft:10}]}>事故编号:{id ? `${id}` : ''}</Text>
                    </View>
                    <View style={styles.headerStatusItem}>
                        <Text style={[globalStyles.smallText,{marginLeft: 10}]}>申报时间：{updated_on ? `${moment(updated_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                        <Text style={[globalStyles.midText, {marginRight: 10,color:'#76b92c'}]}>{accident_status == 1 && '待处理'}{accident_status == 2 && '处理中'}</Text>
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
                                console.log('param'+param)
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
            Action: state.accidentTypeReducer.getAccidentType,
            data: {
                list: state.accidentTypeReducer.data.typeList
            }
        }
    }
}

const accidentTypeMapDispatchToProps = (dispatch) => ({

})

const mapStateToProps = (state, ownProps) => {
    const { accidentInfo: { accident_date, accident_explain, dp_route_task_id, truck_id, truck_num, truck_type,
        city_route_start, city_route_end, lat, lng, address } } = ownProps
    return {
        initialValues: {
            accidentDate: accident_date ? moment(accident_date).format('YYYY-MM-DD') : null,
            accidentExplain: accident_explain,
            accidentType: {
                id: truck_id,
                num: truck_num,
                type: truck_type == 1 ? 0 : 1,
                value: `${truck_type == 1 ? '车头' : '挂车'}(${truck_num})`
            },
            address: {
                lat,
                lng,
                value: address
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
        dispatch(actions.accidentTypeAction.getAccidentTypeWaiting())
    },
    getAccidentType: () => {
        dispatch(actions.accidentTypeAction.getAccidentType())
    },
    getCityRouteList: () => {
        dispatch(actions.cityRouteListAction.getCityRouteList())
    },
    getCityRouteListWaiting: () => {
        dispatch(actions.cityRouteListAction.getCityRouteListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'editorAccidentForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(actions.accidentEditorAction.updateAccident(values, props.accidentInfo.id))
    }
})(AccidentEditor))

const styles = StyleSheet.create({
    header: {
        borderColor: '#777',
        height: 60,
        backgroundColor: '#f2f5f7',
        justifyContent: 'center'
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    headerStatusItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
