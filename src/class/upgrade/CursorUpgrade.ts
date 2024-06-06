import Upgrade from "../UpgradeInterface.ts";
const upgradeContainer = document.getElementById("upgrade-container");

export default class CursorUpgrade implements Upgrade {
  public bonus: number;
  public upgradeBaseCost: number;
  public upgradeMultiplier: number;
  public currentLevel: number;
  public upgradeCallback: Function;
  public realBaseCost: number;

  constructor() {
    this.bonus = 0;
    this.upgradeBaseCost = 15;
    this.realBaseCost = 15;
    this.upgradeMultiplier = 1.15;
    this.currentLevel = 0;
    this.upgradeCallback = () => {
      console.error("No callback defined");
    };
  }

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
        this.addBonus(1);
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
    <div class="upgrade-component" id="cursor-upgrade">
      <p class="upgrade-name">🖱️ Curseur (niveau ${this.currentLevel})</p>
      <p>Augmente la production de cookies de ${parseFloat(
        this.bonus.toString()
      ).toFixed(1)} par clic</p>
      <button class="upgrade-button" id="cursor-upgrade-button">
        Acheter 1 pour ${Math.floor(this.upgradeBaseCost)} cookies
      </button>
    </div>`
    );
  };

  getIdButton(): string {
    return "cursor-upgrade-button";
  }

  refreshBox(): void {
    const cursorUpgrade = document.getElementById("cursor-upgrade");
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
    localStorage.setItem("cursorUpgrade", JSON.stringify(this));
  }

  loadAllData(): void {
    const cursorUpgrade = localStorage.getItem("cursorUpgrade");
    if (cursorUpgrade) {
      const cursorUpgradeData = JSON.parse(cursorUpgrade);
      this.bonus = cursorUpgradeData.bonus;
      this.upgradeBaseCost = cursorUpgradeData.upgradeBaseCost;
      this.upgradeMultiplier = cursorUpgradeData.upgradeMultiplier;
      this.currentLevel = cursorUpgradeData.currentLevel;
    }

    this.refreshBox();
  }
}
