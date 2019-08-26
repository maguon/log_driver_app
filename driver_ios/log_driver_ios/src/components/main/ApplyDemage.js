import React from 'react'
import {
    StyleSheet,
    Text,
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Container, Content, ListItem } from 'native-base'
import globalStyles, { textColor } from '../utils/GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { required } from '../../util/Validator'
import Select from '../modules/Select'
import RichTextBox from '../utils/RichTextBox'
import DisposableList from '../modules/DisposableList'
import * as actions from '../../actions/index'


const validateRequired = required('必选')

const ApplyDamage = props => {
    const {
        getDriverList,
        getDriverListWaiting,
        cleanCarList,
        applyDamageFormValues = {},
    } = props
    const { car, driver } = applyDamageFormValues
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <Field
                    textStyle={[globalStyles.largeText, globalStyles.styleColor]}
                    label='vin：'
                    isRequired={true}
                    name='car'
                    component={Select}
                    getList={() => { }}
                    validate={[validateRequired]}
                    getListWaiting={() => { }}
                    showList={({ onSelect }) => {
                        return Actions.listCennectDynamic({
                            mapStateToProps: vinMapStateToProps,
                            mapDispatchToProps: vinMapDispatchToProps,
                            List: DisposableList,
                            onSelect: (param) => {
                                cleanCarList()
                                onSelect(param)
                            }
                        })
                    }} />
                {car && car.make_name && <ListItem>
                    <Text>品牌：{car.make_name}</Text>
                </ListItem>}
                {car && car.re_short_name && <ListItem>
                    <Text>经销商：{car.re_short_name}</Text>
                </ListItem>}
                {car && car.en_short_name && <ListItem>
                    <Text>委托方：{car.en_short_name}</Text>
                </ListItem>}
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
            </Content>
        </Container >
    )
}


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
    }
})


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



const vinMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectCarReducer.getCarList,
            //MoreAction: state.selectCarReducer.getCarListMore,
            data: {
                list: state.selectCarReducer.data.carList.map(item => {
                    return {
                        id: item.id,
                        value: item.vin,
                        make_name: item.make_name,
                        en_short_name: item.en_short_name,
                        re_short_name: item.re_short_name
                    }
                })
            }
        }
    }
}

const vinMapDispatchToProps = (dispatch) => ({

})

const mapStateToProps = (state) => {
    return {
        applyDamageFormValues: getFormValues('applyDemageForm')(state),
        formReducer: state.form
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverList: () => {
        dispatch(actions.selectDriverAction.getDriverList())
    },
    getDriverListWaiting: () => {
        dispatch(actions.selectDriverAction.getDriverListWaiting())
    },
    getCarList: () => {
        dispatch(actions.selectCarAction.getCarList())
    },
    getCarListWaiting: () => {
        dispatch(actions.selectCarAction.getCarListWaiting())
    },
    cleanCarList: () => {
        dispatch(actions.selectCarAction.cleanCarList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'applyDemageForm',
        onSubmit: (values, dispatch, props) => {
            dispatch(actions.applyDamageAction.createDamage(props.parent, values))
        }
    })(ApplyDamage)
)
