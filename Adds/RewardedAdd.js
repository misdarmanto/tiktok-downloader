import { AdMobRewarded } from "expo-ads-admob";

const test = "ca-app-pub-3940256099942544/5224354917";
const production = "ca-app-pub-8095237298596091/2956594969"
function RewardedAdd() {
  AdMobRewarded.setAdUnitID(production);
  AdMobRewarded.requestAdAsync().then(() => {
    AdMobRewarded.showAdAsync()
      .then(() => null)
      .catch((e) => console.log(e.message));
  });
}

export default RewardedAdd;
