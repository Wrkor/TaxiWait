export const FilterAddresses = (arrayAddresses) => {
  const addresses = arrayAddresses.map(({ address, ref }) => ({
    label: address,
    value: address,
    ref: ref
  }));
  
  // Фильтрация адресов с длиной label больше 10 символов
  const filteredAddresses = addresses.filter(address => !!address?.label && address?.label?.length > 10);
  
  // Получение уникальных адресов
  const uniqueAddresses = Array.from(new Map(filteredAddresses.map(item => [item.label, item])).values());

  return uniqueAddresses;
};
