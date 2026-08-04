export function publicAsset(path: string) {
  const base = import.meta.env.BASE_URL;
  const normalizedPath = path.replace(/^\/+/, "");

  return `${base}${normalizedPath}`;
}
