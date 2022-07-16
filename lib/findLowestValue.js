/**
 *
 * @param services{{service: string, value: number}}
 * @return {{service: string, value: number}}
 */
export const findLowestValue = (...services) => {
  return services.reduce((acc, curr) => {
    return acc.value < curr.value ? acc : curr;
  });
}
