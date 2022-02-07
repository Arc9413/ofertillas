import { shouldSendMessage } from './message-util';

describe('message util', () => {
  const message = `😴 DRank 😴
    Linio 
    Vendedor FALABELLA
    Notebook Gamer HP Intel Core i7, W10, 12GB, SSD 512GB, RTX 2060 de 16" FHD 60Hz
    $899.990 -> $468.990 (47,89%)   
    CATEGORÍA (https://www.linio.cl/c/computacion/pc-portatil?is_international=0&condition_type=Nuevo&page=3) / PRODUCTO (https://www.linio.cl/p/notebook-gamer-hp-intel-core-i7-w10-12gb-ssd-512gb-rtx-2060-de-16-fhd-60hz-jtn86i?qid=c0114bf02743c23f2fe4025ada25a8f9&oid=HP034EL1I6K33LACL&position=177&sku=HP034EL1I6K33LACL) 
    
    Google (https://www.google.cl/search?q=Notebook%20Gamer%20HP%20Intel%20Core%20i7,%20W10,%2012GB,%20SSD%20512GB,%20RTX%202060%20de%2016%22%20FHD%2060Hz) - Knasta (https://knasta.cl/results?q=Notebook%20Gamer%20HP%20Intel%20Core%20i7,%20W10,%2012GB,%20SSD%20512GB,%20RTX%202060%20de%2016%22%20FHD%2060Hz) - Solotodo (https://www.solotodo.cl/search?search=Notebook%20Gamer%20HP%20Intel%20Core%20i7,%20W10,%2012GB,%20SSD%20512GB,%20RTX%202060%20de%2016%22%20FHD%2060Hz)
    `;

  it('should return true if filters are empty', () => {
    expect.hasAssertions();

    expect(shouldSendMessage(message)).toStrictEqual(true);
  });

  it('should return true if message contains ranks', () => {
    expect.hasAssertions();

    expect(shouldSendMessage(message, ['brank', 'srank'])).toStrictEqual(false);

    expect(shouldSendMessage(message, ['drank', 'srank'])).toStrictEqual(true);
  });

  it('should return true if message contains words', () => {
    expect.hasAssertions();

    expect(shouldSendMessage(message, null, ['iphone'])).toStrictEqual(false);

    expect(shouldSendMessage(message, null, ['notebook'])).toStrictEqual(true);
  });

  it('should return true if message contains store name', () => {
    expect.hasAssertions();

    expect(shouldSendMessage(message, null, null, ['paris'])).toStrictEqual(false);

    expect(shouldSendMessage(message, null, ['linio'])).toStrictEqual(true);
  });

  it('should return true if message contains contains all filters', () => {
    expect.hasAssertions();

    expect(shouldSendMessage(message, ['drank'], ['notebook'], ['paris'])).toStrictEqual(false);

    expect(shouldSendMessage(message, ['drank'], ['notebook'], ['falabella', 'linio'])).toStrictEqual(true);
  });
});
