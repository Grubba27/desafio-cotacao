import fetch from "node-fetch";

/**
 *
 * @return {Promise<{service: "B", value: number}>}
 */
export const getServiceBUSD = async () => {
  console.time("getServiceBUSD");
  const response = await fetch('http://localhost:8080/servico-b/cotacao?curr=USD');
  console.timeEnd("getServiceBUSD");
  const r = await response.json();
  return treatedData(r);
}

/**
 *
 * @param data{ {"cotacao": {
 *   "fator": number,
 *   "currency": "USD",
 *   "valor": string,
 *   }}}
 * @return {{service: "B", value: number}}
 */
const treatedData = (data) => {
  const value = Number(data.cotacao.valor)/data.cotacao.fator
  return {
    value,
    service: "B",
  };
}
