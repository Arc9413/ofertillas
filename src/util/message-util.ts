export const shouldSendMessage = (
  message: string,
  ranks: string[] = [],
  words: string[] = [],
  stores: string[] = [],
): boolean => {
  if (!message) {
    return false;
  }

  const msg = message.toLowerCase();

  return filter(msg, ranks) && filter(msg, words) && filter(msg, stores);
};

export const filter = (s: string, a: string[]): boolean => {
  if (!s) {
    return null;
  }

  if (!a || a.length === 0) {
    return true;
  }

  const sLowerCase = s.toLowerCase();

  return a.some((e) => sLowerCase.includes(e.toLowerCase()));
};
