package com.gizhirn.ui;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

/**
 * 作者：HWQ on 2017/10/20 19:33
 * 描述：
 */

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RnTest";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
}
