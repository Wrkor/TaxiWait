import bridge from '@vkontakte/vk-bridge'
import { useEffect, useState } from 'react'
import globalConstants from '../config/globalConstants'
import { NormalizeError } from '../helpers'
import useUserContext from './useUserContext'

/**
 * Хук, который получает все права доступа пользователя
 */
export const useAllowedScopes = () => {
  const [isAllowedScopesLoading, SetAllowedScopesLoading] = useState(true)
  const [allowedScopeError, SetAllowedScopeError] = useState(null)

  const { userAllowedScopes, SetUserAllowedScopes } = useUserContext()

  useEffect(() => {
    SetAllowedScopesLoading(true)

    const fetching = async () => {
      // Список прав через запятую

      const scopes = [globalConstants.scope.group_messages, globalConstants.scope.friends].join(",")

      try {
        const data = await bridge.send('VKWebAppCheckAllowedScopes', { scopes })

        // Права доступа получены

        if (data.result) {
          SetUserAllowedScopes(data.result)
        }
      } 
      catch (e) {

        // Получена ошибка

        console.error("[ERROR] useAllowedScopes: ", e)
        SetAllowedScopeError(NormalizeError('Ошибка получения прав доступа пользователя'))
      } 
      finally {
        SetAllowedScopesLoading(false)
      }
    }
    fetching()
  }, [])

  return { isAllowedScopesLoading, allowedScopeError, userAllowedScopes }
}

export default useAllowedScopes