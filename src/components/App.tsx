import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// https://raw.githubusercontent.com/wojtekmaj/react-pdf/master/sample/webpack/sample.pdf

const App: React.FC = () => {
  const [allPages, setAllPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
  };

  return (
    <div className="App">
      {`Wszystkich stron:${currentPage}/${allPages}`}
      <Document
        className="blackback"
        onLoadSuccess={(e: any) => {
          setAllPages(e?._pdfInfo?.numPages);
        }}
        file="/a_pdf.pdf"
        options={options}
      >
        <Page key={`page_${currentPage}`} pageNumber={currentPage} />
      </Document>

      <nav>
        <button
          onClick={() => {
            setCurrentPage((prevState) => prevState - 1);
          }}
        >
          prev
        </button>
        <button
          onClick={() => {
            setCurrentPage((prevState) => prevState + 1);
          }}
        >
          next
        </button>
      </nav>
    </div>
  );
};

export default App;
