import * as Sentry from '@sentry/nuxt'

import { objectEntries, objectFromEntries } from '~/utils/functions/typeSafe'
import type { FiltersBySkillCategory } from '~/utils/functions/skillLists'
import type { SkillCategory } from '~/utils/types/skills'

export type RegExpsBySkillCategory = {
  [key in SkillCategory]: Array<RegExp | null>
}
export type BooleansBySkillCategory = {
  [key in SkillCategory]: boolean[]
}
export type ErrorMessagesBySkillCategory = {
  [key in SkillCategory]: Array<string[]>
}

export default function (searches: Ref<FiltersBySkillCategory>) {
  const { t } = useI18n()
  const storeSearches = useStoreSearches()

  const regexps = ref<RegExpsBySkillCategory>(
    objectFromEntries(
      objectEntries(searches.value).map(([category, searches]) => [
        category,
        searches.map((_search) => null),
      ]),
    ),
  )
  const haveErrors = ref<BooleansBySkillCategory>(
    objectFromEntries(
      objectEntries(searches.value).map(([category, searches]) => [
        category,
        searches.map((_search) => false),
      ]),
    ),
  )
  const errorMessages = computed<ErrorMessagesBySkillCategory>(() =>
    objectFromEntries(
      objectEntries(haveErrors.value).map(([category, hasErrors]) => [
        category,
        hasErrors.map((hasError) =>
          hasError ? [t('global.invalidRegExp')] : [],
        ),
      ]),
    ),
  )

  function updateRegExps() {
    objectEntries(searches.value).forEach(([category, searches]) => {
      searches.forEach((search, index) => {
        haveErrors.value[category][index] = false
        if (!search) return

        try {
          regexps.value[category][index] = storeSearches.filterToRegexp(search)
        } catch (error) {
          if (storeSearches.useRegExp) {
            haveErrors.value[category][index] = true
          } else {
            Sentry.captureException(error, {
              tags: {
                search,
                searches: searches.join('<{[]}>'),
                locator: 'useSearchesBySkillCategory/updateRegExps',
              },
            })
          }
        }
      })
    })
  }
  watch(searches, updateRegExps, { deep: true })
  watch(() => storeSearches.useRegExp, updateRegExps)

  return {
    regexps,
    haveErrors,
    errorMessages,
  }
}
