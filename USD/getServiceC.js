import fetch from "node-fetch";
import { cEmitter } from "../index.js";

/**
 *
 * @return {Promise<void>}
 */
const getData = async (cb) => {
  console.time("getServiceCUSD");
  const response = await fetch('http://localhost:8080/servico-c/cotacao', {
    method: 'post',
    body: JSON.stringify({
      "tipo": "USD",
      "callback": "http://127.0.0.1:3001/service-c",
      "cid": "74d3fb63-5621-46fd-85d1-56e4e9c04a3a"
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.status !== 202) {
    throw new Error(`Error ${response.status}`);
  }
  const status = await response.json()
  console.log(status);
  cEmitter.on('service-c', (data) => {
    cb(treatedData(data))
    console.timeEnd("getServiceCUSD");
  });
}
/**
 *
 * @param data{{
 *     "cid": "74e3fb63-5621-46fd-85d1-56e4e9c04a3a",
 *     "f": 1000,
 *     "t": "EUR",
 *     "v": 3.675
 * }}
 * @return {{service: string, value: number}}
 */
const treatedData = (data) => {
  return { value: data.v, service: "C" };
}

/**
 * @return {Promise<{service: "C", value: number}>}
 */
export const getServiceCUSD = async () =>
  new Promise((resolve) => getData((data) => resolve(data)));
