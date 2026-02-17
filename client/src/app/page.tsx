import EtherealBeamsHero from "@/components/ui/ethereal-beams-hero";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-black overflow-x-hidden">
            {/* Ethereal Beams Hero with integrated Navbar */}
            <EtherealBeamsHero />

            {/* Features Section */}
            <div id="features" className="bg-black text-white">
                <Features />
            </div>

            {/* Testimonials Section */}
            <div id="testimonials" className="bg-black text-white">
                <Testimonials />
            </div>

            {/* Footer */}
            <div className="bg-black text-white">
                <Footer />
            </div>
        </main>
    );
}
