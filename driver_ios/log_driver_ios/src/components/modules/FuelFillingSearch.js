import React from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'
import DatePicker from '../utils/DatePicker'
import { reduxForm, Field } from 'redux-form'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import * as actions from '../../actions/index'


const FuelFillingSearch = props => {
    const { handleSubmit } = props
    // console.log('props',props)
    return (
        <Container>
            <Content>
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
    // console.log('ownProps',ownProps)
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
        dispatch(actions.fuelFillingRecordAction.getFuelFillingRecordWaiting())
        Actions.pop()
        InteractionManager.runAfterInteractions(() => dispatch(actions.fuelFillingRecordAction.getFuelFillingRecord({
            oilDateStart: values.oilDateStart,
            oilDateEnd: values.oilDateEnd,
        })))

    }
})(FuelFillingSearch))
