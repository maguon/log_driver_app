import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Container, Form, Content, Button, ListItem } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { connect } from 'react-redux'
import * as NotificationAction from "../notification/NotificationAction";
// import Markdown from 'react-native-markdown-display';

const copy = `# h1 Heading 8-)

**This is some bold text!**

This is normal text
`;

const Notification = props => {
    const {id,notificationReducer:{data:{notification:{content,created_on,real_name,status,title,updated_on}}}} = props

    return (
        <Container style={globalStyles.container}>
            {/*<Markdown>*/}
            {/*    {copy}*/}
            {/*</Markdown>*/}
                <View style={{ padding: 7.5, margin: 7.5, borderWidth: 0.5, borderColor: '#ddd' }}>
                    <View style={{ padding: 7.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.midText]}>洗车费：00元</Text>
                        <Text style={[globalStyles.midText]}>拖车费：555元</Text>
                    </View>
                    <View style={{ padding: 7.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.midText]}>提车费：0000元</Text>
                        <Text style={[globalStyles.midText]}>地跑费：11111元</Text>
                    </View>

                </View>

        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        notificationReducer: state.notificationReducer,
        loginReducer: state.loginReducer
    }
}
const mapDispatchToProps = (dispatch) => ({
    getNotification: (param) => {
        dispatch(NotificationAction.getNotification(param))
    },
    getNotificationListWaiting: () => {
        dispatch(NotificationAction.getNotificationListWaiting())
    }
})
export default connect(mapStateToProps,mapDispatchToProps)((Notification))

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff'
    },
    button: {
        marginTop: 50,
        marginHorizontal: 10,
        marginBottom: 10
    },
    buttonTitle: {
        color: '#fff'
    }
})
