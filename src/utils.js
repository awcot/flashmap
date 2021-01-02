export function isEmpty(obj) {
  for (const prop in obj) return false
  return true
}
