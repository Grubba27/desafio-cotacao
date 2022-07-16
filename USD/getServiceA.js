import fetch from "node-fetch";

/**
 *
 * @return {Promise<{service: "A", value: number}>}
 */
export const getServiceAUSD = async () => {
  console.time("getServiceAUSD");
  const response = await fetch('http://localhost:8080/servico-a/cotacao?moeda=USD');
  console.timeEnd("getServiceAUSD");
  const k = await response.json();
  return treatedData(k);
}
/**
 *
 *
 * @return {{service: "A", value: number}}
 * @param data{{
 *  "cotacao": number,
 * 	"moeda": "USD",
 * 	"symbol": "💵"
 * }}
 */
const treatedData =  (data) => {
  return {value: data.cotacao, service: "A"};
}
