import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { reduxForm, Field } from 'redux-form'
import RichTextBox from '../share/RichTextBox'

const AccidentEditor = props => {
    return (
        <Container>
            <Content>
                <View style={styles.header}>
                    <View style={styles.headerItem}>
                        <Text style={[globalStyles.largeText, globalStyles.styleColor, {}]}>No.:1234454654</Text>
                        <Text style={globalStyles.smallText}>2017-05-12 11:30</Text>
                    </View>
                    <View style={styles.headerStatusItem}>
                        <Text style={[globalStyles.midText]}>未处理</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.bodyItem}>
                        <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>事故地点：</Text>大连市开发区瑞港库</Text>
                    </View>
                    <View style={styles.bodyItem}>
                        <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>发生时间：</Text>2017-05-12 11:30</Text>
                    </View>
                    <View style={styles.bodyItem}>
                        <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>调度任务：</Text>大连->长春（123123）</Text>
                    </View>
                    <Field name='accidentExplain'
                        label='事故描述：'
                        component={RichTextBox}
                        labelStyle={styles.bodyItemTitle}
                        containerStyle={{
                            marginLeft: 0,
                            paddingVertical: 5,
                            paddingRight: 0
                        }} />
                </View>
            </Content>
        </Container>
    )
}


export default reduxForm({
    form: 'editorAccidentForm',
    onSubmit: (values, dispatch, props) => {
        console.log('onSubmit')
    }
})(AccidentEditor)

const styles = StyleSheet.create({
    header: {
        paddingVertical: 5,
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingHorizontal: 15
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    headerStatusItem: {
        alignItems: 'flex-end',
        paddingVertical: 5
    },
    body: {
        padding: 15
    },
    bodyItem: {
        paddingVertical: 5
    },
    bodyItemTitle: {
        fontWeight: 'bold'
    }
})
