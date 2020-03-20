import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Container, Content, Tabs, Tab, Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import moment from 'moment'




const Salary = props => {
    const { salary: {actual_salary,distance_salary,reverse_salary,enter_fee,  grant_status},salary,
        salaryReducer: { data: { salaryTaskList } }, salaryReducer } = props
    console.log('props',props)
    if (salaryReducer.getSalaryTaskList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>

                        <Content>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>月份</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>{salary.month_date_id ? `${salary.month_date_id}` : ''}</Text>
                            </View>

                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>司机姓名</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>{salary.drive_name ? `${salary.drive_name}` : ''}</Text>
                            </View>

                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>里程工资：{distance_salary ? `${distance_salary}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>倒板工资：{reverse_salary ? `${reverse_salary}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>交车打车进门费：{enter_fee ? `${enter_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>商品车质损：{salary.damage_under_fee ? `${salary.damage_under_fee}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>货车事故承担：{salary.accident_fee ? `${salary.accident_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>违章扣款：{salary.peccancy_under_fee ? `${salary.peccancy_under_fee}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>超量扣款：{salary.exceed_oil_fee ? `${salary.exceed_oil_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>满勤补助：{salary.full_work_bonus ? `${salary.full_work_bonus}` : '0'}</Text>
                            </View>

                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>其他补助：{salary.other_bonus ? `${salary.other_bonus}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>出差补助：{salary.hotel_bonus ? `${salary.hotel_bonus}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>社保缴费：{salary.social_security_fee ? `${salary.social_security_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>伙食费：{salary.food_fee ? `${salary.food_fee}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>个人借款：{salary.loan_fee ? `${salary.loan_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>其他扣款：{salary.other_fee ? `${salary.other_fee}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>质损暂扣款：{salary.damage_retain_fee ? `${salary.damage_retain_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>质安罚款：{salary.damage_op_fee ? `${salary.damage_op_fee}` : '0'}</Text>
                            </View>

                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>交车暂扣款：{salary.truck_retain_fee ? `${salary.truck_retain_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>商品车加油费：{salary.car_oil_fee ? `${salary.car_oil_fee}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>货车停车费：{salary.truck_parking_fee ? `${salary.truck_parking_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>商品车停车费：{salary.car_parking_fee ? `${salary.car_parking_fee}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>其他费用：{salary.dp_other_fee ? `${salary.dp_other_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>应发洗车费：{salary.clean_fee ? `${salary.clean_fee}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>应发拖车费：{salary.trailer_fee ? `${salary.trailer_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>应发地跑费：{salary.run_fee ? `${salary.run_fee}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>应发带路费：{salary.lead_fee ? `${salary.lead_fee}` : '0'}</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>提车费：{salary.car_pick_fee ? `${salary.car_pick_fee}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>个税：{salary.personal_tax ? `${salary.personal_tax}` : '0'}</Text>
                            </View>


                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>实发工资</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>{actual_salary ? `${actual_salary}` : '0'}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>发放状态</Text>
                                {grant_status == 3 && <Text style={[globalStyles.midText, styles.listItemPadding]}>已发放</Text>}
                                {grant_status == 2 && <Text style={[globalStyles.midText, styles.listItemPadding]}>未发放</Text>}
                            </View>

                        </Content>

            </Container>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const { salaryListReducer: { data: { salaryList } } } = state
    const { salaryId } = ownProps
    return {
        salary: salaryList.find(item => item.id == salaryId),
        salaryReducer: state.salaryReducer
    }
}

export default connect(mapStateToProps)(Salary)


const styles = StyleSheet.create({
    listItemPadding: {
        padding: 7.5
    },
    listItemBorderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdfdf',
        borderRightWidth: 0.5,
        borderRightColor: '#dfdfdf',
        justifyContent: 'space-between',
    },
    listItemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listItemListPadding: {
        padding: 5
    }
})
