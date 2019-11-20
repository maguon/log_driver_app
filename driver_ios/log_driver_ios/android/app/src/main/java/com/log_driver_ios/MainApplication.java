package com.log_driver_ios;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnative.photoview.PhotoViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.beefe.picker.PickerViewPackage;
import com.keyee.datetime.RCTDateTimePickerPackage;
import com.imagepicker.ImagePickerPackage;
import cn.qiuxiang.react.amap3d.AMap3DPackage;
import com.jeepeng.react.xgpush.PushPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

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
            new ReactVideoPackage(),
            new RNFSPackage(),
            new RNCWebViewPackage(),
            new AsyncStoragePackage(),
            new SvgPackage(),
            new RNDeviceInfo(),
            new PhotoViewPackage(),
            new OrientationPackage(),
            new ImageResizerPackage(),
            new PickerPackage(),
            new RNCameraPackage(),
            new PickerViewPackage(),
            new RCTDateTimePickerPackage(),
            new ImagePickerPackage(),
            new AMap3DPackage(),
            new PushPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
