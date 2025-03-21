export const TruncateString = (name: string, cutoff: number = 9, addEllipsis: boolean = true) => {
  // Check if there's a space before or exactly at cutoff + 1
  const spaceIndex = name.indexOf(" ")

  if (spaceIndex > 0 && spaceIndex <= cutoff) {
    // Return just the first word if space is before cutoff
    return name.substring(0, spaceIndex)
  } else if (spaceIndex === cutoff + 1 || name.length <= cutoff) {
    // Don't truncate if first space is at cutoff + 1 or string is shorter than cutoff
    return name
  } else {
    if (addEllipsis) {
      return `${name.substring(0, cutoff).trimEnd()}`
    } else {
      return name
    }
  }
}
