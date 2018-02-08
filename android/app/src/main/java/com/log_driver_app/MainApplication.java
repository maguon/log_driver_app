package com.log_driver_app;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.jeepeng.react.xgpush.PushPackage;
import cn.qiuxiang.react.amap3d.AMap3DPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.xiaobu.amap.AMapLocationReactPackage;
import android.support.multidex.MultiDexApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new ImagePickerPackage(),
            new ImageResizerPackage(),
            new PushPackage(),  new AMap3DPackage(),
          new VectorIconsPackage(), new PhotoViewPackage(), 
          new PickerPackage(), new OrientationPackage(), new AMapLocationReactPackage());
    }
  };


  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  };

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  };
}
