import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import DatePicker from '../components/share/DatePicker'
import CheckBox from '../components/share/form/CheckBox'
import globalStyles from '../GlobalStyles'

const SearchTaskLoan = props => {
    return (
        <View>
            <Field
                label='申请时间(始)：'
                name='applyDateStart'
                component={DatePicker}
            />
            <Field
                label='申请时间(终)：'
                name='applyDateEnd'
                component={DatePicker}
            />
            <Field
                label='领取状态：'
                name='taskLoanStatusArr'
                listTitle='领取状态'
                itemList={[{ id: '2', value: '已领取' }, { id: '3', value: '已报销' }, { id: null, value: '全部' }]}
                component={CheckBox} />
        </View>
    )
}

export default reduxForm({
    form: 'searchTaskLoanForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    onSubmit: (values, dispatch, props) => {

    }
})(SearchTaskLoan)


