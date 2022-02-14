export const deepCopyList = (origins) => {
  let deepCopies = []
  for (let origin of origins) {
    deepCopies.push(origin)
  }
  return deepCopies
}