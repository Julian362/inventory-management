export const IsPasswordValid = (value: string) => {
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
  return passRegex.test(value);
};
