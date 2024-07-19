import React, { useState, useEffect } from 'react';
import './Matrix.css'; // Import the CSS file

const generateMatrix = () => {
    let numbers = Array.from({ length: 16 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return Array.from({ length: 4 }, (_, i) => numbers.slice(i * 4, i * 4 + 4));
};

const findLuckyNumbers = (matrix) => {
    const minInRows = matrix.map(row => Math.min(...row));
    const maxInCols = Array.from({ length: 4 }, (_, colIndex) => Math.max(...matrix.map(row => row[colIndex])));
    let luckyNumbers = [];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (matrix[i][j] === minInRows[i] && matrix[i][j] === maxInCols[j]) {
                luckyNumbers.push(matrix[i][j]);
            }
        }
    }
    return luckyNumbers;
};

const Matrix = () => {
    const [matrix, setMatrix] = useState([]);
    const [luckyNumbers, setLuckyNumbers] = useState([]);

    const regenerateMatrix = () => {
        let newMatrix, luckyNums;
        do {
            newMatrix = generateMatrix();
            luckyNums = findLuckyNumbers(newMatrix);
        } while (luckyNums.length === 0);
        setMatrix(newMatrix);
        setLuckyNumbers(luckyNums);
    };

    useEffect(() => {
        regenerateMatrix();
    }, []);

    return (
        <div className="matrix-container">
            <button onClick={regenerateMatrix} className="try-again-button">Try Again</button>
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((num, colIndex) => (
                        <div key={colIndex} className="cell">
                            {num}
                        </div>
                    ))}
                </div>
            ))}
            <div className="lucky-numbers">
                Lucky number: {luckyNumbers.join(', ')}
            </div>
        </div>
    );
};

export default Matrix;
