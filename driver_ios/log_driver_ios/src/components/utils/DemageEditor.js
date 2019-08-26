import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Container, Content, Button, ListItem } from 'native-base'
import globalStyles, { textColor, styleColor } from './GlobalStyles'
import moment from 'moment'
import { required } from '../../util/Validator'
import Select from '../modules/Select'
import RichTextBox from './RichTextBox'
import DisposableList from '../modules/DisposableList'
import { Actions } from 'react-native-router-flux'
import * as actions from '../../actions/index'


const validateRequired = required('必选')

const DemageEditor = props => {
    const { getDriverList,
        getDriverListWaiting,
        updateDamage,
        demageEditorReducer: { updateDamage: { isResultStatus } },
        parent,
        applyDamageFormValues = {},
        initParam: { id, created_on, car_id, vin, damage_status } } = props

    const { driver } = applyDamageFormValues
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <View style={[styles.item, styles.header]}>
                    <View style={styles.headerItem}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>质损编号：{id ? `${id}` : ''}</Text>
                        <Text style={globalStyles.smallText}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                    <View style={styles.headerStatusItem}>
                        <Text style={[globalStyles.midText]}>
                            {damage_status == 1 && '未处理'}
                            {damage_status == 2 && '处理中'}
                            {damage_status == 3 && '已处理'}
                        </Text>
                    </View>
                </View>
                <Field
                    label='货车司机：'
                    isRequired={true}
                    name='driver'
                    component={Select}
                    getList={getDriverList}
                    getListWaiting={getDriverListWaiting}
                    validate={[validateRequired]}
                    showList={param => {
                        return Actions.listCennect({
                            mapStateToProps: driverMapStateToProps,
                            mapDispatchToProps: driverMapDispatchToProps,
                            List: DisposableList,
                            title: '选择货车司机',
                            ...param
                        })
                    }} />
                {driver && driver.truck_num && <ListItem >
                    <Text>货车车牌：{driver.truck_num}</Text>
                </ListItem>}
                <Field label='质损描述：' name='damageExplain' component={RichTextBox} />
                <View style={{ margin: 15 }}>
                    {isResultStatus != 1 && <Button full
                        style={[globalStyles.styleBackgroundColor]}
                        onPress={() => updateDamage({
                            damageId: id,
                            carId: car_id,
                            vin
                        })}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>修改</Text>
                    </Button>}
                    {isResultStatus == 1 && <ActivityIndicator color={styleColor} size='large' />}
                </View>
            </Content>
        </Container>
    )
}


const driverMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectDriverReducer.getDriverList,
            data: {
                list: state.selectDriverReducer.data.driverList.map(item => {
                    return { id: item.id, value: item.drive_name, truck_id: item.truck_id, truck_num: item.truck_num }
                })
            }
        },
        filter: getFormValues('SearchForm')(state) ? getFormValues('SearchForm')(state).searchField : undefined
    }
}

const driverMapDispatchToProps = (dispatch) => ({

})


const styles = StyleSheet.create({
    item: {
        margin: 15
    },
    label: {
        marginVertical: 15
    },
    itemSelectContainer: {
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingBottom: 15
    },
    itemSelect: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputArea: {
        height: 200,
        textAlignVertical: 'top',
        borderWidth: 0.3,
        borderColor: '#777'
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    header: {
        paddingVertical: 5,
        borderBottomWidth: 0.3,
        borderColor: '#777'
    },
    headerStatusItem: {
        alignItems: 'flex-end',
        paddingVertical: 5
    }
})

const mapStateToProps = (state, ownProps) => {
    const { initParam: { damage_explain, drive_name, drive_id, truck_id, truck_num } } = ownProps
    return {
        initialValues: {
            damageExplain: damage_explain,
            driver: {
                id: drive_id,
                value: drive_name,
                truck_id,
                truck_num
            }
        },
        demageEditorReducer: state.demageEditorReducer,
        applyDamageFormValues: getFormValues('demageEditorForm')(state)
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverList: () => {
        dispatch(actions.selectDriverAction.getDriverList())
    },
    getDriverListWaiting: () => {
        dispatch(actions.selectDriverAction.getDriverListWaiting())
    },
    updateDamage: (param) => {
        dispatch(actions.demageEditorAction.updateDamage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'demageEditorForm'
    // validate
})(DemageEditor))
