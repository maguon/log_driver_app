import React, {Component} from 'react'
import {
    Text,
    View, Dimensions
} from 'react-native'
import {Button} from 'native-base'
import globalStyles from '../utils/GlobalStyles'
import {connect} from 'react-redux'
import * as actions from '../../actions/index'

const {width} = Dimensions.get('window')

class AboutUs extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.getAboutUsInfo()
    }

    render() {
        const {aboutUsReducer: {AboutUsInfo}} = this.props
        console.log(AboutUsInfo)
        return (
            <View style={{flex: 1,alignItems: 'center',}}>
                <View style={{justifyContent: 'space-between', width: width * 0.9}}>
                    <View>
                        <Text style={[globalStyles.xlText, {marginTop: 20}]}>{AboutUsInfo.title}</Text>
                        <Text style={[globalStyles.madText, {marginTop: 20}]}>{AboutUsInfo.content}</Text>
                    </View>

                    <View>
                        <Text style={[globalStyles.midText, {marginTop: 40}]}>{AboutUsInfo.contact}</Text>
                    </View>
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        aboutUsReducer: state.aboutUsReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAboutUsInfo: () => {
        dispatch(actions.aboutUsAction.getAboutUsInfo())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs)
