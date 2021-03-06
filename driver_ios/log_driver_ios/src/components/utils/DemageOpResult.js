import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import {Content} from 'native-base'
import {connect} from 'react-redux'
import globalStyles from './GlobalStyles'
import {moneyFormat} from '../../util/util'
import damageTypeList from '../../util/damage_type.json'
import damageLinkTypeList from '../../util/damage_link_type.json'

const DemageOpResult = props => {
    const {
        demageOpResultReducer: {
            data: {
                demageOpResult: {
                    op_user_name, under_cost, under_user_name, damage_type, damage_link_type
                }
            }
        },
        damageStatus
    } = props
    // console.log('props', props)
    // console.log('damage_type', damage_type)
    // console.log('damageTypeList.find(item => item.id == damage_type)',damageTypeList.find(item => item.id == damage_type))
    return (
        <Content showsVerticalScrollIndicator={false}>
            {damageStatus == 3 && <View style={styles.body}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.text, styles.title, globalStyles.midText]}>质损类型：</Text>
                    <Text style={{
                        color: '#76b92c',
                        fontSize: 35
                    }}>{damage_type ? `${damageTypeList.find(item => item.id == damage_type).value}` : ''}</Text>
                </View>

                <View style={[styles.text, styles.strikingItem]}>
                <Text style={[ globalStyles.midText]}>
                    <Text style={styles.title}>责任人：</Text>{under_user_name ? `${under_user_name}` : ''}</Text>
                <Text style={[globalStyles.midText]}><Text
                    style={styles.title}>质损环节：</Text>{damage_link_type ? `${damageLinkTypeList.find(item => item.id == damage_link_type).value}` : ''}
                </Text>
                </View>

                <View style={[styles.text, styles.strikingItem]}>
                    <Text style={[styles.title, globalStyles.midText]}>责任人承担费用：</Text>
                    <Text style={globalStyles.largeText}>¥ <Text
                        style={styles.strikingText}>{under_cost ? `${moneyFormat(under_cost, 2)}` : '0.00'}</Text> 元</Text>
                </View>
            </View>}
            <View style={styles.footer}>
                <Text style={globalStyles.midText}><Text
                    style={styles.title}>处理人：</Text>{op_user_name ? `${op_user_name}` : ''}</Text>
            </View>
        </Content>
    )
}

const mapStateToProps = (state) => {
    return {
        demageOpResultReducer: state.demageOpResultReducer
    }
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DemageOpResult)

const styles = StyleSheet.create({
    text: {
        padding: 10
    },
    title: {
        fontWeight: 'bold'
    },
    strikingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    strikingText: {
        color: 'red'
    },
    body: {
        paddingVertical: 15,
        marginHorizontal: 15
    },
    footer: {
        borderTopWidth: 0.3,
        borderColor: '#777',
        paddingVertical: 15,
        marginTop: 15,
        marginHorizontal: 15,
        alignItems: 'flex-end'
    }
})


