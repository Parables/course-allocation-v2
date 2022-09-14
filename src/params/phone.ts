export function match(param: string): boolean {
  return isValidPhoneNumber(param);
}

const isValidPhoneNumber = (phoneNumber: any) =>
  !!phoneNumber && typeof phoneNumber === "string";
