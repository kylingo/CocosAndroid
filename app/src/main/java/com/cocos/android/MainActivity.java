package com.cocos.android;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.app.Fragment;

import com.cocos.android.utils.FileUtils;
import com.me.ui.library.sample.SampleActivity;

public class MainActivity extends SampleActivity {

    private static final String KEY_COPY_GAME = "copy_game";

    @Override
    protected String getSampleTitle() {
        return getString(R.string.app_name);
    }

    @Override
    protected Fragment getSampleFragment() {
        return new MainFragment();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Copy assets game to cache directory
        SharedPreferences sp = getSharedPreferences("cocos", Context.MODE_PRIVATE);
        boolean isCopyGame = sp.getBoolean(KEY_COPY_GAME, false);
        boolean isGameExist = FileUtils.isGameExist(this);
        if (!isCopyGame || !isGameExist) {
            FileUtils.copyGame(this);
            sp.edit().putBoolean(KEY_COPY_GAME, true).apply();
        }
    }
}
