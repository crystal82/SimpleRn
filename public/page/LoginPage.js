import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    ToastAndroid,
    TouchableOpacity,
    Text,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from '../module/LoginModule';
import '../utils/Global';

const iconColor = '#7D7D7D';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            visible: true
        };
    }

    static navigationOptions = {
        title: "登 录",
        headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            paddingLeft: Platform.OS === 'ios' ? 0 : 0,
            alignSelf: 'center'       // android标题居中
        },
    };

    componentWillMount() {
        var thiz = this;
        storage.load({
            key: 'loginState',
            autoSync: true,
        }).then(ret => {
            thiz.setState({
                userName: ret.userName,
                password: ret.password
            });
        }).catch(err => {
            console.warn(err.message);
        })

    }

    onClickFun(visible) {
        this.setState({
            visible: visible
        });
    }

    /**
     * Callback 通信方式
     */
    callbackComm() {

        if (this.state.userName == '' || this.state.password == '') {
            ToastAndroid.show("账号和密码不能为空", ToastAndroid.SHORT);
        } else {
            storage.save({
                key: 'loginState',
                data: {
                    userName: this.state.userName,
                    password: this.state.password
                },
            });
            Login.loginNativeFromCallback(this.state.userName, this.state.password, (result) => {
                ToastAndroid.show("登录成功", ToastAndroid.SHORT);
                this.props.navigation.navigate('Main')
            }, (errorMsg) => {
                ToastAndroid.show("登录失败", ToastAndroid.SHORT);
            })
        }
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.inputView}>
                    <View style={styles.inputV}>
                        <Icon name="phone-iphone" size={25} color={iconColor}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.textInput} placeholder='手机号'
                                   onChangeText={(userName) => this.setState({userName})}
                                   value={this.state.userName}/>
                    </View>
                    <View style={styles.dividerView}>
                        <Text style={styles.divider}/>
                    </View>
                    <View style={styles.inputV}>
                        <Icon name="lock-outline" size={25} color={iconColor}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.textInput} placeholder='密码'
                                   secureTextEntry={this.state.visible}
                                   onChangeText={(password) => this.setState({password})}
                                   value={this.state.password}/>
                        <Icon name={this.state.visible ? "visibility-off" : "visibility"} size={22}
                              color={iconColor} style={{marginRight: 7}} onPress={() =>
                            this.onClickFun(!this.state.visible)
                        }/>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={() => this.callbackComm()}>
                        <View style={styles.buttonView}>
                            <Text style={styles.loginText}>登 录</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.bottomBtnView}>
                        <View style={styles.bottomLeftBtnView}>
                            <Text style={styles.bottomBtn}>无法登录？</Text>
                        </View>
                        <View style={styles.bottomRightBtnView}>
                            <Text style={styles.bottomBtn}
                                  onPress={() => this.props.navigation.navigate('Register')}>新用户</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6'
    },
    inputView: {
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        height: 100,
    },
    inputV: {
        marginLeft: 10,
        marginRight: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        marginLeft: 5,
        flex: 1,
        fontSize: 16,
    },
    dividerView: {
        flexDirection: 'row',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ECEDF1'
    },
    bottomView: {
        marginTop: 20,
        flex: 1,
    },
    buttonView: {
        backgroundColor: '#1976D2',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    bottomBtnView: {
        flexDirection: 'row',
    },
    bottomLeftBtnView: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    bottomRightBtnView: {
        flex: 1,
        height: 50,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    bottomBtn: {
        fontSize: 15,
        color: '#1976D2',
    }
});
export default LoginPage;