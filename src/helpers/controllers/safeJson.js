export function safeJson(data) {
  const seen = new WeakSet();

  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]";
        seen.add(value);
      }
      return value;
    })
  );
}
