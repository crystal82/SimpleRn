package com.gizhirn.ui;

import android.Manifest;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;

import com.gizhirn.R;
import com.gizhirn.utils.Lg;
import com.gizhirn.utils.MessageCenter;
import com.gizhirn.utils.XPermissionUtils;
import com.gizwits.gizwifisdk.enumration.GizWifiErrorCode;
import com.gizwits.gizwifisdk.listener.GizWifiSDKListener;


/**
 * 作者：HWQ on 2017/10/20 13:46
 * 描述：
 */

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        MessageCenter.getInstance(getApplicationContext());
        doRequestPermission();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                                           Uri.parse("package:" + getPackageName()));
                startActivityForResult(intent, 0);
            }
        }

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        Lg.d("PermissionsResult");
        XPermissionUtils.onRequestPermissionsResult(this, requestCode, permissions, grantResults);
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    /**
     * 权限获取回调
     */
    private void doRequestPermission() {

        XPermissionUtils.requestPermissions(this, 201,
                                            new String[]{Manifest.permission.ACCESS_FINE_LOCATION,
                                                    Manifest.permission.WRITE_EXTERNAL_STORAGE},
                                            new XPermissionUtils.OnPermissionListener() {
                                                @Override
                                                public void onPermissionGranted() {
                                                    Lg.e("onPermissionGranted");
                                                    new Handler().postDelayed(new Runnable() {
                                                        @Override
                                                        public void run() {
                                                            startActivity(new Intent(SplashActivity.this, MyReactActivity.class));
                                                            finish();
                                                        }
                                                    }, 2000);
                                                }

                                                @Override
                                                public void onPermissionDenied(String[] deniedPermissions, boolean alwaysDenied) {
                                                    StringBuilder sBuilder = new StringBuilder();
                                                    for (String deniedPermission : deniedPermissions) {
                                                        if (deniedPermission.equals(Manifest.permission.ACCESS_FINE_LOCATION)) {
                                                            sBuilder.append("location");
                                                            sBuilder.append(",");
                                                        }
                                                        if (deniedPermission.equals(Manifest.permission.BLUETOOTH)) {
                                                            sBuilder.append("bluetooth");
                                                            sBuilder.append(",");
                                                        }
                                                    }
                                                    if (sBuilder.length() > 0) {
                                                        sBuilder.deleteCharAt(sBuilder.length() - 1);
                                                    }
                                                    if (alwaysDenied) {
                                                    }
                                                    finish();
                                                }
                                            });
    }


    private GizWifiSDKListener gizWifiSDKListener = new GizWifiSDKListener() {

        /** 用于用户登录 */
        @Override
        public void didUserLogin(GizWifiErrorCode result, String uid, String token) {
            Lg.e(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + result);
        }


        @Override
        public void didRequestSendPhoneSMSCode(GizWifiErrorCode result, String token) {
            if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
                Lg.e("请求成功");
            } else {
                Lg.e("请求失败");
            }
        }

    };
}
