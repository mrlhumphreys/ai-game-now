import type GameState from '$lib/go/interfaces/GameState';
import type Point from '$lib/go/interfaces/Point';

const ID_TO_POS = [
  '--',

  'aa',
  'ba',
  'ca',
  'da',
  'ea',
  'fa',
  'ga',
  'ha',
  'ia',
  'ja',
  'ka',
  'la',
  'ma',
  'na',
  'oa',
  'pa',
  'qa',
  'ra',
  'sa',

  'ab',
  'bb',
  'cb',
  'db',
  'eb',
  'fb',
  'gb',
  'hb',
  'ib',
  'jb',
  'kb',
  'lb',
  'mb',
  'nb',
  'ob',
  'pb',
  'qb',
  'rb',
  'sb',

  'ac',
  'bc',
  'cc',
  'dc',
  'ec',
  'fc',
  'gc',
  'hc',
  'ic',
  'jc',
  'kc',
  'lc',
  'mc',
  'nc',
  'oc',
  'pc',
  'qc',
  'rc',
  'sc',

  'ad',
  'bd',
  'cd',
  'dd',
  'ed',
  'fd',
  'gd',
  'hd',
  'id',
  'jd',
  'kd',
  'ld',
  'md',
  'nd',
  'od',
  'pd',
  'qd',
  'rd',
  'sd',

  'ae',
  'be',
  'ce',
  'de',
  'ee',
  'fe',
  'ge',
  'he',
  'ie',
  'je',
  'ke',
  'le',
  'me',
  'ne',
  'oe',
  'pe',
  'qe',
  're',
  'se',

  'af',
  'bf',
  'cf',
  'df',
  'ef',
  'ff',
  'gf',
  'hf',
  'if',
  'jf',
  'kf',
  'lf',
  'mf',
  'nf',
  'of',
  'pf',
  'qf',
  'rf',
  'sf',

  'ag',
  'bg',
  'cg',
  'dg',
  'eg',
  'fg',
  'gg',
  'hg',
  'ig',
  'jg',
  'kg',
  'lg',
  'mg',
  'ng',
  'og',
  'pg',
  'qg',
  'rg',
  'sg',

  'ah',
  'bh',
  'ch',
  'dh',
  'eh',
  'fh',
  'gh',
  'hh',
  'ih',
  'jh',
  'kh',
  'lh',
  'mh',
  'nh',
  'oh',
  'ph',
  'qh',
  'rh',
  'sh',

  'ai',
  'bi',
  'ci',
  'di',
  'ei',
  'fi',
  'gi',
  'hi',
  'ii',
  'ji',
  'ki',
  'li',
  'mi',
  'ni',
  'oi',
  'pi',
  'qi',
  'ri',
  'si',

  'aj',
  'bj',
  'cj',
  'dj',
  'ej',
  'fj',
  'gj',
  'hj',
  'ij',
  'jj',
  'kj',
  'lj',
  'mj',
  'nj',
  'oj',
  'pj',
  'qj',
  'rj',
  'sj',

  'ak',
  'bk',
  'ck',
  'dk',
  'ek',
  'fk',
  'gk',
  'hk',
  'ik',
  'jk',
  'kk',
  'lk',
  'mk',
  'nk',
  'ok',
  'pk',
  'qk',
  'rk',
  'sk',

  'al',
  'bl',
  'cl',
  'dl',
  'el',
  'fl',
  'gl',
  'hl',
  'il',
  'jl',
  'kl',
  'll',
  'ml',
  'nl',
  'ol',
  'pl',
  'ql',
  'rl',
  'sl',

  'am',
  'bm',
  'cm',
  'dm',
  'em',
  'fm',
  'gm',
  'hm',
  'im',
  'jm',
  'km',
  'lm',
  'mm',
  'nm',
  'om',
  'pm',
  'qm',
  'rm',
  'sm',

  'an',
  'bn',
  'cn',
  'dn',
  'en',
  'fn',
  'gn',
  'hn',
  'in',
  'jn',
  'kn',
  'ln',
  'mn',
  'nn',
  'on',
  'pn',
  'qn',
  'rn',
  'sn',

  'ao',
  'bo',
  'co',
  'do',
  'eo',
  'fo',
  'go',
  'ho',
  'io',
  'jo',
  'ko',
  'lo',
  'mo',
  'no',
  'oo',
  'po',
  'qo',
  'ro',
  'so',

  'ap',
  'bp',
  'cp',
  'dp',
  'ep',
  'fp',
  'gp',
  'hp',
  'ip',
  'jp',
  'kp',
  'lp',
  'mp',
  'np',
  'op',
  'pp',
  'qp',
  'rp',
  'sp',

  'aq',
  'bq',
  'cq',
  'dq',
  'eq',
  'fq',
  'gq',
  'hq',
  'iq',
  'jq',
  'kq',
  'lq',
  'mq',
  'nq',
  'oq',
  'pq',
  'qq',
  'rq',
  'sq',

  'ar',
  'br',
  'cr',
  'dr',
  'er',
  'fr',
  'gr',
  'hr',
  'ir',
  'jr',
  'kr',
  'lr',
  'mr',
  'nr',
  'or',
  'pr',
  'qr',
  'rr',
  'sr',

  'as',
  'bs',
  'cs',
  'ds',
  'es',
  'fs',
  'gs',
  'hs',
  'is',
  'js',
  'ks',
  'ls',
  'ms',
  'ns',
  'os',
  'ps',
  'qs',
  'rs',
  'ss'
];

