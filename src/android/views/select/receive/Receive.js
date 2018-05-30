import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import * as receiveAction from './ReceiveAction'
import { Actions } from 'react-native-router-flux'
import { Container, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'

class Receive extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)

    }

    static defaultProps = {
        hasAll: false
    }

    componentDidMount() {
        this.props.getReceiveListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getReceiveList({ OptionalParam: { cityId: this.props.cityId } }))
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    render() {
        const { receiveList } = this.props.receiveReducer.data
        const { getRecevieList } = this.props.receiveReducer
        const { hasAll } = this.props
        if (getRecevieList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container >
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={hasAll ? [{ id: null, short_name: '全部' }, ...receiveList] : receiveList}
                        renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => this._onPress(item)}>
                            <Text style={globalStyles.midText}>{item.short_name}</Text>
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
        receiveReducer: state.receiveReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getReceiveList: (param) => {
        dispatch(receiveAction.getReceiveList(param))
    },
    getReceiveListWaiting: () => {
        dispatch(receiveAction.getReceiveListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Receive)