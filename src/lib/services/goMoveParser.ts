function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

const MOVE_TO_ID = {
  'aa': 1,
  'ba': 2,
  'ca': 3,
  'da': 4,
  'ea': 5,
  'fa': 6,
  'ga': 7,
  'ha': 8,
  'ia': 9,
  'ja': 10,
  'ka': 11,
  'la': 12,
  'ma': 13,
  'na': 14,
  'oa': 15,
  'pa': 16,
  'qa': 17,
  'ra': 18,
  'sa': 19,

  'ab': 20,
  'bb': 21,
  'cb': 22,
  'db': 23,
  'eb': 24,
  'fb': 25,
  'gb': 26,
  'hb': 27,
  'ib': 28,
  'jb': 29,
  'kb': 30,
  'lb': 31,
  'mb': 32,
  'nb': 33,
  'ob': 34,
  'pb': 35,
  'qb': 36,
  'rb': 37,
  'sb': 38,

  'ac': 39,
  'bc': 40,
  'cc': 41,
  'dc': 42,
  'ec': 43,
  'fc': 44,
  'gc': 45,
  'hc': 46,
  'ic': 47,
  'jc': 48,
  'kc': 49,
  'lc': 50,
  'mc': 51,
  'nc': 52,
  'oc': 53,
  'pc': 54,
  'qc': 55,
  'rc': 56,
  'sc': 57,

  'ad': 58,
  'bd': 59,
  'cd': 60,
  'dd': 61,
  'ed': 62,
  'fd': 63,
  'gd': 64,
  'hd': 65,
  'id': 66,
  'jd': 67,
  'kd': 68,
  'ld': 69,
  'md': 70,
  'nd': 71,
  'od': 72,
  'pd': 73,
  'qd': 74,
  'rd': 75,
  'sd': 76,

  'ae': 77,
  'be': 78,
  'ce': 79,
  'de': 80,
  'ee': 81,
  'fe': 82,
  'ge': 83,
  'he': 84,
  'ie': 85,
  'je': 86,
  'ke': 87,
  'le': 88,
  'me': 89,
  'ne': 90,
  'oe': 91,
  'pe': 92,
  'qe': 93,
  're': 94,
  'se': 95,

  'af': 96,
  'bf': 97,
  'cf': 98,
  'df': 99,
  'ef': 100,
  'ff': 101,
  'gf': 102,
  'hf': 103,
  'if': 104,
  'jf': 105,
  'kf': 106,
  'lf': 107,
  'mf': 108,
  'nf': 109,
  'of': 110,
  'pf': 111,
  'qf': 112,
  'rf': 113,
  'sf': 114,

  'ag': 115,
  'bg': 116,
  'cg': 117,
  'dg': 118,
  'eg': 119,
  'fg': 120,
  'gg': 121,
  'hg': 122,
  'ig': 123,
  'jg': 124,
  'kg': 125,
  'lg': 126,
  'mg': 127,
  'ng': 128,
  'og': 129,
  'pg': 130,
  'qg': 131,
  'rg': 132,
  'sg': 133,

  'ah': 134,
  'bh': 135,
  'ch': 136,
  'dh': 137,
  'eh': 138,
  'fh': 139,
  'gh': 140,
  'hh': 141,
  'ih': 142,
  'jh': 143,
  'kh': 144,
  'lh': 145,
  'mh': 146,
  'nh': 147,
  'oh': 148,
  'ph': 149,
  'qh': 150,
  'rh': 151,
  'sh': 152,

  'ai': 153,
  'bi': 154,
  'ci': 155,
  'di': 156,
  'ei': 157,
  'fi': 158,
  'gi': 159,
  'hi': 160,
  'ii': 161,
  'ji': 162,
  'ki': 163,
  'li': 164,
  'mi': 165,
  'ni': 166,
  'oi': 167,
  'pi': 168,
  'qi': 169,
  'ri': 170,
  'si': 171,

  'aj': 172,
  'bj': 173,
  'cj': 174,
  'dj': 175,
  'ej': 176,
  'fj': 177,
  'gj': 178,
  'hj': 179,
  'ij': 180,
  'jj': 181,
  'kj': 182,
  'lj': 183,
  'mj': 184,
  'nj': 185,
  'oj': 186,
  'pj': 187,
  'qj': 188,
  'rj': 189,
  'sj': 190,

  'ak': 191,
  'bk': 192,
  'ck': 193,
  'dk': 194,
  'ek': 195,
  'fk': 196,
  'gk': 197,
  'hk': 198,
  'ik': 199,
  'jk': 200,
  'kk': 201,
  'lk': 202,
  'mk': 203,
  'nk': 204,
  'ok': 205,
  'pk': 206,
  'qk': 207,
  'rk': 208,
  'sk': 209,

  'al': 210,
  'bl': 211,
  'cl': 212,
  'dl': 213,
  'el': 214,
  'fl': 215,
  'gl': 216,
  'hl': 217,
  'il': 218,
  'jl': 219,
  'kl': 220,
  'll': 221,
  'ml': 222,
  'nl': 223,
  'ol': 224,
  'pl': 225,
  'ql': 226,
  'rl': 227,
  'sl': 228,

  'am': 229,
  'bm': 230,
  'cm': 231,
  'dm': 232,
  'em': 233,
  'fm': 234,
  'gm': 235,
  'hm': 236,
  'im': 237,
  'jm': 238,
  'km': 239,
  'lm': 240,
  'mm': 241,
  'nm': 242,
  'om': 243,
  'pm': 244,
  'qm': 245,
  'rm': 246,
  'sm': 247,

  'an': 248,
  'bn': 249,
  'cn': 250,
  'dn': 251,
  'en': 252,
  'fn': 253,
  'gn': 254,
  'hn': 255,
  'in': 256,
  'jn': 257,
  'kn': 258,
  'ln': 259,
  'mn': 260,
  'nn': 261,
  'on': 262,
  'pn': 263,
  'qn': 264,
  'rn': 265,
  'sn': 266,

  'ao': 267,
  'bo': 268,
  'co': 269,
  'do': 270,
  'eo': 271,
  'fo': 272,
  'go': 273,
  'ho': 274,
  'io': 275,
  'jo': 276,
  'ko': 277,
  'lo': 278,
  'mo': 279,
  'no': 280,
  'oo': 281,
  'po': 282,
  'qo': 283,
  'ro': 284,
  'so': 285,

  'ap': 286,
  'bp': 287,
  'cp': 288,
  'dp': 289,
  'ep': 290,
  'fp': 291,
  'gp': 292,
  'hp': 293,
  'ip': 294,
  'jp': 295,
  'kp': 296,
  'lp': 297,
  'mp': 298,
  'np': 299,
  'op': 300,
  'pp': 301,
  'qp': 302,
  'rp': 303,
  'sp': 304,

  'aq': 305,
  'bq': 306,
  'cq': 307,
  'dq': 308,
  'eq': 309,
  'fq': 310,
  'gq': 311,
  'hq': 312,
  'iq': 313,
  'jq': 314,
  'kq': 315,
  'lq': 316,
  'mq': 317,
  'nq': 318,
  'oq': 319,
  'pq': 320,
  'qq': 321,
  'rq': 322,
  'sq': 323,

  'ar': 324,
  'br': 325,
  'cr': 326,
  'dr': 327,
  'er': 328,
  'fr': 329,
  'gr': 330,
  'hr': 331,
  'ir': 332,
  'jr': 333,
  'kr': 334,
  'lr': 335,
  'mr': 336,
  'nr': 337,
  'or': 338,
  'pr': 339,
  'qr': 340,
  'rr': 341,
  'sr': 342,

  'as': 343,
  'bs': 344,
  'cs': 345,
  'ds': 346,
  'es': 347,
  'fs': 348,
  'gs': 349,
  'hs': 350,
  'is': 351,
  'js': 352,
  'ks': 353,
  'ls': 354,
  'ms': 355,
  'ns': 356,
  'os': 357,
  'ps': 358,
  'qs': 359,
  'rs': 360,
  'ss': 361
};

const goMoveParser = function(move: string) {
  let sanitisedMove = move.trim();
  if (hasKey(MOVE_TO_ID, sanitisedMove)) {
    return { pointId: MOVE_TO_ID[sanitisedMove] };
  } else {
    return null;
  }
};

export default goMoveParser
