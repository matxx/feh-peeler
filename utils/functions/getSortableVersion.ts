const getSortableVersion = (str: string): string =>
  str
    .split('.')
    .map((x) => x.padStart(2, '0'))
    .join('.')

export default getSortableVersion
