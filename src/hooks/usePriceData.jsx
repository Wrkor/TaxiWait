import { useContext } from 'react'
import { DataContext } from '../context/data'

const defaultValues = {
  discount: 20,
  price: 0,
  discountPrice: 0,
}

export const usePriceData = () => {
  const dataContext = useContext(DataContext)

  const price = dataContext?.data?.price?.price
  const discount = dataContext?.data?.price?.discount
  const discountPrice = dataContext?.data?.price?.discountPrice

	const SetPrice = (value) => {
		dataContext.setData({
      ...dataContext?.data,
      price: {
        ...defaultValues,
				...dataContext?.data?.price,
        price: value,
      }
    })
	}
  
    const SetDiscount = (value) => {
      dataContext.setData({
        ...dataContext?.data,
        price: {
          ...defaultValues,
          ...dataContext?.data?.price,
          discount: value,
        }
      })
    }

	const SetDiscountPrice = (value) => {
		dataContext.setData({
      ...dataContext?.data,
      price: {
        ...defaultValues,
				...dataContext?.data?.price,
        discountPrice: value,
      }
    })
	}

	return {price, SetPrice, discountPrice, SetDiscountPrice, discount, SetDiscount}
}

export default usePriceData