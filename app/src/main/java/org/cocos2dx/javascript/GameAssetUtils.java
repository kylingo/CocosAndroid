package org.cocos2dx.javascript;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.res.AssetManager;
import android.util.Log;

/**
 * Description
 * Author:  Kevin.Tang
 * Date:    18/3/7 14:03
 */
public class GameAssetUtils {
    private static final String TAG = "Cocos2dxAssets";

    /**
     * 通过反射的方式调用AssetManager.addAssetPath方式，添加游戏的资源
     * @param path 游戏地址
     * @return AssetManager实例
     */
    @SuppressLint("PrivateApi")
    public static boolean addAssetPath(Activity activity, String path) {
        try {
//            AssetManager assetManager = AssetManager.class.newInstance();
            AssetManager assetManager = activity.getAssets();
            Object result = AssetManager.class.getDeclaredMethod("addAssetPath", String.class).invoke(
                    assetManager, path);
            Log.i(TAG, "addAssetPath result:" + result.toString());

            int resultInt = (int) result;
            if (resultInt != 0) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
