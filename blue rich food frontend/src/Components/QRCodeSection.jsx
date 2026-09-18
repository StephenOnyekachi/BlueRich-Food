
import { QRCodeSVG } from "qrcode.react";

function QRCodeSection() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 rounded-3xl bg-slate-950 p-8 text-center text-white sm:p-12 lg:flex-row lg:text-left">
        
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Digital Menu
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Scan. Browse. Pre-order.
          </h2>

          <p className="mt-4 max-w-xl text-slate-300">
            Scan the QR code with your phone camera to view our menu and
            contact us on WhatsApp to pre-order.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5">
          <QRCodeSVG
            value="https://bluerichrestaurant.com/menu"
            size={170}
          />

          <p className="mt-3 text-center text-xs font-semibold text-slate-900">
            SCAN TO VIEW MENU
          </p>
        </div>
      </div>
    </section>
  );
}

export default QRCodeSection;
