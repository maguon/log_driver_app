import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import { Button, Container, Content, Header, Icon, Left, Body, Right, Title, List, ListItem, Thumbnail, Toast, Separator } from 'native-base'
import * as PersonalInfoAction from '../../actions/PersonalInfoAction'
import { file_host } from '../../config/Host'

class PersonalInfo extends Component {
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
                        userId: this.props.userReducer.data.user.userId
                    },
                    postParam:{
                        key:'image',
                        imageUrl: image.path,
                        imageType: image.mime,
                        imageName: encodeURI(image.path.substring(pos + 1))
                    }
                },
                updateAvatarImage: {
                    putParam: {},
                    requiredParam: {
                        userId: this.props.userReducer.data.user.userId
                    }
                }
            })
        }).catch(err => console.log(err))
    }

    render() {
        const { personalInfo } = this.props.settingReducer.data
        return <Container style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <List>
                    <Separator bordered />
                    <ListItem avatar style={{ borderBottomWidth: 0.3 }} onPress={this.openImage}>
                        <Left>
                            <Text>头像</Text>
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }} />
                        <Right style={{ borderBottomWidth: 0 }}>
                            <Thumbnail source={personalInfo.avatar_image ? { uri: `${file_host}/image/${personalInfo.avatar_image}` } : { uri: `personalicon` }} />
                        </Right>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text>姓名</Text>
                        <Text>{personalInfo.real_name ? personalInfo.real_name : ''}</Text>
                    </ListItem>
                    <ListItem style={{ borderBottomWidth: 0, justifyContent: 'space-between' }}>
                        <Text>电话</Text>
                        <Text>{personalInfo.mobile ? personalInfo.mobile : ''}</Text>
                    </ListItem>
                </List>
                <Separator bordered style={{ flex: 1 }} />
            </View>
        </Container>
    }
}


const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        settingReducer: state.settingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    updatePersonalImage: (param) => {
        dispatch(PersonalInfoAction.updatePersonalImage(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)