import React, { useState } from 'react';
import jsQR from 'jsqr';

function App() {
  const [qrCodeData, setQRCodeData] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
        if (qrCode) {
          setQRCodeData(qrCode.data);
          console.log(qrCode);
        } else {
          setQRCodeData("No QR code found.");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <h1>Simple QR scaner</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      {qrCodeData && (
        <>
          <p>output:</p>
          <div id="output">{qrCodeData}</div>
        </>
      )}
    </>
  );
}

export default App;