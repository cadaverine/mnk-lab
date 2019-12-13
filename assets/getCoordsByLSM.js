import { getApproximatingFunction } from "./lsm"

// Получить координаты аппроксимирущей кривой (МНК)
export default function getCoordsByLSM(xArray, yArray, roArray, N) {
  const polynome = getApproximatingFunction(xArray, yArray, roArray, N);
  const yCoords = [];

  for (let i = 0; i < xArray.length; i++) {
    yCoords[i] = polynome(xArray[i]);
  }

  return {
    X: xArray,
    Y: yCoords,
  };
}
