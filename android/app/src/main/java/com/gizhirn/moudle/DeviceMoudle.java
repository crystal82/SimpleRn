package com.gizhirn.moudle;

import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.gizhirn.ben.Device;
import com.gizhirn.utils.GosDeploy;
import com.gizhirn.utils.Lg;
import com.gizhirn.utils.SpHelper;
import com.gizwits.gizwifisdk.api.GizWifiDevice;
import com.gizwits.gizwifisdk.api.GizWifiSDK;
import com.gizwits.gizwifisdk.enumration.GizWifiErrorCode;
import com.gizwits.gizwifisdk.listener.GizWifiSDKListener;

import java.util.List;

/**
 * 作者：HWQ on 2017/10/24 14:21
 * 描述：
 */

public class DeviceMoudle extends ReactContextBaseJavaModule {
    Callback callbackSuccess;
    Callback callbackError;
    private ReactContext mReactContext;

    public DeviceMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "deviceModule";
    }

    @ReactMethod
    public void getDeviceList(Callback callbackSuccess, Callback callbackError) {
        this.callbackSuccess = callbackSuccess;
        this.callbackError = callbackError;
        String uid = (String) SpHelper.get("Uid", null);
        String token = (String) SpHelper.get("Token", null);
        List<String> ProductKeyList;
        ProductKeyList = GosDeploy.setProductKeyList();
        GizWifiSDK.sharedInstance().setListener(gizWifiSDKListener);
        if (!TextUtils.isEmpty(uid) && !TextUtils.isEmpty(token)) {
            GizWifiSDK.sharedInstance().getBoundDevices(uid, token, ProductKeyList);
        } else {
            callbackError.invoke("fail");
        }
    }

    @ReactMethod
    public void getDeviceList2() {

        String uid = (String) SpHelper.get("Uid", null);
        String token = (String) SpHelper.get("Token", null);
        List<String> ProductKeyList;
        ProductKeyList = GosDeploy.setProductKeyList();
        GizWifiSDK.sharedInstance().setListener(gizWifiSDKListener);
        if (!TextUtils.isEmpty(uid) && !TextUtils.isEmpty(token)) {
            GizWifiSDK.sharedInstance().getBoundDevices(uid, token, ProductKeyList);
        } else {
            sendTransMisson(mReactContext, "loadFail", "fail");
        }

    }

    /**
     * RCTDeviceEventEmitter方式
     *
     * @param reactContext
     * @param eventName    事件名
     * @param params       传惨
     */
    public void sendTransMisson(ReactContext reactContext, String eventName, @Nullable String params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private GizWifiSDKListener gizWifiSDKListener = new GizWifiSDKListener() {


        /** 用于设备列表 */
        @Override
        public void didDiscovered(GizWifiErrorCode result, java.util.List<GizWifiDevice> deviceList) {
            Lg.e("device size=" + deviceList.size());

            if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
                String js = JSON.toJSONString(deviceList);
                Lg.e("1==>" + js);
                List<Device> list = JSON.parseArray(js, Device.class);
                js = JSON.toJSONString(list);
                Lg.e("2===>" + js);
                if (callbackSuccess != null) {
                    callbackSuccess.invoke(js);
                    callbackSuccess = null;
                } else {
                    sendTransMisson(mReactContext, "loadSuccess", js);
                }
            } else {
                if (callbackError != null) {
                    callbackError.invoke("fail");
                    callbackError = null;
                } else {
                    sendTransMisson(mReactContext, "loadFail", "fail");
                }
            }
        }


        /** 用于设备解绑 */
        @Override
        public void didUnbindDevice(GizWifiErrorCode result, java.lang.String did) {

        }

        /** 用于设备绑定 */
        @Override
        public void didBindDevice(GizWifiErrorCode result, java.lang.String did) {

        }

    };
}
