import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Home, Search } from "lucide-react";

function PageNotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16 sm:px-6">
        <div className="w-full max-w-4xl text-center">
          {/* Home Icon */}
          <div className="mb-6 sm:mb-8">
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-2xl
                border
                border-green-500/20
                bg-green-500/10
                shadow-2xl
                shadow-green-500/10
                backdrop-blur-md
                sm:h-24
                sm:w-24
              "
            >
              <Home
                size={40}
                strokeWidth={1.5}
                className="text-green-400 sm:h-12 sm:w-12"
              />
            </div>
          </div>

          {/* 404 */}
          <h1
            className="
              bebas-neue
              text-[100px]
              leading-[0.8]
              font-black
              tracking-wide
              text-transparent
              bg-gradient-to-r
              from-green-400
              via-white
              to-gray-500
              bg-clip-text
              sm:text-[150px]
              md:text-[190px]
            "
          >
            404
          </h1>

          {/* Title */}
          <h2
            className="
              roboto-condensed
              mt-8
              text-4xl
              font-black
              capitalize
              tracking-tight
              sm:text-5xl
              md:text-6xl
            "
          >
            Page not found
          </h2>

          {/* Description */}
          <p
            className="
              playwrite-nz
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-relaxed
              text-gray-400
              sm:text-lg
              md:text-xl
            "
          >
            Sorry, we couldn't find the property or page you're looking for.
            It may have been moved, removed, or the link may be incorrect.
          </p>

          {/* Search-style message */}
          <div
            className="
              mx-auto
              mt-8
              flex
              max-w-xl
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-4
              text-left
              backdrop-blur-md
            "
          >
            <Search
              size={21}
              className="flex-shrink-0 text-green-400"
            />

            <p className="roboto-condensed-light text-sm text-gray-400 sm:text-base">
              Try going back home and searching for a property again.
            </p>
          </div>

          {/* Buttons */}
          <div
            className="
              mt-8
              flex
              flex-col
              items-center
              justify-center
              gap-4
              sm:flex-row
            "
          >
            {/* Back Home */}
            <Link
              to="/"
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-green-400/30
                bg-green-500
                px-7
                py-3
                text-base
                font-semibold
                text-white
                shadow-lg
                shadow-green-500/10
                transition-all
                duration-300
                hover:scale-105
                hover:bg-green-400
                sm:w-auto
                sm:text-lg
              "
            >
              <Home size={19} />
              Back Home
            </Link>

            {/* Properties */}
            <Link
              to="/properties"
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-white/15
                bg-white/5
                px-7
                py-3
                text-base
                font-semibold
                text-white
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-105
                hover:bg-white/10
                sm:w-auto
                sm:text-lg
              "
            >
              <Building2 size={19} />
              View Properties
            </Link>
          </div>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="
              mx-auto
              mt-6
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
              transition
              hover:text-green-400
            "
          >
            <ArrowLeft size={16} />
            Go back to previous page
          </button>

          {/* Bottom Message */}
          <div className="mt-12">
            <div className="mx-auto mb-4 h-px w-16 bg-green-500/30" />

            <p
              className="
                roboto-condensed-light
                text-xs
                tracking-wide
                text-gray-500
                sm:text-sm
              "
            >
              House Agent • Find a home that fits your life.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PageNotFound;
