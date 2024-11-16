import { useContext } from 'react'
import { TaxiContext } from '../context/TaxiProvider'

/**
 * Хук, который содержит информацию об активном заказе
 */
export const useTaxiContext = () => {
  const taxiContext = useContext(TaxiContext)

  const order = taxiContext?.taxi?.order
  const price = taxiContext?.taxi?.price
  const waitPrice = taxiContext?.taxi?.waitPrice
  const discount = taxiContext?.taxi?.discount
  const discountPrice = taxiContext?.taxi?.discountPrice

	const SetOrder = (value) => {
    const price = value?.options?.map(option => option.price).sort()[0]

		taxiContext.SetTaxi(prev => ({
      ...prev,
      order: value,
      price,
    }))
  }

  const ClearOrder = () => {
		taxiContext.SetTaxi(prev => ({
      ...prev,
      order: {},
      price: 0,
    }))
  }
  
  const SetWaitPrice = (value) => {
    taxiContext.SetTaxi(prev => ({
    ...prev,
    waitPrice: value,
  }))
}

  const SetDiscount = (value) => {
      taxiContext.SetTaxi(prev => ({
      ...prev,
      discount: value,
    }))
  }

	const SetDiscountPrice = (value) => {
		taxiContext.SetTaxi(prev => ({
      ...prev,
      discountPrice: value,
    }))
  }

	return {taxiContext, price, order, SetOrder, ClearOrder, discountPrice, SetDiscountPrice, discount, SetDiscount, waitPrice, SetWaitPrice}
}

export default useTaxiContext