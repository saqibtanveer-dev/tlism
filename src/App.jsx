import React, { useState } from 'react';

// Ensure RTL layout for Urdu
document.body.dir = 'rtl';

export default function CalculationScreen() {
  const [number, setNumber] = useState('');
  const [ayatHaroof, setAyatHaroof] = useState('');
  const [results, setResults] = useState(null);

  const customRoundOff = (num) => {
    const decimal = num - Math.floor(num);
    if(decimal < 6){
      return Math.floor(num);
    }
    return Math.ceil(num);
  }

  const handleCalculate = () => {
    const n = parseInt(number);
    if (isNaN(n)) return;

    const s1 = n;
    const s2 = n * s1;
    const s3 = n * s2;
    const s4 = n * s3;
    const s5 = n * s4;

    const total = s2 + s3 + s4 + s5;

    const divideBy4 = Math.trunc(total / 4);
    const multiplyBy2 = 2 * divideBy4;
    const divideBy4again = Math.trunc(multiplyBy2 / 4);
    const divideBy3 = Math.trunc(divideBy4again / 3);
    const roundedDivide = Math.trunc(divideBy3);

    const diff1 = Math.abs(divideBy4 - total);
    const diff2 = Math.abs(divideBy4again - diff1);
    const diff3 = Math.abs(roundedDivide - diff2);
    const final = 4 + diff3;

    const digitSum = ayatHaroof.split('').reduce((sum, num) => sum + Number(num), 0)
    const roundedDiv2 = Math.trunc(digitSum / 2);
    const multiplyByDigitSum = Number(ayatHaroof) * digitSum;
    const addRoundedDivBy2 = multiplyByDigitSum + roundedDiv2;

    const sub51fromFinal = final - 51;
    const squaredFinal = final * final;
    const grandFinal = squaredFinal * addRoundedDivBy2;

    setResults({
      s1, s2, s3, s4, s5, total,
      divideBy4, multiplyBy2,  divideBy4again,
      divideBy3: roundedDivide,
      diff1, diff2, diff3,
      final,
      digitSum, roundedDiv2, multiplyByDigitSum,
      addRoundedDivBy2, sub51fromFinal, squaredFinal,
      grandFinal
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔢 عدد درج کریں</h1>

      <input
        style={styles.input}
        type="number"
        placeholder="مثلاً: 7"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        style={styles.input}
        type="number"
        placeholder="مثلاً: 7"
        value={ayatHaroof}
        onChange={(e) => setAyatHaroof(e.target.value)}
      />

      <button onClick={handleCalculate} style={styles.button}>
        حساب کریں
      </button>

      {results && (
        <div style={styles.resultsContainer}>
          <h2 style={styles.sectionTitle}>مرحلہ 1:</h2>
          <p>1 = {results.s1}</p>
          <p>2 = {results.s2}</p>
          <p>3 = {results.s3}</p>
          <p>4 = {results.s4}</p>
          <p>5 = {results.s5}</p>

          <p style={styles.subTitle}>مجموعہ = {results.total}</p>

          <p>/ 4 = {results.divideBy4}</p>
          <p>× 2 = {results.multiplyBy2}</p>
          <p>/ 4 = {results.divideBy4again}</p>
          <p>÷ 3 = {results.divideBy3}</p>

          <p style={styles.subTitle}>تفریق:</p>
          <p>1 = {results.diff1}</p>
          <p>2 = {results.diff2}</p>
          <p>3 = {results.diff3}</p>
          <p>آخری عدد = {results.final}</p>

          <p style={styles.subTitle}>قانون:</p>
          <p>{results.digitSum}</p>
          <p>/2 = {results.roundedDiv2}</p>
          <p>{results.multiplyByDigitSum}</p>
          <p>{results.addRoundedDivBy2}</p>
          <p>- 51 = {results.sub51fromFinal}</p>

          <p style={styles.subTitle}>رفشاغایل:</p>
          <p>{results.final} x {results.final} = {results.squaredFinal}</p>
          <p style={styles.final}>Grand Final is: {results.grandFinal}</p>
        </div>
      )}
      <div style={{height: '100px'}}></div>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    color: 'black',
    padding: '16px',
    paddingBlock: '26px',
    backgroundColor: '#fff',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: '12px',
    color: '#006400',
  },
  input: {
    borderWidth: '1px',
    borderColor: '#aaa',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    textAlign: 'right',
    fontSize: '18px',
    width: '100%',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: '#006400',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    width: '100%',
    border: 'none',
    cursor: 'pointer'
  },
  resultsContainer: {
    paddingTop: '10px',
    textAlign: 'right'
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#1e40af',
    textAlign: 'right',
    marginBottom: '8px',
  },
  subTitle: {
    marginTop: '10px',
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#8b0000',
  },
  final: {
    marginTop: '12px',
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'right',
    color: '#4b0082',
  },
};