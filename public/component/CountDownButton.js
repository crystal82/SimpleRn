/*
* @author:  yinyongqian
* @createTime:  2017-04-06, 09:41:06 GMT+0800
* @description:  description
*/
"use strict";

import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    TouchableOpacity,
    ViewPropTypes
} from 'react-native';

export default class CountDownButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || '验证码',
            counting: false,
            selfEnable: true,
        };
        this._shouldStartCountting = this._shouldStartCountting.bind(this)
        this._countDownAction = this._countDownAction.bind(this)
    }

    static propTypes = {
        style: ViewPropTypes.style,
        textStyle: Text.propTypes.style,
        onClick: PropTypes.func,
        disableColor: PropTypes.string,
        timerTitle: PropTypes.string,
        enable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        timerEnd: PropTypes.func,
        timerActiveTitle: PropTypes.array
    };

    _countDownAction() {
        const codeTime = this.state.timerCount;
        const {timerActiveTitle, timerTitle} = this.props
        const now = Date.now()
        const overTimeStamp = now + codeTime * 1000 + 100
        /*过期时间戳（毫秒） +100 毫秒容错*/
        this.interval = setInterval(() => {
            /* 切换到后台不受影响*/
            const nowStamp = Date.now()
            if (nowStamp >= overTimeStamp) {
                /* 倒计时结束*/
                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: timerTitle || '验证码',
                    counting: false,
                    selfEnable: true
                })
                if (this.props.timerEnd) {
                    this.props.timerEnd()
                }
                ;
            } else {
                const leftTime = parseInt((overTimeStamp - nowStamp) / 1000, 10)
                let activeTitle = `${leftTime}s`
                if (timerActiveTitle) {
                    if (timerActiveTitle.length > 1) {
                        activeTitle = timerActiveTitle[0] + leftTime + timerActiveTitle[1]
                    } else if (timerActiveTitle.length > 0) {
                        activeTitle = timerActiveTitle[0] + leftTime
                    }
                }
                this.setState({
                    timerCount: leftTime,
                    timerTitle: activeTitle,
                })
            }
        }, 1000)
    }

    _shouldStartCountting(shouldStart) {
        if (this.state.counting) {
            return
        }
        if (shouldStart) {
            this._countDownAction()
            this.setState({counting: true, selfEnable: false})
        } else {
            this.setState({selfEnable: true})
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const {onClick, style, textStyle, enable, disableColor} = this.props
        const {counting, timerTitle, selfEnable} = this.state
        return (
            <TouchableOpacity activeOpacity={counting ? 1 : 0.8} onPress={() => {
                if (!counting && enable && selfEnable) {
                    this.setState({selfEnable: false})
                    this.props.onClick(this._shouldStartCountting)
                }
                ;
            }}>
                <View style={[{
                    width: 70,
                    height: 35,
                    borderRadius: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: ((!counting && enable && selfEnable) ? (textStyle ? textStyle.color : 'rgba(25, 118, 210, 1.0)') : disableColor || 'rgba(25, 118, 210, 0.7)')
                }, style]}>
                    <Text style={[{fontSize: 17}, textStyle, {color: '#FFF'}]}>{timerTitle}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}