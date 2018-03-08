package com.cocos.android;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import org.cocos2dx.javascript.AppActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn_zip).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Need zip assets directory, not game resource directory.
                String gamePath = FileUtils.getGamePath("/cocos/game-flybird.zip");
                AppActivity.launch(MainActivity.this, gamePath);
            }
        });

        findViewById(R.id.btn_directory).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Need add assets directory, then add game resource in assets directory.
                String gamePath = FileUtils.getGamePath("/cocos/game-flybird");
                AppActivity.launch(MainActivity.this, gamePath);
            }
        });

        findViewById(R.id.btn_brid).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Just add game resource into assets directory, then pack apk.
                String gamePath = FileUtils.getGamePath("/cocos/game-flybird-debug.apk");
                AppActivity.launch(MainActivity.this, gamePath);
            }
        });

        findViewById(R.id.btn_blackjack).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Like the previous sample
                String gamePath = FileUtils.getGamePath("/cocos/game-blackjack-debug.apk");
                AppActivity.launch(MainActivity.this, gamePath);
            }
        });
    }
}
