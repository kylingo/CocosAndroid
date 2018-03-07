package com.cocos.android;

import android.os.Environment;

/**
 * Description
 * Author:  Kevin.Tang
 * Date:    18/3/7 19:44
 */
public class FileUtils {

    public static String getGamePath(String path) {
        return Environment.getExternalStorageDirectory().getAbsolutePath() + path;
    }
}
