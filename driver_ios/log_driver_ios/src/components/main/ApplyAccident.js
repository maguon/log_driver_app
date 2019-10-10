import React from 'react'
import {
    StyleSheet,
    Dimensions
} from 'react-native'
import { Container, Content } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import Select from '../modules/Select'
import RichTextBox from '../modules/RichTextBox'
import DisposableList from '../modules/DisposableList'
import DatePickerStart from '../utils/DatePickerStart'
import * as actions from '../../actions/index'
import { required } from '../../util/Validator'
import * as routerDirection from '../../util/RouterDirection'



const margin = 15
const { width } = Dimensions.get('window')

const validateRequired = required('必选')

const ApplyAccident = props => {
    const {
        getAccidentTypeWaiting,
        getAccidentType,
        getCityRouteList,
        getCityRouteListWaiting,
        routeName,parent } = props

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
                               onSelect
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
                               onSelect
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
                       component={DatePickerStart} />
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
            Action: state.accidentTypeReducer.getAccidentType,
            data: {
                list: state.accidentTypeReducer.data.typeList
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
    form: 'applyAccidentForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(actions.applyAccidentAction.applyAccident(values))
    }
})(ApplyAccident))

