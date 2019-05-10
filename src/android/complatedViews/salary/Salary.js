import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Container, Content, Tabs, Tab, Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../GlobalStyles'
import moment from 'moment'

const renderItem = props => {
    const { item, item: { city_route_start, city_route_end, distance, truck_num, load_flag, brand_name, car_count, truck_number, task_end_date } } = props
    return (
        <View style={{ margin: 5, borderColor: '#ddd', borderWidth: 0.5 }}>
            <View style={[styles.listItemBody, { padding: 10, borderColor: '#ddd', borderBottomWidth: 0.5 }]}>
                <Text style={[globalStyles.midText]}>{city_route_start ? `${city_route_start}` : ''} -> {city_route_end ? `${city_route_end}` : ''}</Text>
                <Text style={[globalStyles.midText]}>{distance ? `${distance}` : '0'}公里</Text>
            </View>
            <View style={styles.listItemListPadding} >
                <View style={[styles.listItemBody, styles.listItemListPadding]}>
                    <Text style={[globalStyles.midText]}>货车牌号：{truck_num ? `${truck_num}` : ''}{brand_name ? `(${brand_name})` : ''}</Text>
                    <Text style={globalStyles.midText}>运送车辆：{car_count ? `${car_count}` : '0'}/{truck_number ? `${truck_number}` : '0'}</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemListPadding]}>
                    <Text style={[globalStyles.midText]}>完成时间：{task_end_date ? `${moment(task_end_date).format('YYYYMMDD')}` : ''}</Text>

                </View>
            </View>
        </View>
    )
}


const renderListEmpty = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无关联任务记录</Text>
        </View>
    )
}


const Salary = props => {
    const { salary: { plan_salary, actual_salary, truck_num, month_date_id, drive_name, grant_status },
        salaryReducer: { data: { salaryTaskList } }, salaryReducer } = props
    if (salaryReducer.getSalaryTaskList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <Tabs>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                        heading="信息">
                        <Content>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>月份</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>{month_date_id ? `${month_date_id}` : ''}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>货车牌号</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>{truck_num ? `${truck_num}` : ''}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>司机姓名</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>{drive_name ? `${drive_name}` : ''}</Text>
                            </View>
                            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>应发工资</Text>
                                <Text style={[globalStyles.midText, styles.listItemPadding]}>{plan_salary ? `${plan_salary}` : '0'}</Text>
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
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                        heading="任务">
                        <FlatList
                            contentContainerStyle={{ margin: 5 }}
                            data={salaryTaskList}
                            ListEmptyComponent={salaryReducer.getSalaryTaskList.isResultStatus != 1 && salaryTaskList.length == 0 && renderListEmpty}
                            keyExtractor={(item, index) => index}
                            renderItem={renderItem} />
                    </Tab>
                </Tabs>
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
        borderBottomColor: '#dfdfdf'
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