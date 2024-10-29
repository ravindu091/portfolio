import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PDFFormEditor: React.FC = () => {
  const [editedPdfUrl, setEditedPdfUrl] = useState<string | null>(null);

  const editFormFieldsInPDF = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Get the form in the PDF document
    const form = pdfDoc.getForm();

    // Specify the fields to redact
    const fieldsToRedact = [
      'Name with Initials (uq,l=re iuÕ ku / KjnyOj;JfSld; ngah;):'       // Field for the phone number
    ];

    fieldsToRedact.forEach((fieldName) => {
      const field = form.getTextField(fieldName);
      field.setText('REDACTED');
    });

    // Save the edited PDF
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setEditedPdfUrl(pdfUrl);
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) editFormFieldsInPDF(file);
        }}
      />
      {editedPdfUrl && (
        <div>
          <a href={editedPdfUrl} target="_blank" rel="noopener noreferrer">
            Download Edited PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PDFFormEditor;
