import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState('');
  const [word, setWord] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [size, setSize] = useState(300);
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    if (word && size && bgColor) {
      const encodedWord = encodeURIComponent(word);
      setQrCode(
        `http://api.qrserver.com/v1/create-qr-code/?data=${encodedWord}&size=${size}x${size}&bgcolor=${bgColor}`
      );
    }
  }, [word, size, bgColor]);

  function handleClick() {
    setWord(temp);
  }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>

      <div className="firstRow">
        <input
          type="text"
          placeholder="Enter text to encode"
          onChange={(e) => setTemp(e.target.value)}
        />
        <button onClick={handleClick}>Generate</button>
      </div>

      <div className="secondRow">
        <span className="label">Color</span>
        <input
          type="color"
          onChange={(e) => setBgColor(e.target.value.substring(1))}
        />

        <span className="label">Size ({size}px)</span>
        <input
          type="range"
          value={size}
          min="200"
          max="600"
          onChange={(e) => setSize(e.target.value)}
        />
      </div>

      {qrCode && (
        <div className="result">
          <div className="preview">
            <img src={qrCode} alt="QR Code" />
          </div>
          <a href={qrCode} download="qr-code.png">
            <button type="button">Download</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;

