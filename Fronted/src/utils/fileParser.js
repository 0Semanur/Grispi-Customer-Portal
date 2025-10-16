import * as XLSX from 'xlsx';

export const parseFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        let allData = [];
        let headerRow = [];
        
        if (file.name.endsWith('.csv')) {
          // CSV parsing
          const text = data;
          const lines = text.split('\n').filter(line => line.trim());
          
          if (lines.length > 0) {
            // Get header row (first line)
            const firstLine = lines[0];
            headerRow = firstLine.split(',').map(val => val.trim().replace(/"/g, ''));
            
            // Get all data lines
            allData = lines.map((line, index) => {
              const values = line.split(',').map(val => val.trim().replace(/"/g, ''));
              const rowData = { key: index + 1 };
              
              values.forEach((value, colIndex) => {
                rowData[`col_${colIndex}`] = value;
              });
              
              return rowData;
            });
          }
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          // Excel parsing
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (jsonData.length > 0) {
            // Get header row (first row)
            headerRow = jsonData[0].map(val => val || '');
            
            // Get all data rows
            allData = jsonData.map((row, index) => {
              const rowData = { key: index + 1 };
              
              row.forEach((value, colIndex) => {
                rowData[`col_${colIndex}`] = value || '';
              });
              
              return rowData;
            });
          }
        }
        
        // Generate preview data (first 6 rows for display)
        const previewData = allData.slice(0, Math.min(6, allData.length));
        
        // Generate columns using header row names
        const columns = [];
        if (allData.length > 0) {
          const firstRow = allData[0];
          Object.keys(firstRow).forEach((key, index) => {
            if (key !== 'key') {
              // Use header row value as column title, fallback to generic name
              const columnTitle = headerRow[index] || `Kolon ${index + 1}`;
              columns.push({
                title: columnTitle,
                dataIndex: key,
                key: key,
                width: 150,
                ellipsis: true
              });
            }
          });
        }
        
        resolve({
          data: previewData, // First 6 rows for preview
          allData: allData, // All data for processing
          columns: columns,
          headerRow: headerRow,
          totalRows: allData.length
        });
        
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Dosya okuma hatası'));
    };
    
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  });
};