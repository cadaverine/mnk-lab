// N - степень полинома
// roArray - весовые коэффициенты
export default function mnk(xArray, yArray, roArray, N) {
  const pointsNum = xArray.length
  // сборка матрицы для нахождения
  // значений коэффициентов

  let matrix = [];
  let degree = 0;
  // строки
  for (let i = 0; i <= N; i++) {
    matrix[i] = [];
    // столбцы
    for (let j = 0; j <= N; j++) {
      matrix[i][j] = 0;
      // сборка сумм - элементов матрицы
      for (let k = 0; k < pointsNum; k++) {
        matrix[i][j] += roArray[k] * Math.pow(xArray[k], j + degree)
      }
    }
    // сборка последнего члена(с "y")
    matrix[i][N + 1] = 0
    for (let k = 0; k < xArray.length; k++) {
      matrix[i][N + 1] += roArray[k] * yArray[k] * Math.pow(xArray[k], degree)
    }

    degree++;
  }

  // метод Гаусса получения трехдиагональной матрицы

  // смещение по диагонали (d - diagonal)
  for (let d = 0; d < N; d++) {
    // строки
    for (let i = 1; i + d <= N; i++) {
      // столбцы
      for (let j = 0; j + d <= N + 1; j++) {
        matrix[i + d][j + d] -= (matrix[i + d][d] / matrix[d][d]) * matrix[d][j + d]
      }
    }
  }

  // блок рассчета коэффициентов обратным ходом

  let coef = new Array(N + 1).fill(0)
  // строки
  for (let i = N; i >= 0; i--) {
    // столбцы
    for (let j = N + 1; j - i > 1; j--) {
      matrix[i][N + 1] -= matrix[i][j - 1] * coef[j - 1];
    }

    // рассчет коэффициента
    coef[i] = matrix[i][N + 1] / matrix[i][i]
  }

  const xResult = [...xArray]
  const yResult = []

  let buffer = 0

  for (let j = 0; j < xResult.length; j++) {
    for (let k = 0; k <= N; k++) {
      buffer += coef[k] * Math.pow(xResult[j], k)
    }

    yResult[j] = buffer
    buffer = 0
  }

  return {
    X: xResult,
    Y: yResult,
  }
}