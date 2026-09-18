
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  QrCode as QrCodeIcon,
  Plus,
  Trash2,
  Download,
  Copy,
  Eye,
  X,
  ExternalLink,
} from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminHeader from "./AdminHeader";
import StatCard from "../ManagementComponents/StatCard";
import SideMenu from "./SideMenu";

import { QRCodeSVG } from "qrcode.react";

function QrCode() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [qrCodes, setQrCodes] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [selectedQr, setSelectedQr] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    url: "",
  });

  // Load saved QR codes
  useEffect(() => {
    const savedQrCodes = localStorage.getItem("qrCodes");

    if (savedQrCodes) {
      try {
        setQrCodes(JSON.parse(savedQrCodes));
      } catch (error) {
        console.error("Failed to load QR codes:", error);
        setQrCodes([]);
      }
    }
  }, []);

  // Save QR codes
  useEffect(() => {
    localStorage.setItem("qrCodes", JSON.stringify(qrCodes));
  }, [qrCodes]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Quick page selection
  const handleQuickPage = (name, url) => {
    setFormData({
      name,
      url,
    });
  };

  // Generate QR
  const handleGenerate = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a QR code name.");
      return;
    }

    if (!formData.url.trim()) {
      alert("Please enter a page URL.");
      return;
    }

    const newQrCode = {
      id: Date.now(),
      name: formData.name.trim(),
      url: formData.url.trim(),
      createdAt: new Date().toISOString(),
    };

    setQrCodes((prev) => [newQrCode, ...prev]);

    setFormData({
      name: "",
      url: "",
    });

    setShowForm(false);
  };

  // Delete QR
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this QR code?"
    );

    if (!confirmed) return;

    setQrCodes((prev) =>
      prev.filter((qr) => qr.id !== id)
    );

    if (selectedQr?.id === id) {
      setSelectedQr(null);
    }
  };

  // Copy URL
  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("URL copied successfully!");
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  // Download QR
  const handleDownload = (qr) => {
    const svg = document.getElementById(`qr-${qr.id}`);

    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const blob = new Blob([source], {
      type: "image/svg+xml;charset=utf-8",
    });

    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = downloadUrl;

    link.download = `${qr.name
      .replace(/\s+/g, "-")
      .toLowerCase()}-qr.svg`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <SideMenu
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Admin Navbar */}
        <AdminNavbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <AdminHeader
            title="QR Codes"
            description="Generate and manage QR codes for your restaurant pages."
          />

          {/* Page Action */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={18} />
              Generate QR Code
            </button>
          </div>

          {/* Summary Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Total QR Codes */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <QrCodeIcon size={24} />
                </div>

                <div>
                  <p className="text-sm font-medium text-green-700">
                    Total QR Codes
                  </p>

                  <p className="mt-1 text-2xl font-bold text-green-900">
                    {qrCodes.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Pages */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <ExternalLink size={24} />
                </div>

                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Active Pages
                  </p>

                  <p className="mt-1 text-2xl font-bold text-blue-900">
                    {qrCodes.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Codes Section */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* Section Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-bold text-slate-950">
                  Generated QR Codes
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View, download, copy, or delete your QR codes.
                </p>
              </div>

              <Link
                to="/dashboard"
                className="flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                ← Back to Dashboard
              </Link>
            </div>

            {/* Desktop Table */}
            <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-slate-200 md:block">
              <table className="w-full text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      QR Code
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Page
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      URL
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Created
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {qrCodes.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center"
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                            <QrCodeIcon size={26} />
                          </div>

                          <p className="mt-4 font-semibold text-slate-900">
                            No QR codes yet
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            Generate your first QR code to get started.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    qrCodes.map((qr) => (
                      <tr
                        key={qr.id}
                        className="transition hover:bg-slate-50"
                      >
                        {/* QR */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-white p-1">
                              <QRCodeSVG
                                id={`qr-${qr.id}`}
                                value={qr.url}
                                size={55}
                              />
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                {qr.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                QR Code
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Page */}
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {qr.name}
                          </span>
                        </td>

                        {/* URL */}
                        <td className="max-w-xs px-6 py-4">
                          <p className="truncate text-sm text-slate-500">
                            {qr.url}
                          </p>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(
                            qr.createdAt
                          ).toLocaleDateString()}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedQr(qr)
                              }
                              className="rounded-lg bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200"
                              title="View QR"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleCopy(qr.url)
                              }
                              className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                              title="Copy URL"
                            >
                              <Copy size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDownload(qr)
                              }
                              className="rounded-lg bg-green-50 p-2 text-green-600 transition hover:bg-green-100"
                              title="Download QR"
                            >
                              <Download size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(qr.id)
                              }
                              className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                              title="Delete QR"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="mt-5 space-y-4 md:hidden">
              {qrCodes.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-500">
                    <QrCodeIcon size={26} />
                  </div>

                  <p className="mt-4 font-semibold text-slate-900">
                    No QR codes yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Generate your first QR code to get started.
                  </p>
                </div>
              ) : (
                qrCodes.map((qr) => (
                  <div
                    key={qr.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    {/* QR + Name */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-2">
                        <QRCodeSVG
                          value={qr.url}
                          size={65}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-slate-900">
                          {qr.name}
                        </h3>

                        <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          QR Code
                        </span>

                        <p className="mt-2 break-all text-xs text-slate-500">
                          {qr.url}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <p className="text-xs text-slate-400">
                        Created
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {new Date(
                          qr.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedQr(qr)
                        }
                        className="flex items-center justify-center rounded-xl bg-slate-100 p-3 text-slate-700 hover:bg-slate-200"
                        title="View"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(qr.url)
                        }
                        className="flex items-center justify-center rounded-xl bg-blue-50 p-3 text-blue-600 hover:bg-blue-100"
                        title="Copy"
                      >
                        <Copy size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDownload(qr)
                        }
                        className="flex items-center justify-center rounded-xl bg-green-50 p-3 text-green-600 hover:bg-green-100"
                        title="Download"
                      >
                        <Download size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(qr.id)
                        }
                        className="flex items-center justify-center rounded-xl bg-red-50 p-3 text-red-600 hover:bg-red-100"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Generate QR Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Generate QR Code
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a QR code for any restaurant page.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleGenerate}
              className="space-y-5 p-5"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  QR Code Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Restaurant Menu"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* URL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Page URL
                </label>

                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="/menu"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Enter the page you want customers to open.
                </p>
              </div>

              {/* Quick Pages */}
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Quick Select
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickPage(
                        "Restaurant Menu",
                        "/menu"
                      )
                    }
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Menu
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleQuickPage(
                        "Restaurant Home",
                        "/"
                      )
                    }
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Home
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleQuickPage(
                        "Order Page",
                        "/order"
                      )
                    }
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Order
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleQuickPage(
                        "AI Assistant",
                        "/ai-chat"
                      )
                    }
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    AI Assistant
                  </button>
                </div>
              </div>

              {/* Generate */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <QrCodeIcon size={18} />
                Generate QR Code
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View QR Modal */}
      {selectedQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="font-bold text-slate-900">
                  {selectedQr.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  QR Code Preview
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedQr(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* QR */}
            <div className="p-6 text-center">
              <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <QRCodeSVG
                  value={selectedQr.url}
                  size={240}
                  level="H"
                  includeMargin
                />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                {selectedQr.name}
              </h3>

              <p className="mt-2 break-all text-sm text-slate-500">
                {selectedQr.url}
              </p>

              {/* Modal Actions */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(selectedQr.url)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Copy size={17} />
                  Copy URL
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDownload(selectedQr)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Download size={17} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QrCode;
