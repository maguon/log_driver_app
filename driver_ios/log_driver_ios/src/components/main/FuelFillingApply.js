import React, { Component } from 'react'
import {
    Text,
    View,
    InteractionManager
} from 'react-native'
import { Button, Icon, Container, Content, ListItem } from 'native-base'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import fuelFillingTypeList from '../../config/fuelFillingType'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'
import { required, requiredObj, moneyValidator } from '../../util/Validator'
import * as actions from '../../actions/index'
import  DatePicker from '../utils/DatePicker'
import  TimePicker from '../utils/TimePicker'
import  TextBox from '../utils/TextBox'
import  Select from '../utils/Select'
import  CheckBox from '../utils/CheckBox'
import AMapLocation from 'react-native-amap-location'


const requiredValidator = required('必选')
const requiredObjValidator = requiredObj('必选')
const validateMoney = moneyValidator('必须输入8位以内的数字！')

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
                        validate={[requiredValidator, validateMoney]}
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
                            InteractionManager.runAfterInteractions(()=>getCityRouteList({taskStatusArr:'1,2,3,4,9'}))
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
                        validate={[requiredValidator, validateMoney]}
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
        dispatch(actions.fuelFillingApplyAction.createFuelFillingApply(param))
    },
    getCityRouteList: (param) => {
        dispatch(actions.cityRouteListAction.getCityRouteList(param))
    },
    getCityRouteListWaiting: () => {
        dispatch(actions.cityRouteListAction.getCityRouteListWaiting())
    },
    changeAddress: (param) => {
        dispatch(change('fuelFillingApplyForm', 'refuelAddress', { address: param.address, item: param }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'fuelFillingApplyForm',
    onSubmit: (values, dispatch) => {
        dispatch(actions.fuelFillingApplyAction.createFuelFillingApply(values))
    }
})(FuelFillingApply))
