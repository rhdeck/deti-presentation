import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getTicks' : ActorMethod<[], bigint>,
  'tick' : ActorMethod<[], undefined>,
}
