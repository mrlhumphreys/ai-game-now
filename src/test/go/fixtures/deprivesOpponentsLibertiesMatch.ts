import type Match from '$lib/go/interfaces/Match';
import deepClone from '$lib/utils/deepClone';

let match = {
  id: 0,
  gameState: {
    currentPlayerNumber: 1,
    points: [
      { id: 'aa', x: 0, y: 0, stone: null, territoryId: null },
      { id: 'ba', x: 1, y: 0, stone: null, territoryId: null },
      { id: 'ca', x: 2, y: 0, stone: { id: 2, playerNumber: 2, chainId: 2 }, territoryId: null },
      { id: 'da', x: 3, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null },
      { id: 'ea', x: 4, y: 0, stone: { id: 4, playerNumber: 2, chainId: 4 }, territoryId: null },
      { id: 'fa', x: 5, y: 0, stone: null, territoryId: null },
      { id: 'ga', x: 6, y: 0, stone: null, territoryId: null },
      { id: 'ha', x: 7, y: 0, stone: null, territoryId: null },
      { id: 'ia', x: 8, y: 0, stone: null, territoryId: null },
      { id: 'ja', x: 9, y: 0, stone: null, territoryId: null },
      { id: 'ka', x: 10, y: 0, stone: null, territoryId: null },
      { id: 'la', x: 11, y: 0, stone: null, territoryId: null },
      { id: 'ma', x: 12, y: 0, stone: null, territoryId: null },
      { id: 'na', x: 13, y: 0, stone: null, territoryId: null },
      { id: 'oa', x: 14, y: 0, stone: null, territoryId: null },
      { id: 'pa', x: 15, y: 0, stone: null, territoryId: null },
      { id: 'qa', x: 16, y: 0, stone: null, territoryId: null },
      { id: 'ra', x: 17, y: 0, stone: null, territoryId: null },
      { id: 'sa', x: 18, y: 0, stone: null, territoryId: null },

      { id: 'ab', x: 0, y: 1, stone: null, territoryId: null },
      { id: 'bb', x: 1, y: 1, stone: null, territoryId: null },
      { id: 'cb', x: 2, y: 1, stone: { id: 3, playerNumber: 1, chainId: 3 }, territoryId: null },
      { id: 'db', x: 3, y: 1, stone: null, territoryId: null },
      { id: 'eb', x: 4, y: 1, stone: null, territoryId: null },
      { id: 'fb', x: 5, y: 1, stone: null, territoryId: null },
      { id: 'gb', x: 6, y: 1, stone: null, territoryId: null },
      { id: 'hb', x: 7, y: 1, stone: null, territoryId: null },
      { id: 'ib', x: 8, y: 1, stone: null, territoryId: null },
      { id: 'jb', x: 9, y: 1, stone: null, territoryId: null },
      { id: 'kb', x: 10, y: 1, stone: null, territoryId: null },
      { id: 'lb', x: 11, y: 1, stone: null, territoryId: null },
      { id: 'mb', x: 12, y: 1, stone: null, territoryId: null },
      { id: 'nb', x: 13, y: 1, stone: null, territoryId: null },
      { id: 'ob', x: 14, y: 1, stone: null, territoryId: null },
      { id: 'pb', x: 15, y: 1, stone: null, territoryId: null },
      { id: 'qb', x: 16, y: 1, stone: null, territoryId: null },
      { id: 'rb', x: 17, y: 1, stone: null, territoryId: null },
      { id: 'sb', x: 18, y: 1, stone: null, territoryId: null },

      { id: 'ac', x: 0, y: 2, stone: null, territoryId: null },
      { id: 'bc', x: 1, y: 2, stone: null, territoryId: null },
      { id: 'cc', x: 2, y: 2, stone: null, territoryId: null },
      { id: 'dc', x: 3, y: 2, stone: null, territoryId: null },
      { id: 'ec', x: 4, y: 2, stone: null, territoryId: null },
      { id: 'fc', x: 5, y: 2, stone: null, territoryId: null },
      { id: 'gc', x: 6, y: 2, stone: null, territoryId: null },
      { id: 'hc', x: 7, y: 2, stone: null, territoryId: null },
      { id: 'ic', x: 8, y: 2, stone: null, territoryId: null },
      { id: 'jc', x: 9, y: 2, stone: null, territoryId: null },
      { id: 'kc', x: 10, y: 2, stone: null, territoryId: null },
      { id: 'lc', x: 11, y: 2, stone: null, territoryId: null },
      { id: 'mc', x: 12, y: 2, stone: null, territoryId: null },
      { id: 'nc', x: 13, y: 2, stone: null, territoryId: null },
      { id: 'oc', x: 14, y: 2, stone: null, territoryId: null },
      { id: 'pc', x: 15, y: 2, stone: null, territoryId: null },
      { id: 'qc', x: 16, y: 2, stone: null, territoryId: null },
      { id: 'rc', x: 17, y: 2, stone: null, territoryId: null },
      { id: 'sc', x: 18, y: 2, stone: null, territoryId: null },

      { id: 'ad', x: 0, y: 3, stone: null, territoryId: null },
      { id: 'bd', x: 1, y: 3, stone: null, territoryId: null },
      { id: 'cd', x: 2, y: 3, stone: null, territoryId: null },
      { id: 'dd', x: 3, y: 3, stone: null, territoryId: null },
      { id: 'ed', x: 4, y: 3, stone: null, territoryId: null },
      { id: 'fd', x: 5, y: 3, stone: null, territoryId: null },
      { id: 'gd', x: 6, y: 3, stone: null, territoryId: null },
      { id: 'hd', x: 7, y: 3, stone: null, territoryId: null },
      { id: 'id', x: 8, y: 3, stone: null, territoryId: null },
      { id: 'jd', x: 9, y: 3, stone: null, territoryId: null },
      { id: 'kd', x: 10, y: 3, stone: null, territoryId: null },
      { id: 'ld', x: 11, y: 3, stone: null, territoryId: null },
      { id: 'md', x: 12, y: 3, stone: null, territoryId: null },
      { id: 'nd', x: 13, y: 3, stone: null, territoryId: null },
      { id: 'od', x: 14, y: 3, stone: null, territoryId: null },
      { id: 'pd', x: 15, y: 3, stone: null, territoryId: null },
      { id: 'qd', x: 16, y: 3, stone: null, territoryId: null },
      { id: 'rd', x: 17, y: 3, stone: null, territoryId: null },
      { id: 'sd', x: 18, y: 3, stone: null, territoryId: null },

      { id: 'ae', x: 0, y: 4, stone: null, territoryId: null },
      { id: 'be', x: 1, y: 4, stone: null, territoryId: null },
      { id: 'ce', x: 2, y: 4, stone: null, territoryId: null },
      { id: 'de', x: 3, y: 4, stone: null, territoryId: null },
      { id: 'ee', x: 4, y: 4, stone: null, territoryId: null },
      { id: 'fe', x: 5, y: 4, stone: null, territoryId: null },
      { id: 'ge', x: 6, y: 4, stone: null, territoryId: null },
      { id: 'he', x: 7, y: 4, stone: null, territoryId: null },
      { id: 'ie', x: 8, y: 4, stone: null, territoryId: null },
      { id: 'je', x: 9, y: 4, stone: null, territoryId: null },
      { id: 'ke', x: 10, y: 4, stone: null, territoryId: null },
      { id: 'le', x: 11, y: 4, stone: null, territoryId: null },
      { id: 'me', x: 12, y: 4, stone: null, territoryId: null },
      { id: 'ne', x: 13, y: 4, stone: null, territoryId: null },
      { id: 'oe', x: 14, y: 4, stone: null, territoryId: null },
      { id: 'pe', x: 15, y: 4, stone: null, territoryId: null },
      { id: 'qe', x: 16, y: 4, stone: null, territoryId: null },
      { id: 're', x: 17, y: 4, stone: null, territoryId: null },
      { id: 'se', x: 18, y: 4, stone: null, territoryId: null },

      { id: 'af', x: 0, y: 5, stone: null, territoryId: null },
      { id: 'bf', x: 1, y: 5, stone: null, territoryId: null },
      { id: 'cf', x: 2, y: 5, stone: null, territoryId: null },
      { id: 'df', x: 3, y: 5, stone: null, territoryId: null },
      { id: 'ef', x: 4, y: 5, stone: null, territoryId: null },
      { id: 'ff', x: 5, y: 5, stone: null, territoryId: null },
      { id: 'gf', x: 6, y: 5, stone: null, territoryId: null },
      { id: 'hf', x: 7, y: 5, stone: null, territoryId: null },
      { id: 'if', x: 8, y: 5, stone: null, territoryId: null },
      { id: 'jf', x: 9, y: 5, stone: null, territoryId: null },
      { id: 'kf', x: 10, y: 5, stone: null, territoryId: null },
      { id: 'lf', x: 11, y: 5, stone: null, territoryId: null },
      { id: 'mf', x: 12, y: 5, stone: null, territoryId: null },
      { id: 'nf', x: 13, y: 5, stone: null, territoryId: null },
      { id: 'of', x: 14, y: 5, stone: null, territoryId: null },
      { id: 'pf', x: 15, y: 5, stone: null, territoryId: null },
      { id: 'qf', x: 16, y: 5, stone: null, territoryId: null },
      { id: 'rf', x: 17, y: 5, stone: null, territoryId: null },
      { id: 'sf', x: 18, y: 5, stone: null, territoryId: null },

      { id: 'ag', x: 0, y: 6, stone: null, territoryId: null },
      { id: 'bg', x: 1, y: 6, stone: null, territoryId: null },
      { id: 'cg', x: 2, y: 6, stone: null, territoryId: null },
      { id: 'dg', x: 3, y: 6, stone: null, territoryId: null },
      { id: 'eg', x: 4, y: 6, stone: null, territoryId: null },
      { id: 'fg', x: 5, y: 6, stone: null, territoryId: null },
      { id: 'gg', x: 6, y: 6, stone: null, territoryId: null },
      { id: 'hg', x: 7, y: 6, stone: null, territoryId: null },
      { id: 'ig', x: 8, y: 6, stone: null, territoryId: null },
      { id: 'jg', x: 9, y: 6, stone: null, territoryId: null },
      { id: 'kg', x: 10, y: 6, stone: null, territoryId: null },
      { id: 'lg', x: 11, y: 6, stone: null, territoryId: null },
      { id: 'mg', x: 12, y: 6, stone: null, territoryId: null },
      { id: 'ng', x: 13, y: 6, stone: null, territoryId: null },
      { id: 'og', x: 14, y: 6, stone: null, territoryId: null },
      { id: 'pg', x: 15, y: 6, stone: null, territoryId: null },
      { id: 'qg', x: 16, y: 6, stone: null, territoryId: null },
      { id: 'rg', x: 17, y: 6, stone: null, territoryId: null },
      { id: 'sg', x: 18, y: 6, stone: null, territoryId: null },

      { id: 'ah', x: 0, y: 7, stone: null, territoryId: null },
      { id: 'bh', x: 1, y: 7, stone: null, territoryId: null },
      { id: 'ch', x: 2, y: 7, stone: null, territoryId: null },
      { id: 'dh', x: 3, y: 7, stone: null, territoryId: null },
      { id: 'eh', x: 4, y: 7, stone: null, territoryId: null },
      { id: 'fh', x: 5, y: 7, stone: null, territoryId: null },
      { id: 'gh', x: 6, y: 7, stone: null, territoryId: null },
      { id: 'hh', x: 7, y: 7, stone: null, territoryId: null },
      { id: 'ih', x: 8, y: 7, stone: null, territoryId: null },
      { id: 'jh', x: 9, y: 7, stone: null, territoryId: null },
      { id: 'kh', x: 10, y: 7, stone: null, territoryId: null },
      { id: 'lh', x: 11, y: 7, stone: null, territoryId: null },
      { id: 'mh', x: 12, y: 7, stone: null, territoryId: null },
      { id: 'nh', x: 13, y: 7, stone: null, territoryId: null },
      { id: 'oh', x: 14, y: 7, stone: null, territoryId: null },
      { id: 'ph', x: 15, y: 7, stone: null, territoryId: null },
      { id: 'qh', x: 16, y: 7, stone: null, territoryId: null },
      { id: 'rh', x: 17, y: 7, stone: null, territoryId: null },
      { id: 'sh', x: 18, y: 7, stone: null, territoryId: null },

      { id: 'ai', x: 0, y: 8, stone: null, territoryId: null },
      { id: 'bi', x: 1, y: 8, stone: null, territoryId: null },
      { id: 'ci', x: 2, y: 8, stone: null, territoryId: null },
      { id: 'di', x: 3, y: 8, stone: null, territoryId: null },
      { id: 'ei', x: 4, y: 8, stone: null, territoryId: null },
      { id: 'fi', x: 5, y: 8, stone: null, territoryId: null },
      { id: 'gi', x: 6, y: 8, stone: null, territoryId: null },
      { id: 'hi', x: 7, y: 8, stone: null, territoryId: null },
      { id: 'ii', x: 8, y: 8, stone: null, territoryId: null },
      { id: 'ji', x: 9, y: 8, stone: null, territoryId: null },
      { id: 'ki', x: 10, y: 8, stone: null, territoryId: null },
      { id: 'li', x: 11, y: 8, stone: null, territoryId: null },
      { id: 'mi', x: 12, y: 8, stone: null, territoryId: null },
      { id: 'ni', x: 13, y: 8, stone: null, territoryId: null },
      { id: 'oi', x: 14, y: 8, stone: null, territoryId: null },
      { id: 'pi', x: 15, y: 8, stone: null, territoryId: null },
      { id: 'qi', x: 16, y: 8, stone: null, territoryId: null },
      { id: 'ri', x: 17, y: 8, stone: null, territoryId: null },
      { id: 'si', x: 18, y: 8, stone: null, territoryId: null },

      { id: 'aj', x: 0, y: 9, stone: null, territoryId: null },
      { id: 'bj', x: 1, y: 9, stone: null, territoryId: null },
      { id: 'cj', x: 2, y: 9, stone: null, territoryId: null },
      { id: 'dj', x: 3, y: 9, stone: null, territoryId: null },
      { id: 'ej', x: 4, y: 9, stone: null, territoryId: null },
      { id: 'fj', x: 5, y: 9, stone: null, territoryId: null },
      { id: 'gj', x: 6, y: 9, stone: null, territoryId: null },
      { id: 'hj', x: 7, y: 9, stone: null, territoryId: null },
      { id: 'ij', x: 8, y: 9, stone: null, territoryId: null },
      { id: 'jj', x: 9, y: 9, stone: null, territoryId: null },
      { id: 'kj', x: 10, y: 9, stone: null, territoryId: null },
      { id: 'lj', x: 11, y: 9, stone: null, territoryId: null },
      { id: 'mj', x: 12, y: 9, stone: null, territoryId: null },
      { id: 'nj', x: 13, y: 9, stone: null, territoryId: null },
      { id: 'oj', x: 14, y: 9, stone: null, territoryId: null },
      { id: 'pj', x: 15, y: 9, stone: null, territoryId: null },
      { id: 'qj', x: 16, y: 9, stone: null, territoryId: null },
      { id: 'rj', x: 17, y: 9, stone: null, territoryId: null },
      { id: 'sj', x: 18, y: 9, stone: null, territoryId: null },

      { id: 'ak', x: 0, y: 10, stone: null, territoryId: null },
      { id: 'bk', x: 1, y: 10, stone: null, territoryId: null },
      { id: 'ck', x: 2, y: 10, stone: null, territoryId: null },
      { id: 'dk', x: 3, y: 10, stone: null, territoryId: null },
      { id: 'ek', x: 4, y: 10, stone: null, territoryId: null },
      { id: 'fk', x: 5, y: 10, stone: null, territoryId: null },
      { id: 'gk', x: 6, y: 10, stone: null, territoryId: null },
      { id: 'hk', x: 7, y: 10, stone: null, territoryId: null },
      { id: 'ik', x: 8, y: 10, stone: null, territoryId: null },
      { id: 'jk', x: 9, y: 10, stone: null, territoryId: null },
      { id: 'kk', x: 10, y: 10, stone: null, territoryId: null },
      { id: 'lk', x: 11, y: 10, stone: null, territoryId: null },
      { id: 'mk', x: 12, y: 10, stone: null, territoryId: null },
      { id: 'nk', x: 13, y: 10, stone: null, territoryId: null },
      { id: 'ok', x: 14, y: 10, stone: null, territoryId: null },
      { id: 'pk', x: 15, y: 10, stone: null, territoryId: null },
      { id: 'qk', x: 16, y: 10, stone: null, territoryId: null },
      { id: 'rk', x: 17, y: 10, stone: null, territoryId: null },
      { id: 'sk', x: 18, y: 10, stone: null, territoryId: null },

      { id: 'al', x: 0, y: 11, stone: null, territoryId: null },
      { id: 'bl', x: 1, y: 11, stone: null, territoryId: null },
      { id: 'cl', x: 2, y: 11, stone: null, territoryId: null },
      { id: 'dl', x: 3, y: 11, stone: null, territoryId: null },
      { id: 'el', x: 4, y: 11, stone: null, territoryId: null },
      { id: 'fl', x: 5, y: 11, stone: null, territoryId: null },
      { id: 'gl', x: 6, y: 11, stone: null, territoryId: null },
      { id: 'hl', x: 7, y: 11, stone: null, territoryId: null },
      { id: 'il', x: 8, y: 11, stone: null, territoryId: null },
      { id: 'jl', x: 9, y: 11, stone: null, territoryId: null },
      { id: 'kl', x: 10, y: 11, stone: null, territoryId: null },
      { id: 'll', x: 11, y: 11, stone: null, territoryId: null },
      { id: 'ml', x: 12, y: 11, stone: null, territoryId: null },
      { id: 'nl', x: 13, y: 11, stone: null, territoryId: null },
      { id: 'ol', x: 14, y: 11, stone: null, territoryId: null },
      { id: 'pl', x: 15, y: 11, stone: null, territoryId: null },
      { id: 'ql', x: 16, y: 11, stone: null, territoryId: null },
      { id: 'rl', x: 17, y: 11, stone: null, territoryId: null },
      { id: 'sl', x: 18, y: 11, stone: null, territoryId: null },

      { id: 'am', x: 0, y: 12, stone: null, territoryId: null },
      { id: 'bm', x: 1, y: 12, stone: null, territoryId: null },
      { id: 'cm', x: 2, y: 12, stone: null, territoryId: null },
      { id: 'dm', x: 3, y: 12, stone: null, territoryId: null },
      { id: 'em', x: 4, y: 12, stone: null, territoryId: null },
      { id: 'fm', x: 5, y: 12, stone: null, territoryId: null },
      { id: 'gm', x: 6, y: 12, stone: null, territoryId: null },
      { id: 'hm', x: 7, y: 12, stone: null, territoryId: null },
      { id: 'im', x: 8, y: 12, stone: null, territoryId: null },
      { id: 'jm', x: 9, y: 12, stone: null, territoryId: null },
      { id: 'km', x: 10, y: 12, stone: null, territoryId: null },
      { id: 'lm', x: 11, y: 12, stone: null, territoryId: null },
      { id: 'mm', x: 12, y: 12, stone: null, territoryId: null },
      { id: 'nm', x: 13, y: 12, stone: null, territoryId: null },
      { id: 'om', x: 14, y: 12, stone: null, territoryId: null },
      { id: 'pm', x: 15, y: 12, stone: null, territoryId: null },
      { id: 'qm', x: 16, y: 12, stone: null, territoryId: null },
      { id: 'rm', x: 17, y: 12, stone: null, territoryId: null },
      { id: 'sm', x: 18, y: 12, stone: null, territoryId: null },

      { id: 'an', x: 0, y: 13, stone: null, territoryId: null },
      { id: 'bn', x: 1, y: 13, stone: null, territoryId: null },
      { id: 'cn', x: 2, y: 13, stone: null, territoryId: null },
      { id: 'dn', x: 3, y: 13, stone: null, territoryId: null },
      { id: 'en', x: 4, y: 13, stone: null, territoryId: null },
      { id: 'fn', x: 5, y: 13, stone: null, territoryId: null },
      { id: 'gn', x: 6, y: 13, stone: null, territoryId: null },
      { id: 'hn', x: 7, y: 13, stone: null, territoryId: null },
      { id: 'in', x: 8, y: 13, stone: null, territoryId: null },
      { id: 'jn', x: 9, y: 13, stone: null, territoryId: null },
      { id: 'kn', x: 10, y: 13, stone: null, territoryId: null },
      { id: 'ln', x: 11, y: 13, stone: null, territoryId: null },
      { id: 'mn', x: 12, y: 13, stone: null, territoryId: null },
      { id: 'nn', x: 13, y: 13, stone: null, territoryId: null },
      { id: 'on', x: 14, y: 13, stone: null, territoryId: null },
      { id: 'pn', x: 15, y: 13, stone: null, territoryId: null },
      { id: 'qn', x: 16, y: 13, stone: null, territoryId: null },
      { id: 'rn', x: 17, y: 13, stone: null, territoryId: null },
      { id: 'sn', x: 18, y: 13, stone: null, territoryId: null },

      { id: 'ao', x: 0, y: 14, stone: null, territoryId: null },
      { id: 'bo', x: 1, y: 14, stone: null, territoryId: null },
      { id: 'co', x: 2, y: 14, stone: null, territoryId: null },
      { id: 'do', x: 3, y: 14, stone: null, territoryId: null },
      { id: 'eo', x: 4, y: 14, stone: null, territoryId: null },
      { id: 'fo', x: 5, y: 14, stone: null, territoryId: null },
      { id: 'go', x: 6, y: 14, stone: null, territoryId: null },
      { id: 'ho', x: 7, y: 14, stone: null, territoryId: null },
      { id: 'io', x: 8, y: 14, stone: null, territoryId: null },
      { id: 'jo', x: 9, y: 14, stone: null, territoryId: null },
      { id: 'ko', x: 10, y: 14, stone: null, territoryId: null },
      { id: 'lo', x: 11, y: 14, stone: null, territoryId: null },
      { id: 'mo', x: 12, y: 14, stone: null, territoryId: null },
      { id: 'no', x: 13, y: 14, stone: null, territoryId: null },
      { id: 'oo', x: 14, y: 14, stone: null, territoryId: null },
      { id: 'po', x: 15, y: 14, stone: null, territoryId: null },
      { id: 'qo', x: 16, y: 14, stone: null, territoryId: null },
      { id: 'ro', x: 17, y: 14, stone: null, territoryId: null },
      { id: 'so', x: 18, y: 14, stone: null, territoryId: null },

      { id: 'ap', x: 0, y: 15, stone: null, territoryId: null },
      { id: 'bp', x: 1, y: 15, stone: null, territoryId: null },
      { id: 'cp', x: 2, y: 15, stone: null, territoryId: null },
      { id: 'dp', x: 3, y: 15, stone: null, territoryId: null },
      { id: 'ep', x: 4, y: 15, stone: null, territoryId: null },
      { id: 'fp', x: 5, y: 15, stone: null, territoryId: null },
      { id: 'gp', x: 6, y: 15, stone: null, territoryId: null },
      { id: 'hp', x: 7, y: 15, stone: null, territoryId: null },
      { id: 'ip', x: 8, y: 15, stone: null, territoryId: null },
      { id: 'jp', x: 9, y: 15, stone: null, territoryId: null },
      { id: 'kp', x: 10, y: 15, stone: null, territoryId: null },
      { id: 'lp', x: 11, y: 15, stone: null, territoryId: null },
      { id: 'mp', x: 12, y: 15, stone: null, territoryId: null },
      { id: 'np', x: 13, y: 15, stone: null, territoryId: null },
      { id: 'op', x: 14, y: 15, stone: null, territoryId: null },
      { id: 'pp', x: 15, y: 15, stone: null, territoryId: null },
      { id: 'qp', x: 16, y: 15, stone: null, territoryId: null },
      { id: 'rp', x: 17, y: 15, stone: null, territoryId: null },
      { id: 'sp', x: 18, y: 15, stone: null, territoryId: null },

      { id: 'aq', x: 0, y: 16, stone: null, territoryId: null },
      { id: 'bq', x: 1, y: 16, stone: null, territoryId: null },
      { id: 'cq', x: 2, y: 16, stone: null, territoryId: null },
      { id: 'dq', x: 3, y: 16, stone: null, territoryId: null },
      { id: 'eq', x: 4, y: 16, stone: null, territoryId: null },
      { id: 'fq', x: 5, y: 16, stone: null, territoryId: null },
      { id: 'gq', x: 6, y: 16, stone: null, territoryId: null },
      { id: 'hq', x: 7, y: 16, stone: null, territoryId: null },
      { id: 'iq', x: 8, y: 16, stone: null, territoryId: null },
      { id: 'jq', x: 9, y: 16, stone: null, territoryId: null },
      { id: 'kq', x: 10, y: 16, stone: null, territoryId: null },
      { id: 'lq', x: 11, y: 16, stone: null, territoryId: null },
      { id: 'mq', x: 12, y: 16, stone: null, territoryId: null },
      { id: 'nq', x: 13, y: 16, stone: null, territoryId: null },
      { id: 'oq', x: 14, y: 16, stone: null, territoryId: null },
      { id: 'pq', x: 15, y: 16, stone: null, territoryId: null },
      { id: 'qq', x: 16, y: 16, stone: null, territoryId: null },
      { id: 'rq', x: 17, y: 16, stone: null, territoryId: null },
      { id: 'sq', x: 18, y: 16, stone: null, territoryId: null },

      { id: 'ar', x: 0, y: 17, stone: null, territoryId: null },
      { id: 'br', x: 1, y: 17, stone: null, territoryId: null },
      { id: 'cr', x: 2, y: 17, stone: null, territoryId: null },
      { id: 'dr', x: 3, y: 17, stone: null, territoryId: null },
      { id: 'er', x: 4, y: 17, stone: null, territoryId: null },
      { id: 'fr', x: 5, y: 17, stone: null, territoryId: null },
      { id: 'gr', x: 6, y: 17, stone: null, territoryId: null },
      { id: 'hr', x: 7, y: 17, stone: null, territoryId: null },
      { id: 'ir', x: 8, y: 17, stone: null, territoryId: null },
      { id: 'jr', x: 9, y: 17, stone: null, territoryId: null },
      { id: 'kr', x: 10, y: 17, stone: null, territoryId: null },
      { id: 'lr', x: 11, y: 17, stone: null, territoryId: null },
      { id: 'mr', x: 12, y: 17, stone: null, territoryId: null },
      { id: 'nr', x: 13, y: 17, stone: null, territoryId: null },
      { id: 'or', x: 14, y: 17, stone: null, territoryId: null },
      { id: 'pr', x: 15, y: 17, stone: null, territoryId: null },
      { id: 'qr', x: 16, y: 17, stone: null, territoryId: null },
      { id: 'rr', x: 17, y: 17, stone: null, territoryId: null },
      { id: 'sr', x: 18, y: 17, stone: null, territoryId: null },

      { id: 'as', x: 0, y: 18, stone: null, territoryId: null },
      { id: 'bs', x: 1, y: 18, stone: null, territoryId: null },
      { id: 'cs', x: 2, y: 18, stone: null, territoryId: null },
      { id: 'ds', x: 3, y: 18, stone: null, territoryId: null },
      { id: 'es', x: 4, y: 18, stone: null, territoryId: null },
      { id: 'fs', x: 5, y: 18, stone: null, territoryId: null },
      { id: 'gs', x: 6, y: 18, stone: null, territoryId: null },
      { id: 'hs', x: 7, y: 18, stone: null, territoryId: null },
      { id: 'is', x: 8, y: 18, stone: null, territoryId: null },
      { id: 'js', x: 9, y: 18, stone: null, territoryId: null },
      { id: 'ks', x: 10, y: 18, stone: null, territoryId: null },
      { id: 'ls', x: 11, y: 18, stone: null, territoryId: null },
      { id: 'ms', x: 12, y: 18, stone: null, territoryId: null },
      { id: 'ns', x: 13, y: 18, stone: null, territoryId: null },
      { id: 'os', x: 14, y: 18, stone: null, territoryId: null },
      { id: 'ps', x: 15, y: 18, stone: null, territoryId: null },
      { id: 'qs', x: 16, y: 18, stone: null, territoryId: null },
      { id: 'rs', x: 17, y: 18, stone: null, territoryId: null },
      { id: 'ss', x: 18, y: 18, stone: null, territoryId: null }
    ],
    playerStats: [
      { playerNumber: 1, prisonerCount: 0, passed: false },
      { playerNumber: 2, prisonerCount: 0, passed: false }
    ],
    previousState: ''
  },
  players: [
    { playerNumber: 1, name: 'Player', resigned: false },
    { playerNumber: 2, name: 'Computer', resigned: false }
  ],
  lastAction: null,
  notification: 'Player to move'
};

const generateMatch = function(): Match {
  return deepClone(match);
};

export default generateMatch;
