import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    ToastAndroid
} from 'react-native'
import { Button, Container, Content, ListItem } from 'native-base'
import Select from '../../components/provisionalShare/form/Select'
import TextBox from '../../components/provisionalShare/form/TextBox'
import * as RouterDirection from '../../../util/RouterDirection'
import { connect } from 'react-redux'
import * as addCarAction from './AddCarAction'
import { Actions } from 'react-native-router-flux'
import { styleColor } from '../../GlobalStyles'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { required } from '../../../util/Validator'

const vinRequiredValidator = required('必选')

class AddCar extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        this.props.cleanCreateCar()
    }

    render() {
        const { parent, createCarFormValues, resetReceive, addCarReducer: { data: { status } } } = this.props
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
        dispatch(addCarAction.cleanCreateCar())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'createCarForm',
        enableReinitialize: true,
        onSubmit: (values, dispatch, props) => {
            const { parent, onSelect } = props
            dispatch(addCarAction.submit({ values, parent, onSelect }))
        }
    })(AddCar))


