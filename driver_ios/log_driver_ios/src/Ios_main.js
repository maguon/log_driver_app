import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux' //必须用到的 redux
import ReduxThunk from 'redux-thunk'//支持异步的能力
import reducers from './reducers'
import App from './App'

import {Platform, StyleSheet, Text, View} from 'react-native';

//HOC=> 调节组件
//compose（组成）ReduxThunk（异步能力）  applyMiddleware（中间件） store由什么组件组成封装成一个新的组件
const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers)

class Ios_main extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

export  default Ios_main
