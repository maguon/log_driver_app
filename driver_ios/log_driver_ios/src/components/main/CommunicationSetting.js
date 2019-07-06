import React, {Component} from 'react'
import { Text } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { Field,reduxForm} from 'redux-form'
import TextBox from '../utils/TextBox'
import * as actions from '../../actions/index'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../utils/GlobalStyles'


const CommunicationSetting = props => {
    const { handleSubmit} = props
    return (
        <Container>
            <Content>
                <Field name='url'
                       label='服务器地址'
                       component={TextBox} />
                <Button full style={{ backgroundColor: styleColor,margin:15 }} onPress={handleSubmit}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>
                        保存
                    </Text>
                </Button>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    const { communicationSettingReducer: { data: { host } } } = state
    console.log('host',host)
    return {
        initialValues: {
            url: host
        }
    }
}

export default connect(mapStateToProps)(
    reduxForm({
    form: 'saveCommunicationSetting',

    onSubmit: (values, dispatch) => {
        dispatch(actions.communicationSettingActions.saveCommunicationSetting(values))
        // dispatch(actions.communicationSetting.getCommunicationSetting())
    }
})(CommunicationSetting))
