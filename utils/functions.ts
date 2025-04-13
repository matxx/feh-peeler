const substitutions = {
  ' ': '_',
  '/': '-',
}

export const escapeName = (str: string) =>
  // @ts-expect-error no sure what to do
  str.replace(/[ /]/g, (m) => substitutions[m] || m)
