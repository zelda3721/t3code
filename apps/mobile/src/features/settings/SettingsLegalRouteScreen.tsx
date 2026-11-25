import license from "@t3tools/mobile-third-party-licenses/license.json";
import { useGT } from "gt-react-native";

import { AppText } from "../../components/ui/AppText";
import { ScreenScrollView } from "../../components/ui/ScreenScrollView";
import { SettingsScreen } from "./components/SettingsScreen";

export function SettingsLegalRouteScreen() {
  const gt = useGT();
  return (
    <SettingsScreen title={gt("Legal", { $context: "legal documents page title" })}>
      <ScreenScrollView contentInsetAdjustmentBehavior="automatic" contentContainerClassName="p-5">
        <AppText selectable className="text-base leading-normal text-foreground">
          {license}
        </AppText>
      </ScreenScrollView>
    </SettingsScreen>
  );
}
