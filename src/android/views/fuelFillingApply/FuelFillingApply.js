import React, { Component } from 'react'
import {
    Text,
    View,
    InteractionManager
} from 'react-native'
import { Button, Icon, Container, Content, ListItem } from 'native-base'
import { DatePicker, TimePicker, TextBox, CheckBox, Select } from '../../complatedComponents/share/form/between'
import fuelFillingTypeList from '../../../config/fuelFillingType'
import { Actions } from 'react-native-router-flux'
import AMapLocation from 'react-native-amap-location'
import { connect } from 'react-redux'
import * as fuelFillingApplyAction from './FuelFillingApplyAction'
import * as cityRouteListAction from '../../complatedViews/select/cityRouteList/CityRouteListAction'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { reduxForm, Field, change } from 'redux-form'
import { required, requiredObj } from '../../../util/Validator'

const requiredValidator = required('必选')
const requiredObjValidator = requiredObj('必选')

const Address = props => {
    const { input: { value }, getPosition } = props
    return (
        <ListItem
            onPress={getPosition}>
            <View style={{ flex: 2 }}>
                <Text style={globalStyles.midText}> 定位</Text>
            </View>
            <View style={{ flex: 10, alignItems: 'flex-end' }}>
                <Text style={[globalStyles.midText, { textAlign: 'right' }]}>{value.address ? `${value.address}` : ''}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Icon name='ios-pin' style={{ color: styleColor, fontSize: 16 }} />
            </View>
        </ListItem>
    )
}


class FuelFillingApply extends Component {
    constructor(props) {
        super(props)
        this.getPosition = this.getPosition.bind(this)
    }

    componentDidMount() {
        this.getPosition()
    }

    getPosition() {
        let listener = AMapLocation.addEventListener((data) => {
            this.props.changeAddress(data)
            AMapLocation.stopLocation()
            listener.remove()
        })
        AMapLocation.startLocation({
            accuracy: 'HighAccuracy',
            killProcess: true,
            needDetail: true,
        })
    }

    render() {
        const { getCityRouteListWaiting, getCityRouteList, handleSubmit } = this.props
        return (
            <Container>
                <Content>
                    <Field name='refuelDate'
                        validate={[requiredValidator]}
                        isRequired={true}
                        label='加油日期'
                        component={DatePicker} />
                    <Field name='refuelTime'
                        validate={[requiredValidator]}
                        isRequired={true}
                        label='加油时间'
                        component={TimePicker} />
                    <Field name='refuelVolume'
                        validate={[requiredValidator]}
                        label='加油量'
                        isRequired={true}
                        component={TextBox} />
                    <Field
                        name='dpRouteTask'
                        label='指令编号'
                        component={Select}
                        onPress={({ onChange }) => {
                            getCityRouteListWaiting()
                            Actions.cityRouteList({
                                onSelect: (param) => {
                                    const { id, city_route_start, city_route_end } = param
                                    onChange({ id, value: `${id}  ( ${city_route_start} --> ${city_route_end} )`, item: param })
                                }
                            })
                            InteractionManager.runAfterInteractions(getCityRouteList)
                        }}
                    />
                    <Field name='refuelAddress' component={Address} getPosition={this.getPosition} />
                    <Field
                        isRequired={true}
                        label='加油地类型'
                        validate={[requiredObjValidator]}
                        name='refuelAddressType'
                        listTitle='加油地类型'
                        itemList={[{ id: null, value: '全部' }, ...fuelFillingTypeList]}
                        component={CheckBox} />
                    <Field name='refuelMoney'
                        validate={[requiredValidator]}
                        label='加油金额'
                        isRequired={true}
                        component={TextBox} />
                    <Button full onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15 }]}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        fuelFillingApplyReducer: state.fuelFillingApplyReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    createFuelFillingApply: (param) => {
        dispatch(fuelFillingApplyAction.createFuelFillingApply(param))
    },
    resetCreateFuelFillingApply: () => {
        dispatch(fuelFillingApplyAction.resetCreateFuelFillingApply())
    },
    getCityRouteList: () => {
        dispatch(cityRouteListAction.getCityRouteList())
    },
    getCityRouteListWaiting: () => {
        dispatch(cityRouteListAction.getCityRouteListWaiting())
    },
    changeAddress: (param) => {
        dispatch(change('fuelFillingApplyForm', 'refuelAddress', { address: param.address, item: param }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'fuelFillingApplyForm',
    onSubmit: (values, dispatch) => {
        console.log('onSubmit')
        console.log('values', values)
        dispatch(fuelFillingApplyAction.createFuelFillingApply(values))
    }
})(FuelFillingApply))