import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import 'pdfjs-dist/legacy/build/pdf.worker.entry';

type PDFDocumentProxy = pdfjsLib.PDFDocumentProxy;
type PDFPageProxy = pdfjsLib.PDFPageProxy;

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.js',
  import.meta.url
).toString();

const PDFTextExtractor: React.FC = () => {
  const [text, setText] = useState<string>('');
    useEffect(()=>{
        const dList:any = text.split('  ');
        console.log(dList);
    },[text])
  // Function to handle PDF text extraction
  const extractTextFromPDF = async (file: File) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      const pdfData = new Uint8Array(fileReader.result as ArrayBuffer);

      // Load the PDF document
      const pdf: PDFDocumentProxy = await pdfjsLib.getDocument(pdfData).promise;

      // Extract text from each page
      let fullText = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page: PDFPageProxy = await pdf.getPage(pageNum);
        const content = await page.getTextContent();

        // Concatenate the text items from the page
        const pageText = content.items.map((item: any) => item.str).join(' ');
        fullText += `Page ${pageNum}: ${pageText}\n`;
      }
      setText(fullText);
    };

    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) extractTextFromPDF(file);
        }}
      />
      <textarea rows={20} value={text} readOnly style={{ width: '100%' }} />
    </div>
  );
};

export default PDFTextExtractor;
