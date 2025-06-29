import React, { useState } from 'react';
import { useEffect } from 'react';

// Ensure RTL layout for Urdu
// document.body.dir = 'rtl';

export default function CalculationScreen() {
  const [number, setNumber] = useState('');
  const [ayatHaroof, setAyatHaroof] = useState('');
  const [maqsad, setMaqsad] = useState('');
  const [word, setWord] = useState('')
  const [results, setResults] = useState(null);

  const qamariAdads = {
    'ا': 1,  'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9,
    'ي': 10, 'ئ': 10, 'ک': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90,
    'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800,
    'ظ': 900, 'غ': 1000, 'ة': 400, 'ء': 1,
  };

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

    const actualFinal = grandFinal * Number(maqsad);
    console.log("Actual Final Result:", actualFinal);

    setResults({
      s1, s2, s3, s4, s5, total,
      divideBy4, multiplyBy2,  divideBy4again,
      divideBy3: roundedDivide,
      diff1, diff2, diff3,
      final,
      digitSum, roundedDiv2, multiplyByDigitSum,
      addRoundedDivBy2, sub51fromFinal, squaredFinal,
      grandFinal, actualFinal
    });
  };

  useEffect(() => {
    if(!results) {
      console.log("No results to process");
      return;
    };
    const sub51Str = String(results.sub51fromFinal);
    const value = sub51Str.split('').reduce((acc, digit, i) => {
      // Find the first character in qamariAdads whose value matches the digit
      const char = Object.keys(qamariAdads).find(
      key => qamariAdads[key] === Number(digit)
      );
      return char ? acc + char : acc;
    }, "");

    setWord(value);

  }, [results]);
  

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
        placeholder="مثلاً: 1135"
        value={ayatHaroof}
        onChange={(e) => setAyatHaroof(e.target.value)}
      />
      <input
        style={styles.input}
        type="number"
        placeholder="مقصد کی تعداد"
        value={maqsad}
        onChange={(e) => setMaqsad(e.target.value)}
      />

      <button onClick={handleCalculate} style={styles.button}>
        حساب کریں
      </button>

      {results && (
        <div style={styles.resultsContainer}>
          <h2 style={styles.sectionTitle}>مرحلہ 1:</h2>
          <p className='border-2 border-red-700'><span>{results.s1}</span> = {results.s1} X {results.s1}</p>
          <p className='border-2 border-red-700'><span>{results.s2}</span> = {results.s2} X {results.s2}</p>
          <p className='border-2 border-red-700'><span>{results.s3}</span> = {results.s3} X {results.s3}</p>
          <p className='border-2 border-red-700'><span>{results.s4}</span> = {results.s4} X {results.s4}</p>
          <p className='border-2 border-red-700'><span>{results.s5}</span> = {number} X {results.s4}</p>

          <p style={styles.subTitle}>{results.total} = {results.s5} + {results.s4} + {results.s3} + {results.s2} + {results.s1}</p>

          <p>{results.divideBy4} = 4 ÷ {results.s5}</p>
          <p>{results.multiplyBy2} = 2 x {results.divideBy4}</p>
          <p>{results.divideBy4again} = 4 ÷ {results.multiplyBy2}</p>
          <p>{results.divideBy3} = 3 ÷ {results.divideBy4again}</p>

          <p style={styles.subTitle}>تفریق:</p>
          <p>{results.diff1} = {results.divideBy4} - {results.total}</p>
          <p>{results.diff2} = {results.divideBy4again} - {results.diff1}</p>
          <p>{results.diff3} = {results.divideBy3} - {results.diff2}</p>
          <p>{results.final} = 4 + {results.diff3}</p>

          <p style={styles.subTitle}>قانون:</p>
          <p>{results.digitSum} = {ayatHaroof} جفر </p>
          <p>{results.roundedDiv2} = 2 ÷ {results.digitSum}</p>
          <p>{results.multiplyByDigitSum} = {results.digitSum} x {ayatHaroof}</p>
          <p>{results.addRoundedDivBy2} = 5 + {results.multiplyByDigitSum}</p>
          <p>{results.sub51fromFinal} = 51 - {results.final}</p>

          <p style={styles.subTitle}><span>{word}</span> یٔل </p>
          <p>{results.squaredFinal} = {results.final} x {results.final}</p>
          <p style={styles.final}>{results.grandFinal} = طلسم</p>
          <p style={styles.final}>{results.actualFinal} : آخری رقم </p>
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
    fontSize: '24px',
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