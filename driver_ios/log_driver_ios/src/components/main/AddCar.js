import React, { Component } from 'react'
import {
    Text,
    InteractionManager
} from 'react-native'
import { Container, Content, ListItem } from 'native-base'
import Select from '../utils/SelectCar'
import TextBox from '../utils/TextBox'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { required } from '../../util/Validator'
import * as actions from '../../actions/index'


const vinRequiredValidator = required('必选')

class AddCar extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        this.props.cleanCreateCar()
    }

    render() {
        const { parent, createCarFormValues, resetReceive, getBaseAddrListWaiting, getBaseAddrList,
             addCarReducer: { data: { status } } } = this.props
        return (
            <Container>
                <Content>
                    {status == 0 && <Field name='vin' validate={[vinRequiredValidator]} label='vin:' component={TextBox} />}
                    {status == 1 && <ListItem >
                        <Text>vin：{createCarFormValues.vin}</Text>
                    </ListItem>}
                    <Field
                        name='make'
                        label='品牌：'
                        component={Select}
                        onPress={({ onChange }) => {
                            Actions.make({
                                onSelect: (param) => {
                                    const { id, make_name } = param
                                    onChange({ id, value: make_name, item: param })
                                },
                                hasAll: true
                            })
                        }}
                    />
                    <Field name='engineNum' label='发动机号:' component={TextBox} />
                    <Field
                        name='entrust'
                        label='委托方：'
                        component={Select}
                        onPress={({ onChange }) => {
                            Actions.entrust({
                                onSelect: (param) => {
                                    const { id, short_name } = param
                                    onChange({ id, value: short_name, item: param })
                                },
                                hasAll: true
                            })
                        }}
                    />
                    <Field
                        name='routeStart'
                        label='起始城市：'
                        component={Select}
                        onPress={({ onChange }) => {
                            Actions.city({
                                onSelect: (param) => {
                                    const { id, city_name } = param
                                    onChange({ id, value: city_name, item: param })
                                },
                                hasAll: true
                            })
                        }}
                    />
                    <Field
                        name='baseAddr'
                        label='发运地：'
                        component={Select}
                        onPress={({ onChange }) => {
                            getBaseAddrListWaiting()
                            Actions.baseAddrList({
                                onSelect: (param) => {
                                    const { id, city_name } = param
                                    onChange({ id, value: city_name, item: param })
                                },
                                hasAll: true
                            })
                            InteractionManager.runAfterInteractions(()=>getBaseAddrList({cityId: createCarFormValues.routeStart.id}))
                        }}
                    />
                    <Field
                        name='routeEnd'
                        label='目的城市：'
                        component={Select}
                        onPress={({ onChange }) => {
                            Actions.city({
                                onSelect: (param) => {
                                    const { id, city_name } = param
                                    if (createCarFormValues.receive.item && id && createCarFormValues.receive.item.city_id != id) {
                                        resetReceive()
                                    }
                                    onChange({ id, value: city_name, item: param })
                                },
                                hasAll: true
                            })
                        }}
                    />
                    <Field
                        name='receive'
                        label='经销商：'
                        component={Select}
                        onPress={({ onChange }) => {
                            Actions.receive({
                                onSelect: (param) => {
                                    const { id, short_name } = param
                                    onChange({ id, value: short_name, item: param })
                                },
                                hasAll: true,
                                cityId: createCarFormValues.routeEnd.id
                            })
                        }}
                    />
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        createCarFormValues: getFormValues('createCarForm')(state),
        addCarReducer: state.addCarReducer,
        initialValues: {
            vin: '',
            make: { id: null, value: '全部' },
            routeStart: { id: null, value: '全部' },
            baseAddr: { id: null, value: '全部' },
            entrust: { id: null, value: '全部' },
            routeEnd: { id: null, value: '全部' },
            receive: { id: null, value: '全部' }
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    resetReceive: () => {
        dispatch(change('createCarForm', 'receive', { id: null, value: '全部' }))
    },
    cleanCreateCar: () => {
        dispatch(actions.addCarAction.cleanCreateCar())
    },
    getBaseAddrListWaiting: () => {
        dispatch(actions.baseAddrListAction.getBaseAddrListWaiting())
    },
    getBaseAddrList: (param) => {
        dispatch(actions.baseAddrListAction.getBaseAddrList(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'createCarForm',
        enableReinitialize: true,
        onSubmit: (values, dispatch, props) => {
            const { parent, onSelect } = props
            dispatch(actions.addCarAction.submit({ values, parent, onSelect }))
        }
    })(AddCar))


