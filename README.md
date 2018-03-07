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





