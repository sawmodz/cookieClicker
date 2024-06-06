import Cookie from "./class/Cookie.ts";
import Upgrade from "./class/UpgradeInterface.ts";

export const cookie = new Cookie(100, "cookie-image");
const saveButton = document.getElementById("save");
const loadButton = document.getElementById("load");
const resetButton = document.getElementById("reset");

let allUpgrade: Array<Upgrade> = cookie.getAllUpgrade();

allUpgrade.forEach((upgrade) => {
  upgrade.showUpgrade();
  upgrade.upgradeCallback = () => {
    const cookieCountUpdrated: number = upgrade.upgrade(1, cookie.count);
    cookie.count = cookieCountUpdrated;
    cookie.refreshUi();
  };
  upgrade.setButtonHandler();
});

saveButton?.addEventListener("click", () => {
  cookie.saveAllData();
});

loadButton?.addEventListener("click", () => {
  cookie.loadAllData();
});

resetButton?.addEventListener("click", () => {
  cookie.resetData();
});
