import CursorUpgrade from "./upgrade/CursorUpgrade.ts";
import GrandMaUpgrade from "./upgrade/GrandMaUpgrade.ts";
import FarmUpgrade from "./upgrade/FarmUpgrade.ts";
import MineUpgrade from "./upgrade/MineUpgrade.ts";
import FactoryUpgrade from "./upgrade/FactoryUpgrade.ts";
import Upgrade from "./UpgradeInterface.ts";

export default class Cookie {
  public cookieElement: HTMLElement | null;
  public countElement: HTMLElement | null;
  public cliqueData: HTMLElement | null;
  public secondsData: HTMLElement | null;

  public cursorUpgrade: CursorUpgrade;
  public grandMaUpgrade: GrandMaUpgrade;
  public farmUpgrade: FarmUpgrade;
  public mineUpgrade: MineUpgrade;
  public factoryUpgrade: FactoryUpgrade;

  constructor(public count: number, public id: string) {
    this.count = count;
    this.id = id;
    this.cookieElement = document.getElementById(id);
    this.countElement = document.getElementById("cookie-count");
    this.cliqueData = document.getElementById("clique-data");
    this.secondsData = document.getElementById("seconds-data");

    this.cursorUpgrade = new CursorUpgrade();
    this.grandMaUpgrade = new GrandMaUpgrade();
    this.farmUpgrade = new FarmUpgrade();
    this.mineUpgrade = new MineUpgrade();
    this.factoryUpgrade = new FactoryUpgrade();

    this.init();
  }

  init = (): void => {
    this.cookieElement?.addEventListener("click", this.onClick);

    this.refreshUi();
  };

  onClick = (): void => {
    this.count += 1 + this.cursorUpgrade.getBonus();

    this.refreshUi();
    this.playCookieAnimation();
  };

  playCookieAnimation = (): void => {
    this.cookieElement?.classList.add("cookie-clicked");

    setTimeout(() => {
      this.cookieElement?.classList.remove("cookie-clicked");
    }, 100);
  };

  refreshUi = (): void => {
    if (this.countElement)
      this.countElement.innerText = Math.floor(this.count).toString();

    if (this.cliqueData)
      this.cliqueData.innerText = parseFloat(
        (1 + this.cursorUpgrade.getBonus()).toString()
      ).toFixed(2);

    if (this.secondsData)
      this.secondsData.innerText = parseFloat(
        (
          this.grandMaUpgrade.getBonus() +
          this.farmUpgrade.getBonus() +
          this.mineUpgrade.getBonus() +
          this.factoryUpgrade.getBonus()
        ).toString()
      ).toFixed(2);
  };

  getAllUpgrade(): Array<Upgrade> {
    return [
      this.cursorUpgrade,
      this.grandMaUpgrade,
      this.farmUpgrade,
      this.mineUpgrade,
      this.factoryUpgrade,
    ];
  }

  saveAllData(): void {
    localStorage.setItem("cookie", JSON.stringify(this));

    this.cursorUpgrade.saveAllData();
    this.grandMaUpgrade.saveAllData();
    this.farmUpgrade.saveAllData();
    this.mineUpgrade.saveAllData();
    this.factoryUpgrade.saveAllData();
  }

  loadAllData(): void {
    const data = localStorage.getItem("cookie");
    if (data) {
      const parsedData = JSON.parse(data);
      this.count = parsedData.count;
    }

    this.cursorUpgrade.loadAllData();
    this.grandMaUpgrade.loadAllData();
    this.farmUpgrade.loadAllData();
    this.mineUpgrade.loadAllData();
    this.factoryUpgrade.loadAllData();

    this.refreshUi();
  }

  resetData(): void {
    localStorage.clear();
  }
}
