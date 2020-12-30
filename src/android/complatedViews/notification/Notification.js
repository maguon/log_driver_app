import React from 'react'
import {Text, StyleSheet, View, ScrollView} from 'react-native'
import {Container, Form, Content, Button, ListItem} from 'native-base'
import globalStyles from '../../GlobalStyles'
import {connect} from 'react-redux'
import Markdown from 'react-native-markdown-display';
import moment from 'moment'

const copy = `
# This is Heading 1
## This is Heading 2
1. List1
2. List2
  This is a \`description\`  for List2 .\n
  * test
  * test
3. List3
4. List4.
 
 
You can also put some url as a link [like This](https://www.google.com) or write it as a plain text:
  https://www.google.com
  <mailme@gmail.com>
 
---
 
This text should be printed between horizontal rules
 
---
 
The following code is an example for codeblock:
 
    const a = function() {
      runSomeFunction()
    };
 
Below is some example to print blockquote
 
> Test block Quote
> Another  block Quote
 
this is _italic_ 
this is **strong**
Some *really* ~~basic~~ **Markdown**.
 
 
| # | Name   | Age 
|---|--------|-----|
| 1 | John   | 19  |
| 2 | Sally  | 18  |
| 3 | Stream | 20  |
 
 
this is an example for adding picture:
 
![Screen Shot 2019-10-05 at 3 19 33 AM](https://user-images.githubusercontent.com/26213148/66237659-d11f4280-e71f-11e9-91e3-7a3f08659d89.png)
 
 
`;


const Notification = props => {
    const {id, notificationReducer: {data: {notification}}} = props

    return (
        <Container style={globalStyles.container}>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{height: '100%'}}
            >
                <View style={{padding: 8, margin: 8}}>
                    <View style={styles.title}>
                        <Text style={{
                            fontSize: 20,
                            color: '#777'
                        }}>{notification.title ? `${notification.title}` : ''}</Text>
                    </View>
                    <Markdown>
                        {notification.content}
                    </Markdown>
                    <View style={styles.fotter}>
                        <Text
                            style={[globalStyles.midText]}>作者：{notification.real_name ? `${notification.real_name}` : ''}</Text>
                        <Text
                            style={[globalStyles.midText]}>发布时间：{notification.created_on ? `${moment(notification.created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                    </View>
                </View>
            </ScrollView>

            {/*<View style={{ padding: 7.5, flexDirection: 'row', justifyContent: 'space-between' }}>*/}
            {/*    <Text style={[globalStyles.midText]}>{notification.real_name ? `${notification.real_name}` : ''}</Text>*/}
            {/*    <Text style={[globalStyles.midText]}>{notification.title ? `${notification.title}` : ''}</Text>*/}
            {/*    <Text style={[globalStyles.midText]}>{notification.content ? `${notification.content}` : ''}</Text>*/}
            {/*</View>*/}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        notificationReducer: state.notificationReducer,
    }
}

export default connect(mapStateToProps)((Notification))

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 5,
        marginBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 0.3,
        borderColor: '#ddd'
    },
    fotter: {
        paddingBottom: 10,
        paddingTop: 10,
        marginTop: 20,
        paddingHorizontal: 5,
        borderTopWidth: 0.3,
        borderColor: '#ddd'
    },
})
