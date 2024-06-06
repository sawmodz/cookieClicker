import Upgrade from "../UpgradeInterface.ts";
import { cookie } from "../../main.ts";
const upgradeContainer = document.getElementById("upgrade-container");

export default class MineUpgrade implements Upgrade {
  public bonus: number;
  public upgradeBaseCost: number;
  public upgradeMultiplier: number;
  public currentLevel: number;
  public upgradeCallback: Function;
  public interval: any;
  public realBaseCost: number;

  constructor() {
    this.bonus = 0;
    this.upgradeBaseCost = 12000;
    this.realBaseCost = 12000;
    this.upgradeMultiplier = 1.15;
    this.currentLevel = 0;
    this.upgradeCallback = () => {
      console.error("No callback defined");
    };

    this.setMyInterval();
  }

  setMyInterval = (): void => {
    if (this.interval) clearInterval(this.interval);

    this.interval = setInterval(() => {
      if (this.bonus <= 0) return;
      cookie.count += this.bonus;
      cookie.refreshUi();
    }, 1000);
  };

  addBonus = (bonus: number): void => {
    this.bonus += bonus;
    this.currentLevel += 1;
  };

  upgrade(numberOfUpgrade: number, cookieCount: number): number {
    if (cookieCount < this.upgradeBaseCost) {
      alert("Vous n'avez pas assez de cookies pour acheter cette amélioration");
      return cookieCount;
    }

    for (let i = 0; i < numberOfUpgrade; i++) {
      if (cookieCount >= this.upgradeBaseCost) {
        cookieCount -= this.upgradeBaseCost;
        this.upgradeBaseCost =
          this.realBaseCost *
          Math.pow(this.upgradeMultiplier, this.currentLevel);
        this.addBonus(47);
      }
    }

    this.refreshBox();

    return cookieCount;
  }

  removeBonus = (bonus: number): void => {
    this.bonus -= bonus;
  };

  getBonus = (): number => {
    return this.bonus;
  };

  showUpgrade = (): void => {
    upgradeContainer?.insertAdjacentHTML(
      "beforeend",
      `
    <div class="upgrade-component" id="mine-upgrade">
      <p class="upgrade-name">⛏️ Ferme (niveau ${this.currentLevel})</p>
      <p>Augmente la production de cookies de ${parseFloat(
        this.bonus.toString()
      ).toFixed(1)} par secondes</p>
      <button class="upgrade-button" id="mine-upgrade-button">
        Acheter 1 pour ${Math.floor(this.upgradeBaseCost)} cookies
      </button>
    </div>`
    );
  };

  getIdButton(): string {
    return "mine-upgrade-button";
  }

  refreshBox(): void {
    const cursorUpgrade = document.getElementById("mine-upgrade");
    cursorUpgrade?.remove();
    this.showUpgrade();
    this.setButtonHandler();
  }

  setButtonHandler(): void {
    const button = document.getElementById(this.getIdButton());
    button?.addEventListener("click", () => {
      this.upgradeCallback();
    });
  }

  saveAllData(): void {
    localStorage.setItem("mineUpgrade", JSON.stringify(this));
  }

  loadAllData(): void {
    const cursorUpgrade = localStorage.getItem("mineUpgrade");
    if (!cursorUpgrade) return;

    const upgrade = JSON.parse(cursorUpgrade);
    this.bonus = upgrade.bonus;
    this.upgradeBaseCost = upgrade.upgradeBaseCost;
    this.upgradeMultiplier = upgrade.upgradeMultiplier;
    this.currentLevel = upgrade.currentLevel;

    this.refreshBox();
  }
}
