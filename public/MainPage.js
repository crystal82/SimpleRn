import React from 'react';
import {
    Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import HeaderRight from './component/HeaderRight';

import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import MinePage from './page/MinePage';
import MessagePage from './page/MessagePage';
import HomePage from './page/HomePage';
import WLANConnectPage from './page/WLANConnectPage';
import ConfigDevStatePage from './page/ConfigDevStatePage';
import UserManagerPage from './page/UserManagerPage';
import ResetPasswordPage from './page/ResetPasswordPage';
import ConnectDevicePage from './page/ConnectDevicePage';

const MainScreenNavigator = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '我的设备',
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25} color={tintColor}/>
            ),
        }
    },
    Message: {
        screen: MessagePage,
        navigationOptions: {
            tabBarLabel: '消息中心',
            tabBarIcon: ({tintColor}) => (
                <Icon name="textsms" size={25} color={tintColor}/>
            ),
        }
    },
    Mine: {
        screen: MinePage,
        navigationOptions: {
            tabBarLabel: '个人中心',
            tabBarIcon: ({tintColor}) => (
                <Icon name="person" size={25} color={tintColor}
                />
            ),
        }
    },
}, {
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#1976D2', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        tabStyle: {
            padding: 0
        },
        labelStyle: {
            fontSize: 14, // 文字大小
        },
    },
});


const SimpleApp = StackNavigator({
    Login: {screen: LoginPage},
    Register: {screen: RegisterPage},
    Main: {
        screen: MainScreenNavigator,
        navigationOptions: {
            headerLeft: null,
            headerRight: <HeaderRight/>,
        }
    },
    WLANConnect: {
        screen: WLANConnectPage,
        navigationOptions: {
            title: '设备配网'
        }
    },
    ConfigDevState: {
        screen: ConfigDevStatePage,
        navigationOptions: {
            title: '设备配网'
        }
    },
    UserManager: {screen: UserManagerPage},
    ResetPassword: {
        screen: ResetPasswordPage,
        navigationOptions: {
            title: '重置密码'
        }
    },
    ConnectDevice: {screen: ConnectDevicePage},

}, {
    initialRouteName: 'ConnectDevice',
    headerMode: 'screen',  // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    mode: 'card',          // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    navigationOptions: ({navigation}) => {
        return {
            headerStyle: {
                backgroundColor: '#1976D2',
                ...Platform.select({  // 去掉导航栏下方阴影线
                    ios: {
                        shadowOpacity: 0,
                    },
                    android: {
                        elevation: 0
                    }
                })
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20,
                alignSelf: 'flex-start'
            },
            headerTintColor: '#fff',

        }
    },
});

export default SimpleApp;