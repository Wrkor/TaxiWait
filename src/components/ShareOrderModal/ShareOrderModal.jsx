import { Button, Div, FormItem, FormLayoutGroup, ModalPageHeader, Radio, RadioGroup, Separator } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { shareOrderModalGet, shareOrderModalSet } from '../../helpers/index'
import AppModalCloseBtn from '../AppModalCloseBtn/AppModalCloseBtn'
import AppPanelSpinner from '../AppPanelSpinner/AppPanelSpinner'

export const ShareOrderModal = ({ onClose, ...props }) => {
    const [isDefaulOrederPulic, SetDefaultOrderPublic] = useState(false) 
    const [isLoading, SetLoading] = useState(true) 

    const onSaveClick = async () => {
        await shareOrderModalSet(isDefaulOrederPulic)
        onClose();
    };

    useEffect(() => {
        const showOnboarding = async () => {
            const buffer = await shareOrderModalGet()
            SetDefaultOrderPublic(buffer)
            SetLoading(false)
        }
    
        showOnboarding()
    }, [])

    return (
        <div> 
            {
            !isLoading
            ?
            <>
                <ModalPageHeader noSeparator after={<AppModalCloseBtn onClose={onClose} />}>
                    Отображение заказов
                </ModalPageHeader>
                <Separator />
                <FormLayoutGroup>
                    <FormItem>
                        <RadioGroup>
                            <Radio
                                value="Включено"
                                name="radio"
                                checked={isDefaulOrederPulic}
                                description="Показываю свои заказы и вижу заказы пользователей"
                                onChange={()=>{SetDefaultOrderPublic(true)}}
                            >
                                Включено
                            </Radio>
                            <Radio
                                value="Отключено"
                                name="radio"
                                checked={!isDefaulOrederPulic}
                                description="Не показываю свои заказы и не вижу заказы пользователей"
                                onChange={()=>{ SetDefaultOrderPublic(false)}}
                            >
                                Отключено
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </FormLayoutGroup>
                <Div>
                    <Button onClick={onSaveClick} stretched size="l">
                        Сохранить
                    </Button>
                </Div>
            </>
            :
                <AppPanelSpinner/>
            }
        </div>
    );
}
export default ShareOrderModal
