package com.gizhirn;

import android.app.Application;

import com.facebook.react.BuildConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.gizhirn.moudle.AnExampleReactPackage;
import com.gizhirn.utils.SpHelper;
import com.oblador.vectoricons.VectorIconsPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;

import java.util.Arrays;
import java.util.List;

/**
 * 作者：HWQ on 2017/10/18 16:21
 * 描述：
 */

public class MainApplication extends Application implements ReactApplication {
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    //在应用中注册这个包管理器
                    new AnExampleReactPackage(),
                    new VectorIconsPackage(),
                    new RNNetworkInfoPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SpHelper.initSP(this);
    }
}
