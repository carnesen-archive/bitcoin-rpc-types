export type Result = {
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
