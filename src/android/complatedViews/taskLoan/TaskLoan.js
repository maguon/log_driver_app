import React from 'react'
import { Text, View, InteractionManager } from 'react-native'
import { Container, Content, ListItem, Left, Right, Icon } from 'native-base'
import globalStyles from '../../GlobalStyles'
import moment from 'moment'
import { connect } from 'react-redux'
import * as taskLoanRelListAction from '../taskLoanRelList/taskLoanRelListAction'
import { Actions } from 'react-native-router-flux'

const TaskLoan = props => {
    const { initParam: { taskLoan: { id, task_loan_status, grant_passing_cost, refund_passing_cost, grant_fuel_cost, refund_fuel_cost,
        grant_protect_cost, refund_protect_cost, grant_penalty_cost, refund_penalty_cost, grant_parking_cost, refund_parking_cost,
        grant_taxi_cost, refund_taxi_cost, refund_actual_money, grant_actual_money, grant_user_name, refund_user_name, grant_date, refund_date,
        profit, repayment_money } }, getTaskLoanRelListWaiting, getTaskLoanRelList } = props
    return (
        <Container>
            <Content>
                <ListItem style={{ marginLeft: 0, paddingLeft: 15, backgroundColor: '#eff1f2' }}>
                    <Left>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>出车款编号：{id ? `${id}` : ''}</Text>
                    </Left>
                    <Right>
                        {task_loan_status == 2 && <Text style={[globalStyles.midText, globalStyles.styleColor]}>已领取</Text>}
                        {task_loan_status == 3 && <Text style={[globalStyles.midText]}>已报销</Text>}
                    </Right>
                </ListItem>
                <ListItem onPress={() => {
                    getTaskLoanRelListWaiting()
                    Actions.taskLoanRelList()
                    InteractionManager.runAfterInteractions(() => getTaskLoanRelList({ dpRouteTaskLoanId: id }))
                }} >
                    <Left>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>关联调度任务</Text>
                    </Left>
                    <Right>
                        <Icon name='ios-arrow-forward' />
                    </Right>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>出车款明细</Text>
                    </View>
                    <View>
                        {task_loan_status == 3 && <Text style={globalStyles.midText}><Text style={{ color: '#f69e23' }}>报销金额</Text>／<Text style={{ color: 'red' }}>发放金额</Text></Text>}
                    </View>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>过路费</Text>
                    </View>
                    <View>
                        {task_loan_status == 2 && <Text style={[globalStyles.midText, { color: 'red' }]}>{grant_passing_cost ? `${grant_passing_cost}` : '0'}</Text>}
                        {task_loan_status == 3 && <Text style={[globalStyles.midText]}><Text style={{ color: '#f69e23' }}>{refund_passing_cost ? `${refund_passing_cost}` : '0'}</Text>／<Text style={{ color: 'red' }}>{grant_passing_cost ? `${grant_passing_cost}` : '0'}</Text></Text>}
                    </View>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>燃料费</Text>
                    </View>
                    <View>
                        {task_loan_status == 2 && <Text style={[globalStyles.midText, { color: 'red' }]}>{grant_fuel_cost ? `${grant_fuel_cost}` : '0'}</Text>}
                        {task_loan_status == 3 && <Text style={[globalStyles.midText]}><Text style={{ color: '#f69e23' }}>{refund_fuel_cost ? `${refund_fuel_cost}` : '0'}</Text>／<Text style={{ color: 'red' }}>{grant_fuel_cost ? `${grant_fuel_cost}` : '0'}</Text></Text>}
                    </View>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>保道费</Text>
                    </View>
                    <View>
                        {task_loan_status == 2 && <Text style={[globalStyles.midText, { color: 'red' }]}>{grant_protect_cost ? `${grant_protect_cost}` : '0'}</Text>}
                        {task_loan_status == 3 && <Text style={[globalStyles.midText]}><Text style={{ color: '#f69e23' }}>{refund_protect_cost ? `${refund_protect_cost}` : '0'}</Text>／<Text style={{ color: 'red' }}>{grant_protect_cost ? `${grant_protect_cost}` : '0'}</Text></Text>}
                    </View>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>罚款费</Text>
                    </View>
                    <View>
                        {task_loan_status == 2 && <Text style={[globalStyles.midText, { color: 'red' }]}>{grant_penalty_cost ? `${grant_penalty_cost}` : '0'}</Text>}
                        {task_loan_status == 3 && <Text style={[globalStyles.midText]}><Text style={{ color: '#f69e23' }}>{refund_penalty_cost ? `${refund_penalty_cost}` : '0'}</Text>／<Text style={{ color: 'red' }}>{grant_penalty_cost ? `${grant_penalty_cost}` : '0'}</Text></Text>}
                    </View>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>停车费</Text>
                    </View>
                    <View>
                        {task_loan_status == 2 && <Text style={[globalStyles.midText, { color: 'red' }]}>{grant_parking_cost ? `${grant_parking_cost}` : '0'}</Text>}
                        {task_loan_status == 3 && <Text style={[globalStyles.midText]}><Text style={{ color: '#f69e23' }}>{refund_parking_cost ? `${refund_parking_cost}` : '0'}</Text>／<Text style={{ color: 'red' }}>{grant_parking_cost ? `${grant_parking_cost}` : '0'}</Text></Text>}
                    </View>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>打车费</Text>
                    </View>
                    <View>
                        {task_loan_status == 2 && <Text style={[globalStyles.midText, { color: 'red' }]}>{grant_taxi_cost ? `${grant_taxi_cost}` : '0'}</Text>}
                        {task_loan_status == 3 && <Text style={[globalStyles.midText]}><Text style={{ color: '#f69e23' }}>{refund_taxi_cost ? `${refund_taxi_cost}` : '0'}</Text>／<Text style={{ color: 'red' }}>{grant_taxi_cost ? `${grant_taxi_cost}` : '0'}</Text></Text>}
                    </View>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.midText, globalStyles.styleColor, { fontWeight: 'bold' }]}>合计</Text>
                    </View>
                    <View>
                        {task_loan_status == 2 && <Text style={[globalStyles.midText, { color: 'red' }]}>{grant_actual_money ? `${grant_actual_money}` : '0'}</Text>}
                        {task_loan_status == 3 && <Text style={[globalStyles.midText]}><Text style={{ color: '#f69e23' }}>{refund_actual_money ? `${refund_actual_money}` : '0'}</Text>／<Text style={{ color: 'red' }}>{grant_actual_money ? `${grant_actual_money}` : '0'}</Text></Text>}
                    </View>
                </ListItem>
                {task_loan_status == 3 && <ListItem style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.midText, globalStyles.styleColor, { fontWeight: 'bold' }]}>还款</Text>
                    </View>
                    <View>
                        <Text style={[globalStyles.midText, { color: 'red' }]}>{repayment_money ? `${repayment_money}` : '0'}</Text>
                    </View>
                </ListItem>}
                {task_loan_status == 3 && <ListItem style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.midText, globalStyles.styleColor, { fontWeight: 'bold' }]}>盈亏</Text>
                    </View>
                    <View>
                        <Text style={[globalStyles.midText, { color: 'red' }]}>{profit ? `${profit}` : '0'}</Text>
                    </View>
                </ListItem>}
                <View style={{ margin: 7.5 }}>
                    <View style={{ margin: 7.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.smallText]}>发放人：{grant_user_name ? `${grant_user_name}` : ''}</Text>
                        <Text style={[globalStyles.smallText]}>领取时间：{grant_date ? `${moment(grant_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                    <View style={{ margin: 7.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.smallText]}>报销人：{refund_user_name ? `${refund_user_name}` : ''}</Text>
                        <Text style={[globalStyles.smallText]}>报销时间：{refund_date ? `${moment(refund_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                </View>
            </Content>
        </Container>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getTaskLoanRelListWaiting: () => {
        dispatch(taskLoanRelListAction.getTaskLoanRelListWaiting())
    },
    getTaskLoanRelList: param => {
        dispatch(taskLoanRelListAction.getTaskLoanRelList(param))
    }
})

export default connect(null, mapDispatchToProps)(TaskLoan)