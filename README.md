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
    cp from proj.android-studio, like jni directory
- Android.mk
    compile cocos2djs native library

## Script



