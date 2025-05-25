import MainLogo from "@/Components/main-logo";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0C1B4C] to-[#03102A]">
      {/* left panel */}
      <div className="w-full md:w-2/5 p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-12">
            <MainLogo />
            <span className="text-white text-4xl font-bold ml-2">
              Printable
            </span>
          </div>

          <h1 className="text-white text-5xl font-bold leading-tight mb-12">
            Increase Your Shop Productivity with Printable
          </h1>

          <div className="space-y-10 text-white/80 text-base leading-relaxed">
            <div>
              <h2 className="text-white text-xl font-semibold mb-3">
                Discover Nearby Photocopy Centers
              </h2>
              <p className="mb-6">
                Easily locate and connect with the nearest printing shops using
                real-time geolocation and Google Maps integration. Simplify your
                printing needs without roaming around the campus.
              </p>
            </div>

            <div>
              <h2 className="text-white text-xl font-semibold mb-3">
                View-Once Messaging
              </h2>
              <p className="mb-6">
                Communicate securely with merchants through view-once messages,
                keeping your private data safe and transient. Perfect for
                sharing temporary print instructions or personal details.
              </p>
            </div>

            <div>
              <h2 className="text-white text-xl font-semibold mb-3">
                Flexible Payment Options
              </h2>
              <p className="mb-6">
                Whether you prefer online payment or Cash on Delivery (COD),
                Printable lets you choose. Make transactions easier for both
                students and merchants.
              </p>
            </div>
          </div>
        </div>

        <div className="text-white/60 text-xs mt-12">
          2025 Printable • All rights reserved
        </div>
      </div>

      {/* right panel */}
      <div className="hidden md:flex md:w-3/5 items-center justify-center p-6">
        <div className="bg-white w-full h-full rounded-[32px] p-12 shadow-2xl flex items-center justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full",
                formButtonPrimary: "w-full",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
