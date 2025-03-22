const SORTABLE_NAME_ATK = '[STAT_0]'
const SORTABLE_NAME_SPD = '[STAT_1]'
const SORTABLE_NAME_DEF = '[STAT_2]'
const SORTABLE_NAME_RES = '[STAT_3]'

export function getSortableName(name: string) {
  return name
    .replace(/Atk/g, SORTABLE_NAME_ATK)
    .replace(/Spd/g, SORTABLE_NAME_SPD)
    .replace(/Def/g, SORTABLE_NAME_DEF)
    .replace(/Res/g, SORTABLE_NAME_RES)
    .replace(/A\/S/g, `${SORTABLE_NAME_ATK}/${SORTABLE_NAME_SPD}`)
    .replace(/A\/D/g, `${SORTABLE_NAME_ATK}/${SORTABLE_NAME_DEF}`)
    .replace(/A\/R/g, `${SORTABLE_NAME_ATK}/${SORTABLE_NAME_RES}`)
    .replace(/S\/D/g, `${SORTABLE_NAME_SPD}/${SORTABLE_NAME_DEF}`)
    .replace(/S\/R/g, `${SORTABLE_NAME_SPD}/${SORTABLE_NAME_RES}`)
    .replace(/D\/R/g, `${SORTABLE_NAME_DEF}/${SORTABLE_NAME_RES}`)
}
