package com.gizhirn.moudle;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.gizhirn.ui.ZzHorizontalProgressBar;
import com.gizhirn.utils.Lg;

/**
 * Created by maxiao on 2017/12/8.
 */

 public class ProgressBarViewManager extends SimpleViewManager<ZzHorizontalProgressBar> {

    private ZzHorizontalProgressBar progressBar;

    @Override
    public String getName() {
        return "ProgressBarView";
    }

    @Override
    protected ZzHorizontalProgressBar createViewInstance(ThemedReactContext reactContext) {
        progressBar = new ZzHorizontalProgressBar(reactContext);
        return progressBar;
    }

    @ReactProp(name = "progress", customType = "number")
    public void setProgress(ZzHorizontalProgressBar progressBar, int progress) {
        Lg.e("scanningView", "progress=" + progress);
        progressBar.setProgress(progress);
    }
}
