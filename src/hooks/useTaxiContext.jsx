import { useContext } from 'react'
import { TaxiContext } from '../context/TaxiProvider'

/**
 * Хук, который содержит информацию об активном заказе
 */
export const useTaxiContext = () => {
  const taxiContext = useContext(TaxiContext)

  const price = taxiContext?.taxi?.price
  const discount = taxiContext?.taxi?.discount
  const discountPrice = taxiContext?.taxi?.discountPrice

	const SetPrice = (value) => {
		taxiContext.SetTaxi({
      ...taxiContext?.taxi,
      price: value,
    })
	}
  
    const SetDiscount = (value) => {
      taxiContext.SetTaxi({
        ...taxiContext?.taxi,
        discount: value,
      })
    }

	const SetDiscountPrice = (value) => {
		taxiContext.SetTaxi({
      ...taxiContext?.taxi,
      discountPrice: value,
    })
	}

	return {taxiContext, price, SetPrice, discountPrice, SetDiscountPrice, discount, SetDiscount}
}

export default useTaxiContext