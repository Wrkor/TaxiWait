import { CustomSelect } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { useSnackbarContext } from '../../../hooks'

export const AsyncCustomSelect = ({ placeholder, request, icon, onOpen, onInputChange, onClose, onSelect, defaultValue, length, ...props }) => {
  const [fetching, SetFetching] = useState(false)
  const [text, SetText] = useState("Введите адрес")
  const [options, SetOptions] = useState([])
  const { SetSnackbarError } = useSnackbarContext()

  const searchAsync = async (value) => {
		if (value?.length < length) {
			SetText("Введите адрес")
			return
		}

		SetFetching(true)
		onInputChange(value)

		try {
			const response = await request(value)

			SetText("Ничего не нашли")

			if (!!response)
				SetOptions(response)

		}
		catch (e) {
			SetSnackbarError("Не удалось загрузить данные")
		}

		SetFetching(false);
  };

	useEffect(() => {
		if (!!defaultValue) {
			SetOptions([{"value": defaultValue, "label": defaultValue}])
			searchAsync(defaultValue)
		}
	}, [defaultValue])

  return (
		<CustomSelect
			{...props}
			defaultValue={defaultValue}
			onChange={(e) => onSelect(e?.target?.value)}
			selectType="plain"
			onClick={onOpen}
			onOpen={onOpen}
			onClose={onClose}
			before={!!icon && icon}
			options={options}
			emptyText={text}
			searchable={true}
			placeholder={placeholder}
			onInputChange={e => searchAsync(e.target.value)}
			allowClearButton={true}
			fetching={fetching}
			renderDropdown={!fetching}
		/>
  )
}

export default AsyncCustomSelect