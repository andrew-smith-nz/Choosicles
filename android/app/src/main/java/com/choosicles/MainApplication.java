package com.choosicles;

import android.app.Application;
import android.app.ActivityManager;
import android.content.Context;
import android.os.Build;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.soloader.SoLoader;
import com.zmxv.RNSound.RNSoundPackage;
import com.facebook.imagepipeline.cache.DefaultBitmapMemoryCacheParamsSupplier;
import com.facebook.imagepipeline.cache.MemoryCacheParams;
import com.facebook.common.internal.Supplier;
import com.facebook.common.util.ByteConstants;
import com.facebook.imagepipeline.core.ImagePipelineConfig;
import com.idehub.Billing.InAppBillingBridgePackage;

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
      Context context = getApplicationContext();
        
      // This is the Fresco config, do anything custom you want here
      ImagePipelineConfig frescoConfig = ImagePipelineConfig
              .newBuilder(context)
              .setBitmapMemoryCacheParamsSupplier(new CustomBitmapMemoryCacheParamsSupplier(context))
              .build();

      MainPackageConfig appConfig = new MainPackageConfig
              .Builder()
              .setFrescoConfig(frescoConfig)
              .build();

      return Arrays.<ReactPackage>asList(
          new MainReactPackage(appConfig),
          new OrientationPackage(),
          new RNSoundPackage(),
          new InAppBillingBridgePackage()
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
