export function match(param: string): boolean {
  return isValidPassword(param);
}

const isValidPassword = (password: any) =>
  !!password && typeof password === "string" && password.length >= 3;
