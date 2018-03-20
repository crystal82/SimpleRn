import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    ART,
    DeviceEventEmitter
} from 'react-native'

const {width, height} = Dimensions.get('window');
let mwidth = 150;
let mheight = 100;
const bgColor = '#2d2d2d';
const top = 60;
let dataArray;
export default class MenuModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
        }
        mwidth = this.props.width || 150;
        mheight = this.props.height || 100;
        dataArray = this.props.dataArray;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isVisible: nextProps.show});
    }

    closeModal() {
        this.setState({
            isVisible: false
        });
        this.props.closeModal(false);
    }

    WLANConnectPageFun() {
        this.closeModal();
        DeviceEventEmitter.emit('toWLANConnectPage', 'WLANConnectPage');
    }

    render() {
        const path = ART.Path();
        path.moveTo(width - 10 - mwidth * 1 / 3 + 3, top);
        path.lineTo(width - 10 - mwidth * 1 / 3 + 9, top - 7);
        path.lineTo(width - 10 - mwidth * 1 / 3 + 15, top);
        path.close();
        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    visible={this.state.isVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}>
                    <View style={styles.contentV}>
                        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => this.closeModal()}>
                            <ART.Surface width={width} height={100}>
                                <ART.Shape d={path} fill={bgColor}/>
                            </ART.Surface>
                            <View style={styles.modal}>
                                <TouchableOpacity activeOpacity={1}
                                                  style={styles.itemView}>
                                    <Text style={styles.textStyle}>{dataArray[0]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1}
                                                  style={[styles.itemView, {
                                                      width: 140,
                                                      borderColor: '#999',
                                                      borderTopWidth: 1
                                                  }]} onPress={() => this.WLANConnectPageFun()}>
                                    <Text style={styles.textStyle}>{dataArray[1]}</Text>
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
    },
    modal: {
        backgroundColor: bgColor,
        // opacity:0.8,
        width: mwidth,
        height: mheight,
        position: 'absolute',
        left: width - mwidth - 10,
        top: top,
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 3,
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },
    textStyle: {
        color: '#fff',
        fontSize: 17,
        marginLeft: 5,
    },
    contentV: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
    }
});