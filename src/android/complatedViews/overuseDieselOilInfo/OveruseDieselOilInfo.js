import React from 'react'
import {  Text } from 'react-native'
import { Container, Content, ListItem ,Spinner} from 'native-base'
import globalStyles,{styleColor} from '../../GlobalStyles'
import { connect } from 'react-redux'
import moment from 'moment'

const OveruseDieselOilInfo = props => {
    const { overuseDieselOil, overuseDieselOilInfoReducer: { data: { dpRouteTask }, getDpRouteTask } } = props
    if (getDpRouteTask.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <Content>
                    <ListItem last style={{ justifyContent: 'space-between', backgroundColor: '#f5f5f5', borderBottomWidth: 1 }}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>超油结算编号：{overuseDieselOil.id ? `${overuseDieselOil.id}` : ''}</Text>
                        {overuseDieselOil.settle_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>未扣</Text>}
                        {overuseDieselOil.settle_status == 2 && <Text style={globalStyles.midText}>已扣</Text>}
                    </ListItem>
                    {/* <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>调度编号</Text>
                        <Text style={globalStyles.midText}>{overuseDieselOil.dp_route_task_id ? `${overuseDieselOil.dp_route_task_id}` : ''}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>路线</Text>
                        <Text style={globalStyles.midText}>{dpRouteTask.city_route_start ? `${dpRouteTask.city_route_start}` : ''} -> {dpRouteTask.city_route_end ? `${dpRouteTask.city_route_end}` : ''}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>货车牌号</Text>
                        <Text style={globalStyles.midText}>{overuseDieselOil.truck_num ? `${overuseDieselOil.truck_num}` : ''}</Text>
                    </ListItem> */}
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>核油时间</Text>
                        <Text style={globalStyles.midText}>{overuseDieselOil.oil_date ? `${moment(overuseDieselOil.oil_date).format('YYYY-MM-DD')}` : ''}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>超量油</Text>
                        <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.exceed_oil ? `${overuseDieselOil.exceed_oil}` : '0'}</Text>L</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>超量尿素</Text>
                        <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.exceed_urea ? `${overuseDieselOil.exceed_urea}` : '0'}</Text>元</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>超量金额</Text>
                        <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.actual_money ? `${overuseDieselOil.actual_money}` : '0'}</Text>元</Text>
                    </ListItem>
                    {/* <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>操作人</Text>
                        <Text style={globalStyles.midText}>{overuseDieselOil.op_user_name ? `${overuseDieselOil.op_user_name}` : ''}</Text>
                    </ListItem> */}
                    <ListItem last style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={globalStyles.midText}>备注</Text>
                        <Text style={globalStyles.midText}>{overuseDieselOil.remark ? `${overuseDieselOil.remark}` : ''}</Text>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        overuseDieselOil: state.overuseDieselOilListReducer.data.overuseDieselOilList.find(item => item.id == ownProps.initParam.overuseDieselOilId),
        overuseDieselOilInfoReducer: state.overuseDieselOilInfoReducer
    }
}

export default connect(mapStateToProps)(OveruseDieselOilInfo)