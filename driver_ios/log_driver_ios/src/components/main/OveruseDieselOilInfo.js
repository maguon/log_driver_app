import React from 'react'
import {  Text } from 'react-native'
import { Container, Content, ListItem ,Spinner} from 'native-base'
import globalStyles,{styleColor} from '../utils/GlobalStyles'
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
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>核油时间</Text>
                        <Text style={globalStyles.midText}>{overuseDieselOil.oil_date ? `${moment(overuseDieselOil.oil_date).format('YYYY-MM-DD')}` : ''}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>计划用油量</Text>
                        <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.plan_oil ? `${overuseDieselOil.plan_oil}` : '0'}</Text>L</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>超量油</Text>
                        <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.exceed_oil ? `${overuseDieselOil.exceed_oil}` : '0'}</Text>L</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>实际用油量</Text>
                        <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.actual_oil ? `${overuseDieselOil.actual_oil}` : '0'}</Text>L</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>计划尿素量</Text>
                        <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.plan_urea ? `${overuseDieselOil.plan_urea}` : '0'}</Text></Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>超量尿素</Text>
                        <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.exceed_urea ? `${overuseDieselOil.exceed_urea}` : '0'}</Text></Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>实际尿素</Text>
                        <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.actual_urea ? `${overuseDieselOil.actual_urea}` : '0'}</Text></Text>
                    </ListItem>
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
