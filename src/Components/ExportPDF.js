"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportPDF({ data, suggestions }) {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Mini Portfolio Tracker", 20, 20);

    // Prepare table
    const headers = ["Asset", "Category", "Qty", "Buy ₹", "Current ₹", "Value ₹", "Gain/Loss ₹"];
    const rows = data.map((a) => {
      const value = a.quantity * a.current;
      const gain = (a.current - a.buy) * a.quantity;
      return [
        a.name,
        a.category,
        a.quantity,
        a.buy,
        a.current,
        value,
        gain >= 0 ? `+${gain}` : gain.toString(),
      ];
    });

    // Add Portfolio Table
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 30,
    });

    // Add Chart Image (from canvas)
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Asset Allocation Chart", 15, 20);
      doc.addImage(imgData, "PNG", 15, 30, 180, 100); // Adjust size if needed
    }

    // Add Suggestions
    if (suggestions && suggestions.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text("AI Suggestions", 15, 20);
      doc.setFontSize(12);
      suggestions.forEach((tip, i) => {
        doc.text(`• ${tip}`, 20, 30 + i * 10);
      });
    }

    doc.save("portfolio.pdf");
  };

  return (
    <div className="text-right">
      <button
        onClick={handleExportPDF}
        className="mb-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        📄 Export PDF
      </button>
    </div>
  );
}
