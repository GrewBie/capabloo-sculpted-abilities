import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoVisionSection from "@/components/VideoVisionSection";
import ProductShowcase from "@/components/ProductShowcase";
import AchievementsSection from "@/components/AchievementsSection";
import CertificationsMarquee from "@/components/CertificationsMarquee";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Capabloo — Rebuilding Abilities" },
      {
        name: "description",
        content:
          "Custom 3D-printed prosthetic solutions designed for your exact anatomy. Maximum comfort, precision engineering, and a new standard in mobility.",
      },
      { property: "og:title", content: "Capabloo — Rebuilding Abilities" },
      {
        property: "og:description",
        content:
          "Custom 3D-printed prosthetic solutions designed for your exact anatomy.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="bg-background">
      <Navbar />
      <HeroSection />
      <VideoVisionSection />
      <ProductShowcase />
      <AchievementsSection />
      <CertificationsMarquee />
      <Footer />
    </div>
  );
}
