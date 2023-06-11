export function queryByFilter(
  entity: any,
  filter: Record<string, any>
): boolean {
  for (const key of Object.keys(filter)) {
    if (filter[key] || (filter[key] as number) === 0) {
      switch (typeof entity[key.split('.')[0]]) {
        case 'string': {
          if (
            !(entity[key] as string)
              .toLocaleLowerCase()
              .includes(filter[key].toLocaleLowerCase())
          ) {
            return false;
          }
          break;
        }
        case 'number': {
          return (entity[key] as number) === (filter[key] as number);
        }
        case 'object': {
          if (entity[key.split('.')[0]] instanceof Date) {
            const dateString = entity[key.split('.')[0]].toDateString();
            if (
              !dateString
                .toLocaleLowerCase()
                .includes(filter[key].toLocaleLowerCase())
            ) {
              return false;
            }
          } else {
            const nestedFilter: Record<string, any> = {};
            nestedFilter[key.split('.')[1]] = filter[key];
            console.log(nestedFilter);
            return queryByFilter(entity[key.split('.')[0]], nestedFilter);
          }
          break;
        }
        default: {
          break;
        }
      }
    }
  }
  return true;
}
