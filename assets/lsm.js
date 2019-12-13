// N - степень полинома
// roArray - весовые коэффициенты
function assemblySumsMatrix(xArray, yArray, roArray, N) {
  const pointsNum = xArray.length
  const matrix = []

  // строки
  for (let i = 0; i < N + 1; i++) {
    matrix[i] = []
    // столбцы
    for (let j = 0; j < N + 1; j++) {
      matrix[i][j] = 0
      // сборка сумм - элементов матрицы
      for (let k = 0; k < pointsNum; k++) {
        matrix[i][j] += roArray[k] * Math.pow(xArray[k], j + i)
      }
    }
    // сборка последнего члена(с "y")
    matrix[i][N + 1] = 0
    for (let k = 0; k < pointsNum; k++) {
      matrix[i][N + 1] += roArray[k] * yArray[k] * Math.pow(xArray[k], i)
    }
  }

  return matrix
}


// прямой ход
function straightStroke(matrix) {
  // rowsNum - количество строк,
  // количество столбцов rowsNum + 1
  const rowsNum = matrix.length

  // по строкам
  for (let i = 0; i < rowsNum; i++) {
    let diagElem = matrix[i][i]
    // по столбцам
    for (let j = i; j < rowsNum + 1; j++) {
      matrix[i][j] = matrix[i][j] / diagElem
    }
    // по строкам
    for (let k = i + 1; k < rowsNum; k++) {
      let underDiagElem = matrix[k][i]
      // по столбцам
      for (let l = i; l < rowsNum + 1; l++) {
        matrix[k][l] -= matrix[i][l] * underDiagElem
      }
    }
  }

  return matrix
}


// прямой ход
function backStroke(matrix) {
  // rowsNum - количество строк,
  // количество столбцов rowsNum + 1
  const rowsNum = matrix.length
  const coefs = []

  for (let i = rowsNum - 1; i >= 0; i--) {
    let sum = 0

    for (let j = i + 1; j < rowsNum; j++) {
      sum += matrix[i][j] * coefs[j]
    }

    coefs[i] = matrix[i][rowsNum] - sum
  }

  return coefs
}


// Метод прогонки
function gaussSweepMethod(matrix) {
  const diagMatrix = straightStroke(matrix)
  const result = backStroke(diagMatrix)

  return result
}


// Получить аппроксимирующую функцию (полином)
export function getApproximatingFunction(xArray, yArray, roArray, N) {
  const matrix = assemblySumsMatrix(xArray, yArray, roArray, N)
  const coefs = gaussSweepMethod(matrix)

  return function(x) {
    let y = 0

    for (let i = 0; i < N + 1; i++) {
      y += coefs[i] * Math.pow(x, i)
    }

    return y
  }
}



