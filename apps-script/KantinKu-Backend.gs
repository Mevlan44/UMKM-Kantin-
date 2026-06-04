var SPREADSHEET_NAME = 'KantinKu - Data Pesanan';
var DRIVE_FOLDER_NAME = 'KantinKu - Bukti Pembayaran';
var SHEET_NAME = 'Pesanan';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    var result;

    if (action === 'saveOrder') {
      result = saveOrder(data.order);
    } else if (action === 'uploadPhoto') {
      result = uploadPhoto(data.fileName, data.fileBase64, data.mimeType);
    } else {
      result = { success: false, message: 'Action tidak dikenal' };
    }

    return buildResponse(result);
  } catch (err) {
    return buildResponse({ success: false, message: err.toString() });
  }
}

function doGet(e) {
  return buildResponse({ status: 'ok', message: 'KantinKu API aktif' });
}

function buildResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  var files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  var spreadsheet;

  if (files.hasNext()) {
    spreadsheet = SpreadsheetApp.open(files.next());
  } else {
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    var sheet = spreadsheet.getActiveSheet();
    sheet.setName(SHEET_NAME);

    var headers = [
      'ID Pesanan', 'Tanggal dan Waktu', 'Nama Pemesan',
      'Email', 'Kelas', 'Kantin', 'Item Pesanan',
      'Total (Rp)', 'Metode Pembayaran', 'Catatan',
      'Status', 'URL Foto Bukti'
    ];
    sheet.appendRow(headers);

    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold')
               .setBackground('#cc0000')
               .setFontColor('#ffffff')
               .setHorizontalAlignment('center');

    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 160);
    sheet.setColumnWidth(7, 250);
    sheet.setColumnWidth(12, 300);
  }

  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function saveOrder(order) {
  var sheet = getOrCreateSheet();
  var orderId = 'ORD-' + new Date().getTime();
  var now = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy HH:mm:ss');

  var itemsText = order.items.map(function(i) {
    return i.qty + 'x ' + i.name + ' @Rp' + Number(i.price).toLocaleString('id-ID');
  }).join(' | ');

  sheet.appendRow([
    orderId,
    now,
    order.userName || '-',
    order.userEmail || '-',
    order.userKelas || '-',
    order.kantinName || '-',
    itemsText,
    order.total,
    order.method,
    order.note || '-',
    'Menunggu Konfirmasi',
    order.photoUrl || '-'
  ]);

  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 11).setBackground('#fff3cd');

  return { success: true, orderId: orderId };
}

function getOrCreateFolder() {
  var folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

function uploadPhoto(fileName, fileBase64, mimeType) {
  var folder = getOrCreateFolder();
  var decoded = Utilities.base64Decode(fileBase64);
  var blob = Utilities.newBlob(decoded, mimeType, fileName);

  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  var fileId = file.getId();
  var viewUrl = 'https://drive.google.com/file/d/' + fileId + '/view?usp=sharing';

  return { success: true, url: viewUrl, fileId: fileId };
}
