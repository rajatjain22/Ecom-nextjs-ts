export const createHandle = (str) => {
  str = str.toLowerCase();
  str = str.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return str;
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
