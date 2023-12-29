export interface IAttachmentData {
  Records: IRecord[];
}
export interface IRecord {
  eventVersion: string;
  ses: ISes;
  eventSource: string;
}

export interface ISes {
  receipt: IReceipt;
  mail: IMail;
}

export interface IReceipt {
  timestamp: string;
  processingTimeMillis: number;
  recipients: string[];
  spamVerdict: ISpamVerdict;
  virusVerdict: IVirusVerdict;
  spfVerdict: ISpfVerdict;
  dkimVerdict: IDkimVerdict;
  dmarcVerdict: IDmarcVerdict;
  dmarcPolicy: string;
  action: IAction;
}

export interface ISpamVerdict {
  status: string;
}

export interface IVirusVerdict {
  status: string;
}

export interface ISpfVerdict {
  status: string;
}

export interface IDkimVerdict {
  status: string;
}

export interface IDmarcVerdict {
  status: string;
}

export interface IAction {
  type: string;
  topicArn: string;
}

export interface IMail {
  timestamp: string;
  source: string;
  messageId: string;
  destination: string[];
  headersTruncated: boolean;
  headers: IHeader[];
  commonHeaders: ICommonHeaders;
}

export interface IHeader {
  name: string;
  value: string;
}

export interface ICommonHeaders {
  returnPath: string;
  from: string[];
  date: string;
  to: string[];
  messageId: string;
  subject: string;
}
