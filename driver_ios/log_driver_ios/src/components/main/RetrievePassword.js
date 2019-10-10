import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {Container, Button} from 'native-base'
import {Field, getFormValues, reduxForm} from 'redux-form'
import TextBox from "../utils/TextBox";
import * as actions from '../../actions/index'
import {Actions} from "react-native-router-flux";
import globalStyles from '../utils/GlobalStyles'
import { required } from '../../util/Validator'
import RetrievePasswordVCode from './RetrievePasswordVCode'

const requiredValidator = required('必填')

const RetrievePassword = props => {
    const {formValues = {}, handleSubmit} = props
    return (
        <Container style={{flex: 1, justifyContent: 'space-between'}}>
            <View  >

                <Field
                    name='server'
                    label='服务器'
                    validate={[requiredValidator]}
                    isRequired={true}
                    component={TextBox}
                />

                <View style={{flexDirection: 'row'}}>

                    <View style={{flex: 5}}>
                        <Field
                            name='mobileNo'
                            label='手机号'
                            validate={[requiredValidator]}
                            isRequired={true}
                            component={TextBox}/>
                    </View>
                    <View style={{flex: 3}}>
                        <RetrievePasswordVCode mobileNo={formValues.mobileNo} server={formValues.server} />
                    </View>
                </View>

                <Field
                    name='vCode'
                    label='验证码'
                    validate={[requiredValidator]}
                    isRequired={true}
                    component={TextBox}/>
                <Field
                    name='newPassword'
                    label='新密码'
                    validate={[requiredValidator]}
                    isRequired={true}
                    component={TextBox}/>
                <Field
                    name='confirmPassword'
                    label='确认密码'
                    validate={[requiredValidator]}
                    isRequired={true}
                    component={TextBox}/>

            </View>


            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 7.5}}>
                <Button
                    full
                    style={[globalStyles.styleBackgroundColor, {margin: 7.5, flex: 1}]}
                    onPress={handleSubmit}>
                    <Text style={{color: '#fff'}}>确认</Text>
                </Button>
                <Button
                    full
                    style={[globalStyles.styleBackgroundColor, {margin: 7.5, flex: 1}]}
                    onPress={Actions.pop}>
                    <Text style={{color: '#fff'}}>返回</Text>
                </Button>
            </View>

        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        retrievePasswordReducer: state.retrievePasswordReducer,
        formValues: getFormValues('RetrievePasswordForm')(state),
        initialValues: {
            server: state.communicationSettingReducer.data.host
        }
    }
}


export default connect(mapStateToProps)(
    reduxForm({
        form: 'RetrievePasswordForm',
        onSubmit: (values, dispatch) => {
            dispatch(actions.retrievePasswordAction.retrieve(values))
        }
    })(RetrievePassword))

