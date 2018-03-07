## Cocos Android
Android dynamic load cocos create game framework.

## Structure
- libcocos2dx
- libcocos2djs
- script

## Libcocos2dx
- Java files
    cp from /Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/platform/android/java/src
- Jar files
    cp from /Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/platform/android/java/libs
- Load game resource
    Need modify default game resource from assets to custom!!!

## Libcocos2djs
Just contain jni files, ndk compile output libcocos2djs.so file.

- Classes
    cp from jsb-binary/frameworks/runtime-src/Classes
- hellojavascript
    cp from proj.android-studio/app/jni
- Android.mk
    compile cocos2djs native library

## Game pack
- res, src, main.js, project.json copy from ${buildDir}/../../../../../
- script copy from "/Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/scripting/js-bindings/script"

## Test
See MainActivity in app module, support apk or zip file.
- Open storage read and write permission
- cp output/game-xxx.apk to /mnt/sdcard/cocos/
- or cp output/game-xxx.zip to /mnt/sdcard/cocos/
- run app module as apk

## Issue
- decrypt AppDelegate.cpp jsb_set_xxtea_key("key-value")
- game back key handle

## Patch for cocos android
- Dynamic load game
```
// Load game by AssetManager.addAssetPath method
public static boolean addAssetPath(Activity activity, String path) {
    try {
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
```

- Disable check task root
```
protected final static boolean IS_CHECK_ROOT = false;

if (IS_CHECK_ROOT && !isTaskRoot()) {
    // Android launched another instance of the root activity into an existing task
    //  so just quietly finish and go away, dropping the user back into the activity
    //  at the top of the stack (ie: the last state of this task)
    // Don't need to finish it again since it's finished in super.onCreate .
    return;
}
```

- Disable decrypt js
```
// Modify AppDelegate.cpp, need dynamic set decrypt key
// jsb_set_xxtea_key("3b4139a4-456c-42");
```



