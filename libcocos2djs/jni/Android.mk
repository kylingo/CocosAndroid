LOCAL_PATH := $(call my-dir)
LOCAL_CLASS_PATH := $(LOCAL_PATH)/Classes

include $(CLEAR_VARS)

LOCAL_MODULE := cocos2djs_shared

LOCAL_MODULE_FILENAME := libcocos2djs

ifeq ($(USE_ARM_MODE),1)
LOCAL_ARM_MODE := arm
endif

LOCAL_SRC_FILES := \
$(LOCAL_CLASS_PATH)/AppDelegate.cpp \
$(LOCAL_CLASS_PATH)/jsb_module_register.cpp \
hellojavascript/main.cpp \

LOCAL_C_INCLUDES := $(LOCAL_CLASS_PATH)

ifeq ($(USE_ANY_SDK),1)
LOCAL_SRC_FILES += $(LOCAL_CLASS_PATH)/anysdk/SDKManager.cpp \
	$(LOCAL_CLASS_PATH)/Classes/anysdk/jsb_anysdk_basic_conversions.cpp \
	$(LOCAL_CLASS_PATH)/Classes/anysdk/manualanysdkbindings.cpp \
	$(LOCAL_CLASS_PATH)/Classes/anysdk/jsb_anysdk_protocols_auto.cpp

LOCAL_C_INCLUDES += $(LOCAL_CLASS_PATH)/anysdk

LOCAL_WHOLE_STATIC_LIBRARIES := PluginProtocolStatic
endif


LOCAL_STATIC_LIBRARIES := cocos2d_js_static

include $(BUILD_SHARED_LIBRARY)


$(call import-module,scripting/js-bindings/proj.android/prebuilt-mk)
