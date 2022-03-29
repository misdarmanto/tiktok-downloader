import { AdMobInterstitial } from "expo-ads-admob";

const test = "ca-app-pub-3940256099942544/1033173712"
const production = "ca-app-pub-8095237298596091/9947177592"

export default function interstitialAdd() {
  AdMobInterstitial.setAdUnitID(production);
  AdMobInterstitial.requestAdAsync().then(() => {
    AdMobInterstitial.showAdAsync()
      .then(() => null)
      .catch((e) => console.log(e));
  });
}


