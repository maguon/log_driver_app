import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import { Container, Left, Body, Right, List, ListItem, Thumbnail, Separator } from 'native-base'
import * as actions from '../../actions/index'

class PersonalCenter extends Component {
    constructor(props) {
        super(props)
        this.openImage = this.openImage.bind(this)
    }

    openImage() {
        ImagePicker.openPicker({
            width: 360,
            height: 360,
            cropping: true
        }).then(image => {
            const pos = image.path.lastIndexOf('/')
            this.props.updatePersonalImage({
                uploadImage: {
                    optionalParam: {
                        imageType: 0
                    },
                    requiredParam: {
                        userId: this.props.loginReducer.data.user.uid
                    },
                    postParam: {
                        key: 'image',
                        imageUrl: image.path,
                        imageType: image.mime,
                        imageName: encodeURI(image.path.substring(pos + 1))
                    }
                },
                updateAvatarImage: {
                    putParam: {},
                    requiredParam: {
                        userId: this.props.loginReducer.data.user.uid
                    }
                }
            })
        }).catch(err => console.log(err))
    }

    render() {
        const { loginReducer: { data: { user: { real_name, avatar_image, mobile } }},communicationSettingReducer:{data:{file_host } }} = this.props
        return <Container>
            <View style={{ flex: 1 }}>
                <List>
                    <Separator bordered />
                    <ListItem avatar style={{ borderBottomWidth: 0.3 }} onPress={this.openImage}>
                        <Left>
                            <Text>头像</Text>
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }} />
                        <Right style={{ borderBottomWidth: 0 }}>
                            {(avatar_image!=""&&avatar_image!=null)&&<Thumbnail source={avatar_image ? { uri: `${file_host}/image/${avatar_image}` } : { uri: `personalicon` }} />}
                            {(avatar_image==""||avatar_image==null)&&<Thumbnail source={require("../../images/head.png")} />}
                        </Right>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text>姓名</Text>
                        <Text>{real_name ? real_name : ''}</Text>
                    </ListItem>
                    <ListItem style={{ borderBottomWidth: 0, justifyContent: 'space-between' }}>
                        <Text>电话</Text>
                        <Text>{mobile ? mobile : ''}</Text>
                    </ListItem>
                </List>
                <Separator bordered style={{ flex: 1 }} />
            </View>
        </Container>
    }
}


const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        communicationSettingReducer:state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    updatePersonalImage: (param) => {
        dispatch(actions.personalCenterAction.updatePersonalImage(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(PersonalCenter)
