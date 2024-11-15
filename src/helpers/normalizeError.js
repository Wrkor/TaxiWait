export const NormalizeError = (error) => {
  if (!error) {
    return error;
  }

  return new Error(JSON.stringify(error));
};
