import * as XLSX from "xlsx";
import FileSaver from "file-saver";

export const exportExcel = (data: any, fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wscols = [{ wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 50 }];
  const sheet = XLSX.utils.json_to_sheet(data);
  ws["!freeze"] = {
    xSplit: 0,
    ySplit: 1,
  };
  sheet["!cols"] = wscols;
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  function s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  FileSaver.saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `${fileName}.xlsx`);
};
