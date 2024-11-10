import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Panel, PanelHeader } from '@vkontakte/vkui'
import { useState } from 'react'

export const AccountPanel = ({ id, fetchedUser }) => {
  const routeNavigator = useRouteNavigator()
  const [simple, setSimple] = useState('one')

  return (
    <Panel id={id}>
      <PanelHeader delimiter="none" >Профиль</PanelHeader>
    </Panel>
  )
}

export default AccountPanel