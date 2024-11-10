import { useEffect, useState  } from 'react';
import { Button, Div, ModalPageHeader, Separator, FormLayoutGroup, FormItem, RadioGroup, Radio} from '@vkontakte/vkui';
import AppModalCloseBtn from '../AppModalCloseBtn/AppModalCloseBtn';
import { shareOrderModalSet, shareOrderModalGet } from '../../helpers/index'


export const ShareOrderModal = ({ onClose, ...props }) => {
    //const [isDefaulOrederPulic, SetDefaultOrderPublic] = useState(false) 
    //let isDefaulOrederPulic = false
    //console.log(isDefaulOrederPulic)

    //let isCurrentOrderPublic = isDefaulOrederPulic

    const onSaveClick = async () => {
        //await shareOrderModalSet(isCurrentOrderPublic)
        onClose();
    };


    // useEffect(() => {
    //     const showOnboarding = async () => {
    //         let buffer = await shareOrderModalGet()
    //         console.log("in get:"+buffer)
    //         SetDefaultOrderPublic(buffer)
    //     }
    
    //     showOnboarding()
    //   })

    return (
        <>
            <ModalPageHeader noSeparator after={<AppModalCloseBtn onClose={onClose} />}>Отображение заказов</ModalPageHeader>
            <Separator />
            <FormLayoutGroup>
                <FormItem>
                    <RadioGroup>
                        <Radio
                            value="Включено"
                            name="radio"
                            //defaultChecked={isDefaulOrederPulic}
                            description="Показываю свои заказы и вижу заказы пользователей"
                            //onChange={()=>{isCurrentOrderPublic = !isCurrentOrderPublic}}
                        >
                            Включено
                        </Radio>
                        <Radio
                            value="Отключено"
                            name="radio"
                            //defaultChecked={!isDefaulOrederPulic}
                            description="Не показываю свои заказы и не вижу заказы пользователей"
                            //onChange={()=>{isCurrentOrderPublic = !isCurrentOrderPublic}}
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
