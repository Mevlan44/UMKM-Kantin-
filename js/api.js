// ===== API HELPER - KantinKu =====
// Komunikasi antara website dan Google Apps Script (Sheets + Drive)

/**
 * Upload foto bukti pembayaran ke Google Drive
 * @param {File} file - File object dari input
 * @returns {Promise<string>} - URL foto di Google Drive
 */
async function uploadToGDrive(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Gagal membaca file'));

    reader.onload = async (e) => {
      try {
        // Ambil base64 saja (tanpa prefix "data:image/...;base64,")
        const base64 = e.target.result.split(',')[1];

        const response = await fetch(CONFIG.SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            action:      'uploadPhoto',
            fileName:    file.name,
            fileBase64:  base64,
            mimeType:    file.type
          })
        });

        const result = await response.json();

        if (result.success) {
          resolve(result.url);
        } else {
          reject(new Error(result.message || 'Upload foto gagal'));
        }
      } catch (err) {
        reject(err);
      }
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Simpan data pesanan ke Google Sheets
 * @param {Object} orderData - Data pesanan
 * @returns {Promise<string>} - Order ID
 */
async function saveOrderToSheets(orderData) {
  const response = await fetch(CONFIG.SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
      action: 'saveOrder',
      order:  orderData
    })
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Gagal menyimpan pesanan ke Sheets');
  }

  return result.orderId;
}
