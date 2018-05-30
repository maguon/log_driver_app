import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import * as entrustAction from './EntrustAction'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { Container, Spinner } from 'native-base'

class Entrust extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    static defaultProps = {
        hasAll: false
    }

    componentDidMount() {
        this.props.getEntrustListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getEntrustList({ OptionalParam: { cityId: this.props.cityId } }))
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    render() {
        const { entrustList } = this.props.entrustReducer.data
        const { getEntrustList } = this.props.entrustReducer
        const { hasAll } = this.props
        if (getEntrustList.isResultStatus == 1) {
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
                        data={hasAll ? [{ id: null, short_name: '全部' }, ...entrustList] : entrustList}
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
        entrustReducer: state.entrustReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getEntrustList: (param) => {
        dispatch(entrustAction.getEntrustList(param))
    },
    getEntrustListWaiting: () => {
        dispatch(entrustAction.getEntrustListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Entrust)