package com.log_driver_app.xinge;

import com.facebook.react.bridge.Promise;
import android.content.Context;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.tencent.android.tpush.XGIOperateCallback;
import com.tencent.android.tpush.XGPushManager;

public class XinGeModule extends ReactContextBaseJavaModule {

    private Context mContext;
 
    public XinGeModule(ReactApplicationContext reactContext) {
      super(reactContext);
      mContext = reactContext;
    }

    private static final String ERROR = "ERROR";

    @Override
    public String getName() {
        return "XinGeModule";
    }

    @ReactMethod
    public void register(final Promise promise) {
        XGPushManager.registerPush(mContext, new XGIOperateCallback() {
            @Override
            public void onSuccess(Object data, int flag) {
                promise.resolve(data);
            }

            @Override
            public void onFail(Object data, int errCode, String msg) {
                promise.reject(ERROR, msg);
            }
        });
    }
}