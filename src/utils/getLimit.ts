export function getLimit() {
  return window.innerWidth >= 1440 ? 10 : window.innerWidth >= 768 ? 9 : 8;
}
