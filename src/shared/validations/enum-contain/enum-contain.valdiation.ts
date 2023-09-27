export function EnumContains(
  data: string,
  enumObject: Record<string, string>,
): boolean {
  const normalizedData = data
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const lowerCaseData = normalizedData.toLowerCase(); //limpia el string de tildes y espacios
  const values = Object.values(enumObject);

  for (const value of values) {
    const normalizedValue = value
      .replace(/\s+/g, ' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); //limpia el string de tildes y espacios
    const lowerCaseValue = normalizedValue.toLowerCase();

    if (lowerCaseValue === lowerCaseData) {
      return true;
    }
  }

  return false;
}
