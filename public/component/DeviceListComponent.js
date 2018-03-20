/**
 * Created by guzhenfu on 17/5/11.
 */

import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    DeviceEventEmitter,
    TouchableHighlight,
} from 'react-native'

import RefrshList from 'react-native-refreshlist'
import Device from '../module/DeviceModule';
import Icon from 'react-native-vector-icons/MaterialIcons';

class DeviceListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.getDeviceEventEmitterTime();
    }


    componentWillMount() {
        var thiz=this;
        DeviceEventEmitter.addListener('loadSuccess', function (msg) {
            console.log(">=> " + msg);
            const data = JSON.parse(msg);
            console.log(data);
            thiz._listRef.setData(data);

        });
        DeviceEventEmitter.addListener('loadFail', function (msg) {
            console.log(">=>" + msg);
            thiz._listRef.setData([]);

        });
    }

    getDeviceEventEmitterTime() {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        Device.getDeviceList2();
    }


    /**
     * 下拉刷新
     * @private
     */
    _onPullRelease(resolve) {
        Device.getDeviceList((result) => {
            resolve();
            console.log(result);
            const data = JSON.parse(result);
            console.log(data);
            this._listRef.setData(data);
        }, (errorMsg) => {
            resolve();
            console.log(errorMsg);
            this._listRef.setData();
        })
    }

    /**
     * 点击事件
     * @param item
     * @private
     */
    _onItemPress(item) {
    }


    /**
     * 渲染item 布局
     * @param item
     * @returns {XML}
     * @private
     */
    _renderItem(item) {
        console.log(item);
        return (
            <TouchableHighlight
                underlayColor="rgba(34, 26, 38, 0.1)"
                onPress={() => {
                    this._onItemPress(item)
                }}>
                <View style={styles.listWrapper}>
                    <View>
                        <Image source={require('../image/chazuo.png')} style={styles.leftImage}/>
                    </View>
                    <View style={styles.listItemWrapper}>
                        <Text style={styles.itemText}>{item.item.macAddress}</Text>
                        <Text style={styles.itemText}>{"智能插座"}</Text>
                    </View>
                    <View style={styles.rightNext}>
                        <Icon name="navigate-next" size={30} color={'#9f9f9f'}/>
                    </View>

                </View>
            </TouchableHighlight>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <RefrshList
                    ref={(list) => this._listRef = list}
                    onPullRelease={(resolve) => this._onPullRelease(resolve)}
                    ItemHeight={100}
                    renderItem={(item) => this._renderItem(item)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listWrapper: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 80,
        borderTopWidth: 8,
        borderTopColor: '#EBEBEB',
    },
    listItemWrapper: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'flex-start',
    },
    leftImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
        resizeMode: 'cover'
    },
    rightNext: {
        marginRight: 10,
        alignItems: 'center'
    },
    itemText: {
        fontSize: 16,
        color: '#474747'
    },

});
export default DeviceListComponent;