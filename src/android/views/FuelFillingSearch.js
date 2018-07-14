import React from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { Container, Content, Button } from 'native-base'
import fuelFillingTypeList from '../../config/fuelFillingType'
import fuelFillingCheckStatusList from '../../config/fuelFillingCheckStatus'
import * as FuelFillingRecordAction from './fuelFillingRecord/FuelFillingRecordAction'
import { connect } from 'react-redux'
import DatePicker from '../complatedComponents/share/form/between/DatePicker'
import CheckBox from '../complatedComponents/share/form/between/CheckBox'
import { reduxForm, Field } from 'redux-form'
import globalStyles, { styleColor } from '../GlobalStyles'
import { Actions } from 'react-native-router-flux'

const FuelFillingSearch = props => {
    const { handleSubmit } = props
    return (
        <Container>
            <Content>
                <Field name='refuelDateStart'
                    label='起始时间'
                    component={DatePicker} />
                <Field name='refuelDateEnd'
                    label='终止时间'
                    component={DatePicker} />
                <Field
                    label='加油地类型'
                    name='refuelAddressType'
                    listTitle='加油地类型'
                    itemList={[{ id: null, value: '全部' }, ...fuelFillingTypeList]}
                    component={CheckBox} />
                <Field
                    label='审核结果'
                    name='checkStatus'
                    listTitle='审核结果'
                    itemList={[{ id: null, value: '全部' }, ...fuelFillingCheckStatusList]}
                    component={CheckBox} />
                <View style={{ paddingHorizontal: 15, paddingTop: 40 }}>
                    <Button onPress={handleSubmit} full style={{ backgroundColor: styleColor }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>搜索</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { initParam: {
        refuelDateStart,
        refuelDateEnd,
        refuelAddressType,
        checkStatus } } = ownProps
    return {
        initialValues: {
            refuelDateStart,
            refuelDateEnd,
            refuelAddressType: refuelAddressType ? fuelFillingTypeList.find(item => item.id == refuelAddressType) : { id: null, value: '全部' },
            checkStatus: checkStatus ? fuelFillingCheckStatusList.find(item => item.id == checkStatus) : { id: null, value: '全部' }
        }
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'fuelFillingSearch',
    onSubmit: (values, dispatch) => {
        dispatch(FuelFillingRecordAction.getFuelFillingRecordWaiting())
        Actions.pop()
        InteractionManager.runAfterInteractions(() => dispatch(FuelFillingRecordAction.getFuelFillingRecord({
            refuelDateStart: values.refuelDateStart,
            refuelDateEnd: values.refuelDateEnd,
            checkStatus: values.checkStatus.id,
            refuelAddressType: values.refuelAddressType.id,
        })))

    }
})(FuelFillingSearch))