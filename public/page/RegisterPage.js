import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Button,
    ToastAndroid,
    TouchableOpacity,
    Text
} from 'react-native';

import Login from '../module/LoginModule';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountDownButton from '../component/CountDownButton';

const iconColor = '#7D7D7D';

class RegisterPage extends React.Component {
    static navigationOptions = {
        title: '注册',
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            SMSCode: '',
            visible: true
        };
    }

    onClickFun(visible) {
        this.setState({
            visible: visible
        });
    }

    /**
     * Callback 通信方式
     */
    registerFun() {
        if (this.state.userName == '' || this.state.password == '') {
            ToastAndroid.show("账号和密码不能为空", ToastAndroid.SHORT);
        } else if (this.state.SMSCode == '') {
            ToastAndroid.show("验证码不能为空", ToastAndroid.SHORT);
        } else {
            Login.registerNativeFromCallback(this.state.userName, this.state.password, this.state.SMSCode, (result) => {
                ToastAndroid.show("注册成功", ToastAndroid.SHORT);
                this.props.navigation.goBack();
            }, (errorMsg) => {
                ToastAndroid.show("注册失败", ToastAndroid.SHORT);
            })
        }
    }

    getSMSCodeFun(shouldStartCounting) {
        Login.getSMSCode(this.state.userName, (result) => {
            shouldStartCounting && shouldStartCounting(true)
            ToastAndroid.show("发送成功", ToastAndroid.SHORT);
        }, (errorMsg) => {
            shouldStartCounting && shouldStartCounting(false)
            ToastAndroid.show("发送失败", ToastAndroid.SHORT);
        })
    }


    render() {
        const {userName} = this.state
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
                    <View style={styles.dividerView}>
                        <Text style={styles.divider}/>
                    </View>
                    <View style={styles.codeView}>
                        <Icon name="verified-user" size={22} color={iconColor}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.textInput} placeholder='验证码'
                                   onChangeText={(SMSCode) => this.setState({SMSCode})}
                                   value={this.state.SMSCode}/>
                        <CountDownButton
                            timerTitle={'验证码'}
                            enable={userName.length > 10}
                            onClick={(shouldStartCounting) => {
                                this.getSMSCodeFun(shouldStartCounting)
                            }}/>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={() => this.registerFun()}>
                        <View style={styles.buttonView}>
                            <Text style={styles.loginText}>注 册</Text>
                        </View>
                    </TouchableOpacity>
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
        height: 150,
    }, inputV: {
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
    codeView: {
        marginLeft: 12,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    codeButton: {
        backgroundColor: '#1976D2',
        width: 120,
        marginRight: 20,
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
export default RegisterPage;