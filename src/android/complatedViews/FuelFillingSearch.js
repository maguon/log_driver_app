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
    console.log('props',props)
    return (
        <Container>
            <Content>
                {/* <Field name='createdOnStart'
                    label='加油时间（始）'
                    component={DatePicker} />
                <Field name='createdOnEnd'
                    label='加油时间（终）'
                    component={DatePicker} /> */}
                <Field name='oilDateStart'
                    label='创建时间（始）'
                    component={DatePicker} />
                <Field name='oilDateEnd'
                    label='创建时间（终）'
                    component={DatePicker} />
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
    console.log('ownProps',ownProps)
    const { initParam: {
        oilDateStart, oilDateEnd } } = ownProps
    return {
        initialValues: {
            oilDateStart,
            oilDateEnd
        }
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'fuelFillingSearch',
    onSubmit: (values, dispatch) => {
        dispatch(FuelFillingRecordAction.getFuelFillingRecordWaiting())
        Actions.pop()
        InteractionManager.runAfterInteractions(() => dispatch(FuelFillingRecordAction.getFuelFillingRecord({
            oilDateStart: values.oilDateStart,
            oilDateEnd: values.oilDateEnd,
        })))

    }
})(FuelFillingSearch))