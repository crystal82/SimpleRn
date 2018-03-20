package com.gizhirn.moudle;

import android.os.Message;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.gizhirn.utils.GosDeploy;
import com.gizhirn.utils.Lg;
import com.gizhirn.utils.SpHelper;
import com.gizwits.gizwifisdk.api.GizWifiDevice;
import com.gizwits.gizwifisdk.api.GizWifiSDK;
import com.gizwits.gizwifisdk.enumration.GizWifiConfigureMode;
import com.gizwits.gizwifisdk.enumration.GizWifiErrorCode;
import com.gizwits.gizwifisdk.enumration.GizWifiGAgentType;
import com.gizwits.gizwifisdk.listener.GizWifiSDKListener;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by maxiao on 2017/12/11.
 */

public class SearchDeviceMoudle extends ReactContextBaseJavaModule {
    Callback callbackSuccess;
    Callback callbackError;
    private ReactContext mReactContext;
    int bindNum = 0;
    String MAC;
    boolean isgotobind = false;

    boolean isStartBind = false;

    public SearchDeviceMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "searchDeviceMoudle";
    }

    @ReactMethod
    public void searchDevice(String ssid, String password, Callback callbackSuccess, Callback callbackError) {
        this.callbackSuccess = callbackSuccess;
        this.callbackError = callbackError;
        List<GizWifiGAgentType> modeList = new ArrayList<>();
        modeList.add(GizWifiGAgentType.GizGAgentHF);
        GizWifiSDK.sharedInstance().setDeviceOnboarding(ssid, password,
                GizWifiConfigureMode.GizWifiAirLink, null, 60, modeList);
    }


    private GizWifiSDKListener gizWifiSDKListener = new GizWifiSDKListener() {

        public void didSetDeviceOnboarding(GizWifiErrorCode result, final String mac,
                                              final String did, final String productKey) {
            if (GizWifiErrorCode.GIZ_SDK_DEVICE_CONFIG_IS_RUNNING == result) {
                return;
            }
            MAC = mac;
            if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
                sendTransMisson(mReactContext, "searchSuccess", "");
            } else {
                sendTransMisson(mReactContext, "searchFail", "");
            }
        }
        /** 用于设备列表 */
        @Override
        public void didDiscovered(GizWifiErrorCode result, java.util.List<GizWifiDevice> deviceList) {
            Lg.e("device size=" + deviceList.size());

            if (!isgotobind || bindNum >= 4) {
                return;
            }
            if (!TextUtils.isEmpty(MAC)) {
                String uid = (String) SpHelper.get("Uid", "");
                String token = (String) SpHelper.get("Token", "");
                Lg.e("TAG", "didDiscovered:" + deviceList.size());
                for (GizWifiDevice device : deviceList) {
                    Lg.e("TAG", "device:" + device.toString());
                    if (device.getMacAddress().equals(MAC)) {

                        if (!device.isBind()) {
                            bindNum = 0;

                            if (isStartBind) {
                                GizWifiSDK.sharedInstance().
                                        bindRemoteDevice(uid, token, MAC, GosDeploy.setProductKeyList().get(0), GosDeploy.setProductSecret());
                            }
                            return;
                        }
                        Lg.e("TAG", "bindNum=" + bindNum);
                        if (bindNum == 3) {
                            bindNum++;
                            return;
                        } else if (bindNum < 3) {
                            bindNum++;
                            List<String> ProductKeyList = GosDeploy.setProductKeyList();
                            GizWifiSDK.sharedInstance().getBoundDevices(uid, token, ProductKeyList);
                        }
                    }
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
            if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
                if (bindNum <= 3) {
                    String uid = (String) SpHelper.get("Uid", "");
                    String token = (String) SpHelper.get("Token", "");
                    List<String> ProductKeyList = GosDeploy.setProductKeyList();
                    GizWifiSDK.sharedInstance().getBoundDevices(uid, token, ProductKeyList);
                }
                Lg.e("TAG", "bind success" + bindNum);
            } else {
                Lg.e("TAG", "bind fail");
                String uid = (String) SpHelper.get("Uid", "");
                String token = (String) SpHelper.get("Token", "");
                if (isStartBind) {
                    GizWifiSDK.sharedInstance().
                            bindRemoteDevice(uid, token, MAC, GosDeploy.setProductKeyList().get(0), GosDeploy.setProductSecret());
                }
            }
        }

    };

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
}
