import React from 'react'
import { Container, Content, Button } from 'native-base'
import { Text, InteractionManager } from 'react-native'
import { reduxForm, Field } from 'redux-form'
import { CheckBox, DatePicker, TextBox } from '../complatedComponents/share/form/between'
import * as actions from '../../actions'
import globalStyles from '../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

const OveruseDieselOilSearch = props => {
    const { handleSubmit } = props
    return (
        <Container>
            <Content>
                {/* <Field name='dpRouteTaskId'
                    label='调度指令'
                    component={TextBox} /> */}
                <Field
                    label='结算状态'
                    name='statStatus'
                    listTitle='结算状态'
                    itemList={[{ id: 1, value: '处理中' }, { id: 2, value: '已处理' }]}
                    component={CheckBox} />
                <Field name='startDate'
                    label='核油时间（始）'
                    component={DatePicker} />
                <Field name='endDate'
                    label='核油时间（终）'
                    component={DatePicker} />
                <Button full style={[globalStyles.styleBackgroundColor, { margin: 15 }]} onPress={handleSubmit}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                </Button>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { overuseDieselOilListReducer: { data: { search } } } = state
    return {
        initialValues: search
    }
}


export default connect(mapStateToProps)(reduxForm({
    form: 'peccancySearchForm',
    onSubmit: (values, dispatch) => {
        dispatch(actions.overuseDieselOilList.getOveruseDieselOilListWaiting())
        Actions.pop()
        InteractionManager.runAfterInteractions(() => dispatch(actions.overuseDieselOilList.getOveruseDieselOilList(values)))
    }
})(OveruseDieselOilSearch))