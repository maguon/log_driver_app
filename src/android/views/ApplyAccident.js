import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native'
import { Container, Content } from 'native-base'
import { Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles from '../GlobalStyles'
import Select from '../components/share/Select'
import RichTextBox from '../components/share/RichTextBox'
import { reduxForm, Field } from 'redux-form'

const margin = 15
const { width } = Dimensions.get('window')
const ApplyAccident = props => {
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <Field name='address' label='事故地点：' component={Select} />
                <View style={styles.body}>
                    <View style={styles.item}>
                        <Text style={[globalStyles.midText, {}]} >调度任务：大连->长春（112321）</Text>
                    </View>
                </View>
                <Field name='accidentExplain' label='事故描述：' component={RichTextBox} />
            </Content>
        </Container>
    )
}

export default reduxForm({
    form: 'applyAccidentForm',
    onSubmit: (values, dispatch, props) => {
        console.log('onSubmit')
    }
})(ApplyAccident)


const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: margin,
        paddingVertical: margin,
        paddingRight: margin,
        borderBottomWidth: 0.3,
        borderColor: '#ccc'
    },
    item: {
        width: width - margin * 2,
        borderBottomWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errView: {
        marginTop: margin
    }
})