export const TruncateString = (name: string, cutoff: number = 9) => {
  if (name.length > cutoff) {
    return `${name.substring(0, cutoff).trimEnd()}...`
  } else {
    return name
  }
}
