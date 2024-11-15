import { Button, Div, FormItem, FormLayoutGroup, ModalPageHeader, Radio, RadioGroup, Separator } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { ShareOrderModalGet, ShareOrderModalSet } from '../../helpers/'
import AppModalCloseBtn from '../AppModalCloseBtn/AppModalCloseBtn'

export const ShareOrderModal = ({ onClose, ...props }) => {
    const [isDefaulOrderPulic, SetDefaultOrderPublic] = useState(false) 

    const onSaveClick = async () => {
        await ShareOrderModalSet(String(isDefaulOrderPulic))
        onClose();
    };

    useEffect(() => {
        const showOnboarding = async () => {
            const buffer = await ShareOrderModalGet()
            SetDefaultOrderPublic(buffer)
        }

        showOnboarding()
    }, [])

    return (
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
                            checked={isDefaulOrderPulic}
                            description="Показываю свои заказы и вижу заказы пользователей"
                            onChange={()=>{SetDefaultOrderPublic(true)}}
                        >
                            Включено
                        </Radio>
                        <Radio
                            value="Отключено"
                            name="radio"
                            checked={!isDefaulOrderPulic}
                            description="Не показываю свои заказы и не вижу заказы пользователей"
                            onChange={()=>{ SetDefaultOrderPublic(false)}}
                            checked={!isDefaulOrderPulic}
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
    );
}
export default ShareOrderModal
