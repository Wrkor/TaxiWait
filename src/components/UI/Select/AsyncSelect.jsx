import { CustomSelect } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { usePlatforms } from '../../../hooks'

export const AsyncCustomSelect = ({ placeholder, request, icon, onOpen, onInputChange, onClose, onSelect, defaultValue, ...props }) => {
  const [fetching, SetFetching] = useState(false);
  const [options, SetOptions] = useState([]);
	const { SetFocusedInput } = usePlatforms()

  const searchAsync = async (value) => {
		SetFetching(true);
		onInputChange(value)
		const options = await request(value)
		SetOptions([...options]);
		SetFetching(false);
  };

	useEffect(() => {
		if (!!defaultValue) {
			searchAsync(defaultValue)
		}
	}, [defaultValue])

  return (
		<CustomSelect
			{...props}
			defaultValue={defaultValue}
			onFocus={() => SetFocusedInput(true)}
			onBlur={() => SetFocusedInput(false)}
			onChange={(e) => onSelect(e?.target?.value)}
			selectType="plain"
			onClick={onOpen}
			onOpen={onOpen}
			onClose={onClose}
			before={!!icon && icon}
			options={options}
			emptyText={"Ничего не нашли"}
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