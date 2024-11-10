export const getOptionsAddress = () => {
	const addresses = [
		{
			id: 1,
			name: "Иркутск",
		},
		{
			id: 2,
			name: "Москва",
		},
		{
			id: 3,
			name: "Новосибирск",
		},
		{
			id: 4,
			name: "Самара",
		},
		{
			id: 5,
			name: "Красноярск",
		},
		{
			id: 6,
			name: "Саратов",
		},
	]
	return addresses.map((address) => ({
    label: address.name,
    value: `${address.id}`,
  }));
}
  