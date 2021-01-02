import React from 'react'
import {Text, StyleSheet, View, ScrollView} from 'react-native'
import {Container, Form, Content, Button, ListItem, Spinner} from 'native-base'
import globalStyles, {styleColor} from '../../GlobalStyles'
import {connect} from 'react-redux'
import Markdown from 'react-native-markdown-display';
import moment from 'moment'


const Notification = props => {
    const {id, notificationReducer: {data: {notification},getNotification}} = props

    if (getNotification.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container style={globalStyles.container}>

                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={{height: '100%'}}
                >
                    <View style={{padding: 8, margin: 8}}>
                        <View style={styles.title}>
                            <Text style={{
                                fontSize: 20,
                                color: '#777'
                            }}>{notification.title ? `${notification.title}` : ''}</Text>
                        </View>
                        <Markdown>
                            {notification.content}
                        </Markdown>
                        <View style={styles.fotter}>
                            <Text
                                style={[globalStyles.midText]}>作者：{notification.real_name ? `${notification.real_name}` : ''}</Text>
                            <Text
                                style={[globalStyles.midText]}>发布时间：{notification.created_on ? `${moment(notification.created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        notificationReducer: state.notificationReducer,
    }
}

export default connect(mapStateToProps)(Notification)

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 5,
        marginBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 0.3,
        borderColor: '#ddd'
    },
    fotter: {
        paddingBottom: 10,
        paddingTop: 10,
        marginTop: 20,
        paddingHorizontal: 5,
        borderTopWidth: 0.3,
        borderColor: '#ddd'
    },
})
