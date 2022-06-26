export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getTicks' : IDL.Func([], [IDL.Nat], ['query']),
    'tick' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
