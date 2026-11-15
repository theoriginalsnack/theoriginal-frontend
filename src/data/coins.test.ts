import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeOrderCoins } from './coins.ts';

const base = { walletCoins: 0, isLoggedIn: true, wantInstant: true, wantVoucher: false };

test('two products earn 166, instant discount uses 100, 66 go to wallet', () => {
  const r = computeOrderCoins({ ...base, uniqueProducts: 2 });
  assert.equal(r.earned, 166);
  assert.equal(r.instantDiscount, 10);
  assert.equal(r.toWallet, 66);
  assert.equal(r.walletDelta, 66);
});

test('one product (83) needs 17 from the wallet for the instant discount', () => {
  assert.equal(computeOrderCoins({ ...base, uniqueProducts: 1 }).canUseInstant, false);
  const r = computeOrderCoins({ ...base, uniqueProducts: 1, walletCoins: 17 });
  assert.equal(r.canUseInstant, true);
  assert.equal(r.walletDelta, -17);
});

test('guests cannot top up from a wallet', () => {
  const r = computeOrderCoins({ ...base, uniqueProducts: 1, walletCoins: 500, isLoggedIn: false });
  assert.equal(r.canUseInstant, false);
  assert.equal(r.walletDelta, 83);
});

test('voucher spends 5,000 and the instant shortfall must fit in what is left', () => {
  const ok = computeOrderCoins({ ...base, uniqueProducts: 1, walletCoins: 5017, wantVoucher: true });
  assert.equal(ok.voucherDiscount, 500);
  assert.equal(ok.walletDelta, 83 - 100 - 5000);
  const tight = computeOrderCoins({ ...base, uniqueProducts: 1, walletCoins: 5010, wantVoucher: true });
  assert.equal(tight.canUseInstant, false);
  assert.equal(tight.walletDelta, 83 - 5000);
});

test('voucher is ignored when the balance is below 5,000', () => {
  const r = computeOrderCoins({ ...base, uniqueProducts: 3, walletCoins: 4999, wantVoucher: true });
  assert.equal(r.voucherDiscount, 0);
});
