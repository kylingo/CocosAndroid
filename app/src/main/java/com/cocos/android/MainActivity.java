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

        findViewById(R.id.btn_brid).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String gamePath = FileUtils.getGamePath("/cocos/game-flybird-debug.apk");
                AppActivity.launch(MainActivity.this, gamePath);
            }
        });

        findViewById(R.id.btn_blackjack).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String gamePath = FileUtils.getGamePath("/cocos/game-blackjack-debug.apk");
                AppActivity.launch(MainActivity.this, gamePath);
            }
        });
    }
}
