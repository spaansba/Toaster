import BugReportSetting from "@/components/profile/user_settings/bug_report/BugReportSetting"
import Divider from "@/components/profile/user_settings/Divider"
import LogoutButton from "@/components/profile/user_settings/LogoutButton"
import SettingMenuItem from "@/components/profile/user_settings/SettingMenuItem"
import UserSettingProfileHeader from "@/components/profile/user_settings/UserSettingProfileHeader"
import { ScrollView, View } from "react-native"

export default function UserSettingsScreen() {
  return (
    <View className="flex-1 bg-primary-200 py-5">
      <UserSettingProfileHeader />
      <Divider />

      <SettingMenuItem ionIcon="person" label="Account" onPress={() => {}} />
      <BugReportSetting />
      <SettingMenuItem
        ionIcon="bulb"
        label="Request a Feature"
        onPress={() => {
          /* navigate to feature request form */
        }}
      />

      <Divider />
      <LogoutButton />
    </View>
  )
}
