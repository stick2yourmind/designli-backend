export interface IEmailParseMapped {
  spam: boolean;
  virus: boolean;
  dns: boolean;
  mes: string;
  retrasado: boolean;
  emisor: string;
  receptor: string[];
}
