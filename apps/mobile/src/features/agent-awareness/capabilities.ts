import { resolveCloudPublicConfig } from "../cloud/publicConfig";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { supportsAndroidAgentNotifications } from "./androidNotifications";

export function supportsAgentAwarenessPush() {
  if (!resolveCloudPublicConfig().relay.url) return false;
  return Platform.OS === "android"
    ? supportsAndroidAgentNotifications()
    : Platform.OS === "ios" && Constants.expoConfig?.extra?.iosPersonalTeamBuild !== true;
}
