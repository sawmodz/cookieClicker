export default interface UpgradeInterface {
  bonus: number;
  upgradeBaseCost: number;
  upgradeMultiplier: number;
  currentLevel: number;
  upgradeCallback: Function;
  realBaseCost: number;

  addBonus(bonus: number): void;
  removeBonus(bonus: number): void;
  getBonus(): number;
  showUpgrade(): void;
  upgrade(numberOfUpgrade: number, cookieCount: number): number;
  getIdButton(): string;
  refreshBox(): void;
  setButtonHandler(): void;
  saveAllData(): void;
  loadAllData(): void;
}
