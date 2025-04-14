import { describe, it, expect } from 'vitest';
import calculatePointsString from '$lib/shogi/logic/calculatePointsString';

describe('calculatePointsString', () => {
  describe('when playerNumber and pov are equal', () => {
    describe('oushou', () => {
      it('returns F points up', () => {
        let result = calculatePointsString('oushou', 1, 1);
        let expected = '49.5,6 78.86,15.54 92.55,102 6.45,102 20.14,15.44';
        expect(result).toEqual(expected);
      });
    });

    describe('oushou', () => {
      it('returns F points up', () => {
        let result = calculatePointsString('gyokushou', 1, 1);
        let expected = '49.5,6 78.86,15.54 92.55,102 6.45,102 20.14,15.44';
        expect(result).toEqual(expected);
      });
    });

    describe('hisha', () => {
      it('returns E points up', () => {
        let result = calculatePointsString('hisha', 1, 1);
        let expected = '49.5,7.5 77.76,16.7 91.05,100.5 7.95,100.5 21.24,16.7';
        expect(result).toEqual(expected);
      });
    });

    describe('kakugyou', () => {
      it('returns E points up', () => {
        let result = calculatePointsString('kakugyou', 1, 1);
        let expected = '49.5,7.5 77.76,16.7 91.05,100.5 7.95,100.5 21.24,16.7';
        expect(result).toEqual(expected);
      });
    });

    describe('ryuuou', () => {
      it('returns E points up', () => {
        let result = calculatePointsString('ryuuou', 1, 1);
        let expected = '49.5,7.5 77.76,16.7 91.05,100.5 7.95,100.5 21.24,16.7';
        expect(result).toEqual(expected);
      });
    });

    describe('ryuuma', () => {
      it('returns E points up', () => {
        let result = calculatePointsString('ryuuma', 1, 1);
        let expected = '49.5,7.5 77.76,16.7 91.05,100.5 7.95,100.5 21.24,16.7';
        expect(result).toEqual(expected);
      });
    });

    describe('ginshou', () => {
      it('returns D points up', () => {
        let result = calculatePointsString('ginshou', 1, 1);
        let expected = '49.5,9 76.70,17.84 89.55,99 9.45,99 22.30,17.84';
        expect(result).toEqual(expected);
      });
    });

    describe('kinshou', () => {
      it('returns D points up', () => {
        let result = calculatePointsString('kinshou', 1, 1);
        let expected = '49.5,9 76.70,17.84 89.55,99 9.45,99 22.30,17.84';
        expect(result).toEqual(expected);
      });
    });

    describe('narigin', () => {
      it('returns D points up', () => {
        let result = calculatePointsString('narigin', 1, 1);
        let expected = '49.5,9 76.70,17.84 89.55,99 9.45,99 22.30,17.84';
        expect(result).toEqual(expected);
      });
    });

    describe('keima', () => {
      it('returns C points up', () => {
        let result = calculatePointsString('keima', 1, 1);
        let expected = '49.5,10.5 75.30,19.34 87.75,97.5 11.25,97.5 23.70,19.34';
        expect(result).toEqual(expected);
      });
    });

    describe('narikei', () => {
      it('returns C points up', () => {
        let result = calculatePointsString('narikei', 1, 1);
        let expected = '49.5,10.5 75.30,19.34 87.75,97.5 11.25,97.5 23.70,19.34';
        expect(result).toEqual(expected);
      });
    });

    describe('kyousha', () => {
      it('returns B points up', () => {
        let result = calculatePointsString('kyousha', 1, 1);
        let expected = '49.5,12 72.56,19.52 84.75,96 14.25,96 26.44,19.52';
        expect(result).toEqual(expected);
      });
    });

    describe('narikyou', () => {
      it('returns B points up', () => {
        let result = calculatePointsString('narikyou', 1, 1);
        let expected = '49.5,12 72.56,19.52 84.75,96 14.25,96 26.44,19.52';
        expect(result).toEqual(expected);
      });
    });

    describe('fuhyou', () => {
      it('returns A points up', () => {
        let result = calculatePointsString('fuhyou', 1, 1);
        let expected = '49.5,13.5 71.56,20.66 83.25,94.5 15.75,94.5 27.44,20.66';
        expect(result).toEqual(expected);
      });
    });

    describe('tokin', () => {
      it('returns A points up', () => {
        let result = calculatePointsString('tokin', 1, 1);
        let expected = '49.5,13.5 71.56,20.66 83.25,94.5 15.75,94.5 27.44,20.66';
        expect(result).toEqual(expected);
      });
    });
  });

  describe('when playerNumber and pov are not equal', () => {
    describe('oushou', () => {
      it('returns F points down', () => {
        let result = calculatePointsString('oushou', 2, 1);
        let expected = '49.5,102 78.86,92.46 92.55,6 6.45,6 20.14,92.46';
        expect(result).toEqual(expected);
      });
    });

    describe('gyokushou', () => {
      it('returns F points down', () => {
        let result = calculatePointsString('gyokushou', 2, 1);
        let expected = '49.5,102 78.86,92.46 92.55,6 6.45,6 20.14,92.46';
        expect(result).toEqual(expected);
      });
    });

    describe('hisha', () => {
      it('returns E points down', () => {
        let result = calculatePointsString('hisha', 2, 1);
        let expected = '49.5,100.5 77.76,91.3 91.05,7.5 7.95,7.5 21.24,91.3';
        expect(result).toEqual(expected);
      });
    });

    describe('kakugyou', () => {
      it('returns E points down', () => {
        let result = calculatePointsString('kakugyou', 2, 1);
        let expected = '49.5,100.5 77.76,91.3 91.05,7.5 7.95,7.5 21.24,91.3';
        expect(result).toEqual(expected);
      });
    });

    describe('ryuuou', () => {
      it('returns E points down', () => {
        let result = calculatePointsString('ryuuou', 2, 1);
        let expected = '49.5,100.5 77.76,91.3 91.05,7.5 7.95,7.5 21.24,91.3';
        expect(result).toEqual(expected);
      });
    });

    describe('ryuuma', () => {
      it('returns E points down', () => {
        let result = calculatePointsString('ryuuma', 2, 1);
        let expected = '49.5,100.5 77.76,91.3 91.05,7.5 7.95,7.5 21.24,91.3';
        expect(result).toEqual(expected);
      });
    });

    describe('ginshou', () => {
      it('returns D points down', () => {
        let result = calculatePointsString('ginshou', 2, 1);
        let expected = '49.5,99 76.70,90.16 89.55,9 9.45,9 22.30,90.16';
        expect(result).toEqual(expected);
      });
    });

    describe('kinshou', () => {
      it('returns D points down', () => {
        let result = calculatePointsString('kinshou', 2, 1);
        let expected = '49.5,99 76.70,90.16 89.55,9 9.45,9 22.30,90.16';
        expect(result).toEqual(expected);
      });
    });

    describe('narigin', () => {
      it('returns D points down', () => {
        let result = calculatePointsString('narigin', 2, 1);
        let expected = '49.5,99 76.70,90.16 89.55,9 9.45,9 22.30,90.16';
        expect(result).toEqual(expected);
      });
    });

    describe('keima', () => {
      it('returns C points down', () => {
        let result = calculatePointsString('keima', 2, 1);
        let expected = '49.5,97.5 75.30,88.66 87.75,10.5 11.25,10.5 23.70,88.66';
        expect(result).toEqual(expected);
      });
    });

    describe('narikei', () => {
      it('returns C points down', () => {
        let result = calculatePointsString('narikei', 2, 1);
        let expected = '49.5,97.5 75.30,88.66 87.75,10.5 11.25,10.5 23.70,88.66';
        expect(result).toEqual(expected);
      });
    });

    describe('kyousha', () => {
      it('returns B points down', () => {
        let result = calculatePointsString('kyousha', 2, 1);
        let expected = '49.5,96 72.56,88.48 84.75,12 14.25,12 26.44,88.48';
        expect(result).toEqual(expected);
      });
    });

    describe('narikyou', () => {
      it('returns B points down', () => {
        let result = calculatePointsString('narikyou', 2, 1);
        let expected = '49.5,96 72.56,88.48 84.75,12 14.25,12 26.44,88.48';
        expect(result).toEqual(expected);
      });
    });

    describe('fuhyou', () => {
      it('returns A points down', () => {
        let result = calculatePointsString('fuhyou', 2, 1);
        let expected = '49.5,94.5 71.56,87.34 83.25,13.5 15.75,13.5 27.44,87.34';
        expect(result).toEqual(expected);
      });
    });

    describe('tokin', () => {
      it('returns A points down', () => {
        let result = calculatePointsString('tokin', 2, 1);
        let expected = '49.5,94.5 71.56,87.34 83.25,13.5 15.75,13.5 27.44,87.34';
        expect(result).toEqual(expected);
      });
    });

  });
});
