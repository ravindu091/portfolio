import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import ad23PDF from './ad23.pdf'; // Adjust the path based on your folder structure

const PDFTextEditor: React.FC = () => {
  const [editedPdfUrl, setEditedPdfUrl] = useState<string | null>(null);

  const editTextInPDF = async (pdfData: ArrayBuffer) => {
    const pdfDoc = await PDFDocument.load(pdfData);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0]; // Assuming you want to edit text on the first page

    // Coordinates for the line of text to "edit"
    const edits = [
      { x: 40, y: 736, width: 300, height: 15, newText: 'REDACTED LINE 1' },
      { x: 40, y: 688, width: 300, height: 20, newText: 'REDACTED LINE 2' },
      { x: 40, y: 640, width: 300, height: 20, newText: 'REDACTED LINE 2' },
      { x: 40, y: 592, width: 300, height: 20, newText: 'REDACTED LINE 2' },
      { x: 40, y: 510, width: 300, height: 20, newText: 'REDACTED LINE 2' },
      { x: 242, y: 510, width: 300, height: 20, newText: 'REDACTED LINE 2' },
    ];

    // Draw over each line
    edits.forEach((edit) => {
      // Draw a white rectangle over the original text to hide it
      

      // Draw the new text over the hidden area
      firstPage.drawText(edit.newText, {
        x: edit.x,
        y: edit.y + 5, // Adjust y to align with the covered area
        size: 9,
        color: rgb(0, 0, 0), // Black color for new text
      });
    });

    // Save the edited PDF
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setEditedPdfUrl(pdfUrl);
  };

  useEffect(() => {
    // Fetch the PDF file on component mount
    const fetchPDF = async () => {
      const response = await fetch(ad23PDF);
      const pdfData = await response.arrayBuffer();
      editTextInPDF(pdfData);
    };

    fetchPDF();
  }, []);

  return (
    <div>
      {editedPdfUrl ? (
        <a href={editedPdfUrl} target="_blank" rel="noopener noreferrer">
          Download Edited PDF
        </a>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFTextEditor;
