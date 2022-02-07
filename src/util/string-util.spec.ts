import { splitString } from './string-util';

describe('string util test', () => {
  it('should return split string', () => {
    expect.hasAssertions();

    expect(splitString(null, null, [])).toStrictEqual([]);
    expect(splitString(null, ';', [])).toStrictEqual([]);
    expect(splitString(',', null, [])).toStrictEqual([]);

    expect(splitString('falabella,    paris , ripley', ',', [])).toStrictEqual(['falabella', 'paris', 'ripley']);
  });
});
