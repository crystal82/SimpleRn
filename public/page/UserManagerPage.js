import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class UserManagerPage extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '用户管理',
        headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            alignSelf: 'flex-start'       // android标题居中
        },
    });

    render() {
        return (
            <View style={{backgroundColor: '#f6f6f6', flex: 1}}>
                <View style={styles.itemView}>
                    <Text style={styles.textItem}>用户账号</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
                <View style={styles.itemView}>
                    <Text style={styles.textItem}>修改密码</Text>
                    <View style={styles.iconView}><Icon name="navigate-next" size={25} color={'#9f9f9f'}/></View>
                </View>
                </TouchableOpacity>
                <View style={styles.logout}>
                    <Text style={styles.logoutText}>退出登录</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconView: {
        marginRight: 10,
        alignItems: 'center'
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 45,
        marginTop: 7,
        backgroundColor: '#fff'
    },
    textItem: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#1a1a1a'
    }, logoutText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#1a1a1a'
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 45,
        backgroundColor: '#fff',
        marginTop: 40
    }
});


export default UserManagerPage;