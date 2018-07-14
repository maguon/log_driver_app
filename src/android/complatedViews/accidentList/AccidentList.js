import React from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { Container } from 'native-base'
import { Icon, Spinner } from 'native-base'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../../GlobalStyles'
import * as accidentListAction from './AccidentListAction'
import * as imagForAccidentAction from '../../complatedComponents/accidentInfo/imageListForAccident/ImageForAccidentAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

const { width } = Dimensions.get('window')

const renderItem = props => {
    const { item: { id, address, accident_explain, accident_status, created_on, truck_num }, index
        , getAccidentImageListWaiting, getAccidentImageList } = props
    return (
        <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => {
            getAccidentImageListWaiting()
            Actions.accidentInfo({ accidentId: id })
            InteractionManager.runAfterInteractions(() => getAccidentImageList({ accidentId: id }))
        }}>
            <View style={styles.itemHeader}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>编号：{id ? `${id}` : ''}</Text>
                {accident_status == 1 && <Text style={[globalStyles.midText, styles.itemWarnColor]}>待处理</Text>}
                {accident_status == 2 && <Text style={[globalStyles.midText]}>处理中</Text>}
                {accident_status == 3 && <Text style={[globalStyles.midText]}>已处理</Text>}
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <MaterialCommunityIcons name='truck' size={14} color={'#bbb'} style={styles.itemBlockMaterialIcon} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>{truck_num ? `${truck_num}` : ''}</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Icon name='ios-time-outline' style={styles.itemBlockIcon} style={styles.itemBlockIcon} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                </View>
            </View>
            <View style={[styles.item]}>
                <View style={styles.itemBlock}>
                    <Icon name='ios-pin' style={[styles.itemBlockIcon]} />
                    <Text style={[globalStyles.midText, styles.itemBlockText, { width: width - 60 }]}><Text>事故地点：</Text>{address ? `${address}` : ''}</Text>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <MaterialCommunityIcons name='alert-circle' size={14} color={'#fe7378'} style={styles.itemBlockMaterialIcon} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}><Text>事故描述：</Text>{accident_explain ? `${accident_explain}` : ''}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const ListFooterComponent = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无申报记录</Text>
        </View>
    )
}

const AccidentList = props => {
    const { accidentListReducer: { data: { accidentList, isComplete }, getAccidentList },
        accidentListReducer, getAccidentListMore, getAccidentImageList, getAccidentImageListWaiting } = props
    if (getAccidentList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container style={{ padding: 5, backgroundColor: '#edf1f4' }}>
                <FlatList
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getAccidentList.isResultStatus == 2 && !isComplete) {
                            getAccidentListMore()
                        }
                    }}
                    ListFooterComponent={accidentListReducer.getAccidentListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                    data={accidentList}
                    renderItem={(item) => renderItem({ ...item, getAccidentImageListWaiting, getAccidentImageList })}
                />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        accidentListReducer: state.accidentListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAccidentListMore: () => {
        dispatch(accidentListAction.getAccidentListMore())
    },
    getAccidentImageList: (param) => {
        dispatch(imagForAccidentAction.getAccidentImageList(param))
    },
    getAccidentImageListWaiting: () => {
        dispatch(imagForAccidentAction.getAccidentImageListWaiting())

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AccidentList)

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        padding: 5,
        margin: 5,
        borderWidth: 0.3,
        borderColor: '#ddd'
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 5,
        marginBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 0.3,
        borderColor: '#ddd'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    itemWarnColor: {
        color: '#fe7378'
    },
    itemBlockIcon: {
        color: '#bbb',
        fontSize: 16,
        width: 20,
        textAlign: 'center'
    },
    itemBlockMaterialIcon: {
        width: 20,
        textAlign: 'center'
    },
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    itemBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemBlockText: {
        paddingLeft: 5,
    },
    itemBlockTitle: {

    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})