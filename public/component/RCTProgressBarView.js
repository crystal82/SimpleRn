import React, {PropTypes} from 'react';
import {requireNativeComponent, View} from 'react-native';


class RCTProgressBarView extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes: {
        progress: PropTypes.number,
        ...View.propTypes
    }

    render() {
        console.log(this.props);
        return <RCTScanningView {...this.props}/>;
    }
}
var RCTProgress= requireNativeComponent('ProgressBarView', RCTProgressBarView);

export default RCTProgress;