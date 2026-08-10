export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}
