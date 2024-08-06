export interface EDI_DC40 {
  SEGMENT: string;
  DOCNUM: string;
  DOCREL: string;
  IDOCTYP: string;
  CIMTYP: string;
  MESTYP: string;
  MESCOD: string;
  SNDPRN: string;
  RCVPRN: string;
  CREDAT: string;
  CRETIM: string;
}

export interface E1RESBL {
  SEGMENT: string;
  POSNR: string;
  DISPENSESTEP: string;
  BOMMATNR: string;
  BDMNG: string;
  BOMMEINS: string;
  Z1RESBL:
    | {
        SEGMENT: string;
        RESCHARG: string;
        RESQTY: string;
        RMEINS: string;
        LPNNUM: string;
      }
    | {
        SEGMENT: string;
        RESCHARG: string;
        RESQTY: string;
        RMEINS: string;
        LPNNUM: string;
      }[];
}

export interface E1AFVOL {
  SEGMENT: string;
  VORNR: string;
  LTXA1: string;
  ARBID: string;
  SUBLOT: string;
  OWNER: string;
  E1RESBL: E1RESBL[];
}

export interface E1AFKOL {
  SEGMENT: string;
  WERKS: string;
  AUFNR: string;
  AUTYP: string;
  MATNR: string;
  CHARG: string;
  GAMNG: string;
  GMEIN: string;
  GLTRS: string;
  GLUZS: string;
  GSTRS: string;
  GSUZS: string;
  MMOLINES: string;
  E1JSTKL: {
    SEGMENT: string;
    STAT: string;
  };
  E1AFVOL: E1AFVOL[];
}

export interface Data {
  EDI_DC40: EDI_DC40;
  E1AFKOL: E1AFKOL;
}
