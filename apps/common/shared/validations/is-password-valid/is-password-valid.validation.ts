export const IsPasswordValid = (value: string) => {
  const passRegex =
    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
  return passRegex.test(value);
};
