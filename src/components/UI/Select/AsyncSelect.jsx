import { CustomSelect } from '@vkontakte/vkui'
import debounce from 'lodash.debounce'
import { useEffect, useMemo, useState } from 'react'
import { useSnackbarContext, useUserContext } from '../../../hooks'

export const AsyncCustomSelect = ({ placeholder, request, icon, onOpen, onInputChange, onClose, onSelect, defaultValue, length, filterOptions, ...props }) => {
  const [fetching, SetFetching] = useState(false)
  const [text, SetText] = useState("Введите адрес")
  const [options, SetOptions] = useState([])
  const { SetSnackbarError } = useSnackbarContext()
	const [inputValue, setInputValue] = useState('');
	const { vkToken } = useUserContext()

  const fetch = async (query) => {
    if (!query || query?.length < length) {
			SetText("Введите адрес")
			return;
		}
		
		SetFetching(true)
		onInputChange(query)
		console.log("vkToken", vkToken)
    try {
      const result = await request(query, vkToken)
			SetText("Ничего не нашли")
      SetOptions(result);
    } 
		catch {
			SetSnackbarError("Не удалось загрузить данные")
		}
		finally {
			SetFetching(false);
		}
  };

  const debouncedFetchAddresses = useMemo(() => 
		debounce(fetch, 1000), [vkToken]);

	const filteredOptions = useMemo(() => {
		return !!filterOptions ? filterOptions(options) : options
	}, [options, filterOptions]);

	useEffect(() => {
		debouncedFetchAddresses(inputValue);

		return () => debouncedFetchAddresses.cancel()
	}, [inputValue, debouncedFetchAddresses]);

	useEffect(() => {
		if (!!defaultValue) {
			SetOptions([{"value": defaultValue, "label": defaultValue}])
			fetch(defaultValue)
		}
	}, [defaultValue])

  return (
		<CustomSelect
			{...props}
			defaultValue={defaultValue}
			onChange={(e) => onSelect(e?.target?.value)}
			onInputChange={e => setInputValue(e?.target?.value)}
			options={filteredOptions}
			fetching={fetching}
			renderDropdown={!fetching}
			onClick={onOpen}
			onOpen={onOpen}
			onClose={onClose}
			before={!!icon && icon}
			selectType="plain"
			emptyText={text}
			searchable={true}
			placeholder={placeholder}
			allowClearButton={true}
			/>
  )
}

export default AsyncCustomSelect