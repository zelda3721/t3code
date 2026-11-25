const { withEntitlementsPlist } = require("expo/config-plugins");

module.exports = function withoutIosPersonalTeamCapabilities(config, { personalTeam }) {
  return withEntitlementsPlist(config, (modConfig) => {
    delete modConfig.modResults["aps-environment"];
    delete modConfig.modResults["com.apple.developer.applesignin"];
    if (personalTeam) delete modConfig.modResults["com.apple.security.application-groups"];
    return modConfig;
  });
};
