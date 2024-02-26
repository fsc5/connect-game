import { width, height, neededConnections } from "./GameDefinitions"


export function isVerticalWin(arr) {
    for (let i = 0; i < height; i++) {
        let currentPlayer = -1;
        let score = 0;
        for (let j = 0; j < width; j++) {
            if (arr[i][j] === currentPlayer && currentPlayer !== -1) {
                score += 1;
                if (score === neededConnections) {
                    return true;
                }
            } else {
                currentPlayer = arr[i][j];
                score = 1;
            }
        }
    }
    return false;
}

export function isDiagnolWin(arr) {
    for (let i = 0; i < height; i++) {
        let currentPlayer = -1;
        let score = 0;
        for (let j = 0; j + i < height; j++) {
            if (arr[i + j][j] === currentPlayer && currentPlayer !== -1) {
                score += 1;
                if (score === neededConnections) {
                    return true;
                }
            } else {
                currentPlayer = arr[i + j][j];
                score = 1;
            }
        }
    }
    for (let i = 0; i < width; i++) {
        let currentPlayer = -1;
        let score = 0;
        for (let j = 0; j + i < width; j++) {
            if (arr[j][i + j] === currentPlayer && currentPlayer !== -1) {
                score += 1;
                if (score === neededConnections) {
                    return true;
                }
            } else {
                currentPlayer = arr[j][i + j];
                score = 1;
            }
        }
    }
    for (let i = 0; i < width; i++) {
        let currentPlayer = -1;
        let score = 0;
        for (let j = 0; i+j < width; j++) {
            if (arr[height-1-j][i+j] === currentPlayer && currentPlayer !== -1) {
                score += 1;
                if (score === neededConnections) {
                    return true;
                }
            } else {
                currentPlayer = arr[height-1-j][i+j];
                score = 1;
            }
        }
    }
    return false;
}

export function isHorizontalWin(arr){
    for (let i = 0; i < width; i++) {
        let currentPlayer = -1;
        let score = 0;
        for (let j = 0; j < height; j++) {
            if (arr[j][i] === currentPlayer && currentPlayer !== -1) {
                score += 1;
                if (score === neededConnections) {
                    return true;
                }
            } else {
                currentPlayer = arr[j][i];
                score = 1;
            }
        }
    }
    return false;
}