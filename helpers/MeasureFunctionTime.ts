export function MeasureFunctionTime<T>(callback: () => T): T {
  const start = performance.now()
  const result = callback()
  const end = performance.now()
  console.log(`Execution time: ${end - start} milliseconds`)
  return result
}
