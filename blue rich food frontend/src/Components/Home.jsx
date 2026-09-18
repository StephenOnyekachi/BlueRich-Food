
import { Link, useLocation } from "react-router-dom";

import Navbar from "../Components/Navbar";
import LocationMap from "../Components/LocationMap";
import QRCodeSection from "../Components/QRCodeSection";
import AIAssistant from "../Components/AIAssistant";

function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* <Navbar /> */}

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">

        <img
          src="/images/h1.jpg"
          alt="Beautiful house"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            brightness-[0.45]
          "
        />

        <div className="absolute inset-0 bg-slate-950/90"></div>

        {/* <div className="relative z-10 min-h-screen"> */}
        <div className="relative z-10 mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">

          {/* Hero content */}
          <div className="max-w-2xl text-white px-4">
            <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              Fresh • Delicious • Made With Love
            </span>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Good food,
              <span className="block text-blue-400">
                good moments.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Enjoy freshly prepared meals, delicious pastries and refreshing
              drinks made with quality ingredients and served with care.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {/* <a
                href="/menu"
                className="rounded-xl bg-blue-500 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-blue-600"
              >
                View Our Menu
              </a> */}
              <Link to="/menu"
                className="rounded-xl bg-blue-500 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-blue-600"
              >
                View Our Menu
              </Link>

              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-center font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Pre-order on WhatsApp
              </a>
            </div>

            {/* Quick information */}
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <p className="text-sm text-slate-400">Opening</p>
                <p className="mt-1 font-semibold">8AM – 10PM</p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Location</p>
                <p className="mt-1 font-semibold">Akwa Ibom</p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Order</p>
                <p className="mt-1 font-semibold">WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <img
                src="/images/h1.jpg"
                alt="Restaurant food"
                className="h-[520px] w-full object-cover sm:h-[600px]"
              />
            </div>

            {/* Floating card */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/60 p-5 text-white backdrop-blur-xl sm:left-auto sm:w-72">
              <p className="text-sm text-slate-300">
                Today's recommendation
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Chef's Special
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                Freshly prepared and ready to enjoy.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
            About Us
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Food made for memorable moments
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-600">
            We believe great food should be fresh, delicious and enjoyable.
            Whether you're stopping by for a quick meal or ordering something
            special, we're here to serve you.
          </p>
        </div>
      </section>

      {/* LOCATION */}
      <section className="bg-slate-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
              Find Us
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Visit our restaurant
            </h2>

            <p className="mt-4 max-w-2xl text-slate-600">
              Come visit us and enjoy freshly prepared meals in a welcoming
              environment.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-[0.8fr_1.5fr]">
            
            {/* Address */}
            <div className="p-8 sm:p-10">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Address
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  Restaurant Address Here
                </p>
              </div>

              <div className="mt-8">
                <p className="text-sm font-medium text-slate-500">
                  Opening Hours
                </p>

                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between gap-4">
                    <span>Monday – Friday</span>
                    <span className="font-medium">8AM – 10PM</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Saturday</span>
                    <span className="font-medium">8AM – 11PM</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Sunday</span>
                    <span className="font-medium">10AM – 9PM</span>
                  </div>
                </div>
              </div>

              <a
                href="tel:+2348000000000"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                Call Restaurant
              </a>
            </div>

            {/* Map */}
            <div className="min-h-[400px]">
              <LocationMap />
            </div>
          </div>
        </div>
      </section>

      {/* QR CODE */}
      <QRCodeSection />

      {/* AI ASSISTANT */}
      <AIAssistant className="z-10" />
    </div>
  );
}

export default Home;
