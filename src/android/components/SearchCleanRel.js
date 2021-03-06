import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Spinner } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import Select from './share/Select'
import DisposableList from '../views/select/DisposableList'
import * as selectReceiveAction from '../../actions/SelectReceiveAction'
import * as selectCityAction from '../../actions/SelectCityAction'
import * as cleanRelListAction from '../complatedViews/cleanRelList/CleanRelListAction'


const onSelectReceive = ({ param, getReceiveListWaiting, getReceiveList, onSelect ,getCleanRelListWaiting,getCleanRelList}) => {
    getReceiveListWaiting()
    Actions.listCennect({
        mapStateToProps: receiveMapStateToProps,
        mapDispatchToProps: receiveMapDispatchToProps,
        List: DisposableList,
        title: '选择经销商',
        onSelect: (item) => {
            getCleanRelListWaiting()
            Actions.pop({ popNum: 2 })
            InteractionManager.runAfterInteractions(() => {
                onSelect({ ...param, ...item })  
                getCleanRelList(item.id)
            })
        }
    })
    InteractionManager.runAfterInteractions(() => getReceiveList(param))
}

const SearchCleanRel = props => {
    const { getCityList, getCityListWaiting, getReceiveList, getReceiveListWaiting,getCleanRelListWaiting,getCleanRelList } = props
    return (
        <View style={styles.footerContainer}>
            <Field
                label='经销商：'
                name='receive'
                component={Select}
                getList={getCityList}
                isPop={false}
                getListWaiting={getCityListWaiting}
                showList={({ onSelect }) => {
                    return Actions.listCennect({
                        mapStateToProps: cityMapStateToProps,
                        mapDispatchToProps: cityMapDispatchToProps,
                        List: DisposableList,
                        title: '选择城市',
                        onSelect: (param) => {
                            onSelectReceive({ param: { cityId: param.id, cityName: param.value },getCleanRelListWaiting,getCleanRelList, getReceiveListWaiting, getReceiveList, onSelect })
                        }
                    })
                }} />
        </View>
    )
}


const cityMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectCityReducer.getCityList,
            data: {
                list: state.selectCityReducer.data.cityList.map(item => {
                    return { id: item.id, value: item.city_name }
                })
            }
        }
    }
}

const cityMapDispatchToProps = (dispatch) => ({

})

const receiveMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectReceiveReducer.getReceiveList,
            data: {
                list: state.selectReceiveReducer.data.receiveList.map(item => {
                    return { id: item.id, value: item.short_name }
                })
            }
        }
    }
}

const receiveMapDispatchToProps = (dispatch) => ({

})



const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCityList: () => {
        dispatch(selectCityAction.getCityList())
    },
    getCityListWaiting: () => {
        dispatch(selectCityAction.getCityListWaiting())
    },
    getReceiveList: (param) => {
        dispatch(selectReceiveAction.getReceiveList(param))
    },
    getReceiveListWaiting: () => {
        dispatch(selectReceiveAction.getReceiveListWaiting())
    },
    getCleanRelListWaiting: () => {
        dispatch(cleanRelListAction.getCleanRelListWaiting())
    },
    getCleanRelList: (param) => {
        dispatch(cleanRelListAction.getCleanRelList(param))
    }
})
const styles = StyleSheet.create({
    text: {
        color: '#fff'
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'searchCleanRelForm'
})(SearchCleanRel))

