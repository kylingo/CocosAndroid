package com.cocos.android;

import com.cocos.android.utils.FileUtils;
import com.me.ui.library.sample.SampleFragment;

import org.cocos2dx.javascript.AppActivity;

import java.util.List;

/**
 * @author kylingo on 18/7/5
 */
public class MainFragment extends SampleFragment<String> {

    @Override
    protected void addItems(List<String> items) {
        items.add("愤怒的小鸟");
        items.add("二十一点");
    }

    @Override
    protected void onClickItem(String item) {
        switch (item) {
            case "愤怒的小鸟": {
                String gamePath = FileUtils.getGamePath(getActivity(), FileUtils.GAME_FLY_BIRD);
                AppActivity.launch(getActivity(), gamePath);
                break;
            }

            case "二十一点": {
                String gamePath = FileUtils.getGamePath(getActivity(), FileUtils.GAME_BLACKJACK);
                AppActivity.launch(getActivity(), gamePath);
                break;
            }
        }
    }
}
