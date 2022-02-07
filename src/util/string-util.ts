export const splitString = (s: string, splitBy: string, defaultValue = []): string[] => {
  if (!s || !splitBy) {
    return defaultValue;
  }

  const split = s.split(splitBy);
  return split ? split.map((s) => s.trim()) : null;
};
