import ToasterInput from "@/components/ToasterInput"
import { useForm } from "@tanstack/react-form"
import React, { useState } from "react"
import { Pressable, View } from "react-native"
import SettingMenuItem from "../SettingMenuItem"
import { KeyboardAvoidingView, KeyboardToolbar } from "react-native-keyboard-controller"
import SettingModalWrapper from "../SettingModalWrapper"
const BugReportSetting = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const form = useForm({
    onSubmit: async ({ value }) => {
      console.log(value)
    },
    defaultValues: {
      title: "",
      body: "",
      email: "",
    },
  })

  return (
    <>
      <SettingMenuItem
        ionIcon="bug"
        label="Report a Bug"
        onPress={() => {
          setIsModalVisible(true)
        }}
      />
      <SettingModalWrapper
        label="Bug Report"
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <form.Field
          name="email"
          children={(field) => (
            <View className="">
              <ToasterInput
                label="What mail address can we reach you?"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChangeText={field.handleChange}
                placeholder="example@toaster.com"
                spellCheck={true}
                textContentType="emailAddress"
              />
            </View>
          )}
        />
        <form.Field
          name="title"
          children={(field) => (
            <View className="">
              <ToasterInput
                label="Title"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChangeText={field.handleChange}
                importantForAutofill="no"
                spellCheck={true}
                textContentType="none"
              />
            </View>
          )}
        />
        <form.Field
          name="body"
          children={(field) => (
            <View className="">
              <ToasterInput
                className="h-[150px] align-top px-4 py-4"
                multiline={true}
                label="Detail of the bug"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChangeText={field.handleChange}
                importantForAutofill="no"
                placeholder="Description of the bug in full detail"
                spellCheck={true}
                textContentType="none"
              />
            </View>
          )}
        />

        {/* <Pressable
          className="size-20 bg-black"
          onPress={() => console.log(form.fieldInfo.title)}
        ></Pressable> */}
      </SettingModalWrapper>
    </>
  )
}

export default BugReportSetting