// "PL[B]AB[cb]AW[de]XB[0]XW[0]
// PL[W] or PL[B] - Player Turn
// AB[bb:ee]AW[bb][ee][dc][cd][cb][bc][be][eb][ed][de] - Setup board
// XS[ab][cd]  - Previously Captured Pieces
// XW[0] XB[0] - Number of stones captured
const goStateSerializer = function(state: GameState): string {
  let currentPlayerCode = (state.currentPlayerNumber === 2 ? 'W' : 'B');

  let stoneComparisonFunction = function(a: Point, b: Point): number {
    if (a.stone !== null && b.stone !== null) {
      return a.stone.id - b.stone.id;
    } else {
      return 0;
    }
  };

  let blackStones = state.points.filter(function(p) { return p.stone !== null && p.stone.playerNumber === 1; }).sort(stoneComparisonFunction).map(function(p) { return `[${ID_TO_POS[p.id]}]`; }).join('');
  let whiteStones = state.points.filter(function(p) { return p.stone !== null && p.stone.playerNumber === 2; }).sort(stoneComparisonFunction).map(function(p) { return `[${ID_TO_POS[p.id]}]`; }).join('');

  let blackPlayerStat = state.playerStats.find(function(ps) { return ps.playerNumber === 1; });
  let blackPrisonerCount = (blackPlayerStat !== undefined ? blackPlayerStat.prisonerCount : 0);
  let whitePlayerStat = state.playerStats.find(function(ps) { return ps.playerNumber === 2; });
  let whitePrisonerCount = (whitePlayerStat !== undefined ? whitePlayerStat.prisonerCount : 0);

  let capturedPoints: Array<string> = [];

  Array.from(state.previousState).forEach(function(previousPoint, i) {
    if (previousPoint === '1' || previousPoint === '2') {
        let currentPoint = state.points[i];
        if (currentPoint !== undefined && currentPoint.stone === null) {
          // stone captured
          let pos = ID_TO_POS[currentPoint.id];
          if (pos !== undefined) {
            capturedPoints.push(pos);
          }
        }
    }
  });

  let capturedPointsString = capturedPoints.map(function(p) { return `[${p}]`; }).join('');

  return `PL[${currentPlayerCode}]AB${blackStones}AW${whiteStones}XB[${blackPrisonerCount}]XW[${whitePrisonerCount}]XS${capturedPointsString}`;
};

export default goStateSerializer