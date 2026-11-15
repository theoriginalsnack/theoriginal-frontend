// Original Coins rules: single source for all wallet maths.
export const COINS_PER_ITEM = 83;        // Earned per unique product in an order
export const WELCOME_COINS = 100;        // Credited on first sign-in
export const INSTANT_DISCOUNT_COINS = 100; // 100 Coins = ₹10 off at checkout
export const INSTANT_DISCOUNT_RUPEES = 10;
export const REDEEM_THRESHOLD = 5000;    // 5,000 Coins unlock the voucher
export const REDEEM_DISCOUNT = 500;      // Voucher value in ₹

export const coinsToRupees = (coins: number) =>
  Math.round((coins / INSTANT_DISCOUNT_COINS) * INSTANT_DISCOUNT_RUPEES);

/**
 * Coin maths for one checkout.
 * The ₹10 instant discount spends 100 Coins: this order's earned coins first,
 * any shortfall from the member's wallet (after the voucher, if used).
 */
export function computeOrderCoins(o: {
  uniqueProducts: number;
  walletCoins: number;
  isLoggedIn: boolean;
  wantInstant: boolean;
  wantVoucher: boolean;
}) {
  const earned = o.uniqueProducts * COINS_PER_ITEM;
  const voucherCoins =
    o.isLoggedIn && o.wantVoucher && o.walletCoins >= REDEEM_THRESHOLD ? REDEEM_THRESHOLD : 0;
  const shortfall = Math.max(0, INSTANT_DISCOUNT_COINS - earned);
  const canUseInstant =
    o.uniqueProducts > 0 &&
    (shortfall === 0 || (o.isLoggedIn && o.walletCoins - voucherCoins >= shortfall));
  const instantCoins = canUseInstant && o.wantInstant ? INSTANT_DISCOUNT_COINS : 0;

  return {
    earned,
    canUseInstant,
    instantCoins,
    instantDiscount: instantCoins ? INSTANT_DISCOUNT_RUPEES : 0,
    voucherCoins,
    voucherDiscount: voucherCoins ? REDEEM_DISCOUNT : 0,
    /** Earned coins left after the instant discount (what the UI calls "rest +N coins"). */
    toWallet: Math.max(0, earned - instantCoins),
    /** Net change to a signed-in member's balance (may be negative). */
    walletDelta: earned - instantCoins - voucherCoins,
  };
}
