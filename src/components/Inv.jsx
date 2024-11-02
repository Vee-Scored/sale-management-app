import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = ({ data }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSaveAsPDF = async () => {
    const canvas = await html2canvas(componentRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "pt", "a5");
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save(`${data.voucher_id}.pdf`);
  };

  return (
    <div
      className="p-6 max-w-md mx-auto"
      ref={componentRef}
      style={{ width: "148mm", height: "210mm" }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Invoice #{data.voucher_id}
      </h2>
      <div className="mb-4">
        <p>
          <span className="font-semibold">Customer Name:</span>{" "}
          {data.customer_name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {data.customer_email}
        </p>
        <p>
          <span className="font-semibold">Sale Date:</span> {data.sale_date}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Items</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2 text-left">Product</th>
              <th className="border p-2 text-left">Quantity</th>
              <th className="border p-2 text-left">Cost</th>
              <th className="border p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td className="border p-2">{data.product.name}</td>
              <td className="border p-2">{data.quantity}</td>
              <td className="border p-2">${data.cost}</td>
              <td className="border p-2">
                ${(data.quantity * parseFloat(data.cost)).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <p>
          <span className="font-semibold">Net Total:</span> ${data.net_total}
        </p>
        <p>
          <span className="font-semibold">Tax:</span> ${data.tax}
        </p>
        <p>
          <span className="font-semibold">Total:</span> ${data.total}
        </p>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Print
        </button>
        <button
          onClick={handleSaveAsPDF}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
