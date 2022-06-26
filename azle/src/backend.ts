import {
  Query,
  ic,
  Heartbeat,
  Update,
  nat,
  Principal,
  nat8,
  Opt,
  nat32,
  Init,
  UpdateAsync,
  Stable,
  PreUpgrade,
  PostUpgrade,
  Variant,
} from "azle";

let tickerCount = 0n;

export function getTicks(): Query<nat> {
  return tickerCount;
}

export function tick(): Update<void> {
  tickerCount = tickerCount + 1n;
}
