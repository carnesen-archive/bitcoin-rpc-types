export type GetBestBlockHashParams = never;
export type GetBestBlockHashResult = string;

export type GetBlockParams<V extends 0 | 1 | 2> = {
  blockhash: string;
  verbose?: V;
};
export type GetBlockResult0 = string;
export type GetBlockResult1 = {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: string[];
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  nextblockhash: string;
};

export interface Vin {
  coinbase?: string;
  sequence: number;
  txid?: string;
  vout?: number;
  scriptSig?: ScriptSig;
}

export type ScriptSig = {
  asm: string;
  hex: string;
};

export interface ScriptPubKey {
  asm: string;
  hex: string;
  reqSigs?: number;
  type: string;
  addresses?: string[];
}

export type Vout = {
  value: number;
  n: number;
  scriptPubKey: ScriptPubKey;
};

export type Tx = {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: Vin[];
  vout: Vout[];
  hex: string;
};

export type GetBlockResult2 = {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: Tx[];
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  nextblockhash: string;
};

export type GetBlockResult<V> = V extends 0
  ? GetBlockResult0
  : V extends 1 ? GetBlockResult1 : V extends 2 ? GetBlockResult2 : GetBlockResult1;

type Bit9SoftFork = {
  status: string;
  startTime: number;
  timeout: number;
  since: number;
};

type SoftFork = {
  id: string;
  version: number;
  reject: Reject;
};

export type GetBlockchainInfoParams = never;
export type GetBlockchainInfoResult = {
  chain: string;
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  mediantime: number;
  verificationprogress: number;
  initialblockdownload: boolean;
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
  softforks: SoftFork[];
  bip9_softforks: {
    csv: Bit9SoftFork;
    segwit: Bit9SoftFork;
  };
  warnings: string;
};

export interface Reject {
  status: boolean;
}

export type GetBlockHashParams = {
  height: number;
};
export type GetBlockHashResult = string;

export type GetNetworkInfoParams = never;
export type GetNetworkInfoResult = {
  version: number;
  subversion: string;
  protocolversion: number;
  localservices: string;
  localrelay: boolean;
  timeoffset: number;
  networkactive: boolean;
  connections: number;
  networks: {
    name: string;
    limited: boolean;
    reachable: boolean;
    proxy: string;
    proxy_randomize_credentials: boolean;
  }[];
  relayfee: number;
  incrementalfee: number;
  localaddresses: unknown[];
  warnings: string;
};

export type GetWalletInfoParams = never;
export type GetWalletInfoResult = {
  walletname: string;
  walletversion: number;
  balance: number;
  unconfirmed_balance: number;
  immature_balance: number;
  txcount: number;
  keypoololdest: number;
  keypoolsize: number;
  paytxfee: number;
  hdseedid: string;
  hdmasterkeyid: string;
  private_keys_enabled: boolean;
};
