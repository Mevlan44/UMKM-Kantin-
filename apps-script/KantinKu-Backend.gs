// ===================================================
// KANTINKU BACKEND - Google Apps Script
// Akun: mevlana.atmajati@gmail.com
// ===================================================
// CARA DEPLOY:
// 1. Buka script.google.com → Buat project baru
// 2. Paste semua kode ini
// 3. Klik Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy URL → paste ke js/config.js
// ===================================================

const SPREADSHEET_NAME = 'KantinKu - Data Pesanan';
const DRIVE_FOLDER_NAME  = 'KantinKu - Bukti Pembayaran';
const SHEET_NAME         = 'Pesanan';

// --------------------------------------------------
// ENTRY POINTS
// --------------------------------------------------

function doPost(e) {
  try {
    const data   = JSON.parse(e.postData.contents);
    const action = data.action;

    let result;
    if (action === 'saveOrder') {
      result = saveOrder(data.order);
    } else if (action === 'uploadPhoto') {
      result = uploadPhoto(data.fileName, data.fileBase64, data.mimeType);
    } else {
      result = { success: false, message: 'Action tidak dikenal: ' + action };
    }

    return buildResponse(result);
  } catch (err) {
    return buildResponse({ success: false, message: err.toString() });
  }
}

function doGet(e) {
  return buildResponse({ status: 'ok', message: 'KantinKu API aktif ✅' });
}

// --------------------------------------------------
// HELPER: BUILD RESPONSE (dengan CORS header)
// --------------------------------------------------

function buildResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// --------------------------------------------------
// GOOGLE SHEETS: Simpan Pesanan
// --------------------------------------------------

function getOrCreateSheet() {
  const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  let spreadsheet;

  if (files.hasNext()) {
    spreadsheet = SpreadsheetApp.open(files.next());
  } else {
    // Buat spreadsheet baru
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    const sheet = spreadsheet.getActiveSheet();
    sheet.setName(SHEET_NAME);

    // Header
    const headers = [
      'ID Pesanan', 'Tanggal & Waktu', 'Nama Pemesan',
      'Email', 'Kelas', 'Kantin', 'Item Pesanan',
      'Total (Rp)', 'Metode Pembayaran', 'Catatan',
      'Status', 'URL Foto Bukti'
    ];
    sheet.appendRow(headers);

    // Format header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange
      .setFontWeight('bold')
      .setBackground('#cc0000')
      .setFontColor('#ffffff')
      .setHorizontalAlignment('center');

    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 160);
    sheet.setColumnWidth(7, 250);
    sheet.setColumnWidth(12, 300);
  }

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function saveOrder(order) {
  const sheet   = getOrCreateSheet();
  const orderId = 'ORD-' + new Date().getTime();
  const now     = Utilities.formatDate(
    new Date(), 'Asia/Jakarta', 'dd/MM/yyyy HH:mm:ss'
  );

  // Format items menjadi string yang mudah dibaca
  const itemsText = order.items.map(function(i) {
    return i.qty + 'x ' + i.name + ' @Rp' + Number(i.price).toLocaleString('id-ID');
  }).join(' | ');

  sheet.appendRow([
    orderId,
    now,
    order.userName  || '-',
    order.userEmail || '-',
    order.userKelas || '-',
    order.kantinName || '-',
    itemsText,
    order.total,
    order.method,
    order.note  || '-',
    'Menunggu Konfirmasi',
    order.photoUrl || '-'
  ]);

  // Warnai baris baru
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 11).setBackground('#fff3cd'); // status = kuning

  return { success: true, orderId: orderId };
}

// --------------------------------------------------
// GOOGLE DRIVE: Upload Foto Bukti
// --------------------------------------------------

function getOrCreateFolder() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

function uploadPhoto(fileName, fileBase64, mimeType) {
  const folder = getOrCreateFolder();

  // Decode base64 → Blob
  const decoded = Utilities.base64Decode(fileBase64);
  const blob    = Utilities.newBlob(decoded, mimeType, fileName);

  // Simpan ke Drive
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const fileId  = file.getId();
  const viewUrl = 'https://drive.google.com/file/d/' + fileId + '/view?usp=sharing';

  return { success: true, url: viewUrl, fileId: fileId };
}
