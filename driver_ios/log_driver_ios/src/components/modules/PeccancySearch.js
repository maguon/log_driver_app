import React from 'react'
import { Container, Content, Button } from 'native-base'
import { Text, InteractionManager } from 'react-native'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions/index'
import globalStyles from '../utils/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import CheckBox  from '../utils/CheckBox'
import  DatePicker from '../utils/DatePicker'

const PeccancySearch = props => {
    const { handleSubmit } = props
    return (
        <Container>
            <Content>
                <Field name='startDate'
                    label='起始时间'
                    component={DatePicker} />
                <Field name='endDate'
                    label='终止时间'
                    component={DatePicker} />
                <Button full style={[globalStyles.styleBackgroundColor, { margin: 15 }]} onPress={handleSubmit}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                </Button>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { peccancyListReducer: { data: { search } } } = state
    return {
        initialValues: search
    }
}


export default connect(mapStateToProps)(reduxForm({
    form: 'peccancySearchForm',
    onSubmit: (values, dispatch) => {
        dispatch(actions.peccancyListAction.getPeccancyListWaiting())
        Actions.pop()
        InteractionManager.runAfterInteractions(() => dispatch(actions.peccancyListAction.getPeccancyList(values)))
    }
})(PeccancySearch))
