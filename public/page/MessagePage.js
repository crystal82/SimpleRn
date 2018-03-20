import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


class MessagePage extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '消息中心',
        headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            alignSelf: 'flex-start'
        },
    });

    render() {
        return (
            <View style={styles.container}>
                <Text style={{padding: 20, fontSize: 16}}>暂无消息</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    container: {
        backgroundColor: '#eeeeee',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default MessagePage;