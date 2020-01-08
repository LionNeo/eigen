import { Button } from "@artsy/palette"
import Serif from "lib/Components/Text/Serif"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import React from "react"
import { NativeModules, TouchableWithoutFeedback } from "react-native"

export default class MyProfile extends React.Component {
  render() {
    return (
      <>
        <Serif>TODO: Implement this according to designs. See: MX-141.</Serif>
        <TouchableWithoutFeedback onPress={() => SwitchBoard.presentNavigationViewController(this, "privacy-request")}>
          <Serif>Take me to the new privacy view controller</Serif>
        </TouchableWithoutFeedback>
        <Button
          variant="primaryBlack"
          onPress={() => NativeModules.ARNotificationsManager.postNotificationName("ARUserRequestedLogout", {})}
        >
          Logout
        </Button>
      </>
    )
  }
}
