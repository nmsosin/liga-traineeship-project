export const booleanMap = (value?: string | boolean) => {
  switch (value) {
    case true:
    case 'true':
      return true;
      break;
    case false:
    case 'false':
      return false;
      break;
    default:
      return false;
  }
};
