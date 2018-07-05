package com.cocos.android;

import android.os.Bundle;
import android.support.v4.app.Fragment;

import com.me.ui.library.sample.SampleActivity;

import org.cocos2dx.javascript.AppActivity;

public class MainActivity extends SampleActivity {

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
    }

    protected void test() {
        String gamePath;

        // Need zip assets directory, not game resource directory.
        gamePath = FileUtils.getGamePath("/cocos/game-flybird.zip");
        AppActivity.launch(MainActivity.this, gamePath);

        // Need add assets directory, then add game resource in assets directory.
        gamePath = FileUtils.getGamePath("/cocos/game-flybird");
        AppActivity.launch(MainActivity.this, gamePath);

        // Just add game resource into assets directory, then pack apk.
        gamePath = FileUtils.getGamePath("/cocos/game-flybird-debug.apk");
        AppActivity.launch(MainActivity.this, gamePath);

        // Like the previous sample
        gamePath = FileUtils.getGamePath("/cocos/game-blackjack-debug.apk");
        AppActivity.launch(MainActivity.this, gamePath);
    }

}
