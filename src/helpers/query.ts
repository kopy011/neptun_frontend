export function queryByFilter(
  entity: any,
  filter: Record<string, any>
): boolean {
  for (const key of Object.keys(filter)) {
    if (
      !(entity[key] as string)
        .toLocaleLowerCase()
        .includes(filter[key].toLocaleLowerCase())
    ) {
      return false;
    }
  }
  return true;
}
