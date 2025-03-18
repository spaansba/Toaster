import BugReportSetting from "@/components/profile/user_settings/bug_report/BugReportSetting"
import LogoutButton from "@/components/profile/user_settings/LogoutButton"
import SettingMenuItem from "@/components/profile/user_settings/SettingMenuItem"
import UserSettingProfileHeader from "@/components/profile/user_settings/UserSettingProfileHeader"
import { View, ScrollView } from "react-native"
import { KeyboardToolbar } from "react-native-keyboard-controller"

export default function UserSettingsScreen() {
  return (
    <View className="flex-1 bg-primary-200">
      <ScrollView>
        <UserSettingProfileHeader />

        <View>
          <SettingMenuItem ionIcon="person" label="Account" onPress={() => {}} />
          <BugReportSetting />

          <SettingMenuItem
            ionIcon="bulb"
            label="Request a Feature"
            onPress={() => {
              /* navigate to feature request form */
            }}
          />

          <LogoutButton />
        </View>
      </ScrollView>
    </View>
  )
}
