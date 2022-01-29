import * as Constants from "expo-constants";

global.config = {
  host: "http://" + Constants.default.manifest.hostUri.split(":")[0] + ":5000",
};
