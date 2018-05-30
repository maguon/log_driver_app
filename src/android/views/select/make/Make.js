import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import * as makeAction from './MakeAction'
import { Container, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../../GlobalStyles'

class Make extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    static defaultProps = {
        hasAll: false
    }

    componentDidMount() {
        this.props.getMakeListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getMakeList())
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    render() {
        const { makeList } = this.props.makeReducer.data
        const { getMakeList } = this.props.makeReducer
        const { hasAll } = this.props
        if (getMakeList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={hasAll ? [{ id: null, make_name: '全部' }, ...makeList] : makeList}
                        renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => this._onPress(item)}>
                            <Text style={globalStyles.midText}>{item.make_name}</Text>
                        </TouchableOpacity>}
                    />
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingVertical: 15,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})


const mapStateToProps = (state) => {
    return {
        makeReducer: state.makeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMakeList: () => {
        dispatch(makeAction.getMakeList())
    },
    getMakeListWaiting: () => {
        dispatch(makeAction.getMakeListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Make)