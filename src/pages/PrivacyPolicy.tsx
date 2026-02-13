import TopBar from "@/components/TopBar";
import MobileNav from "@/components/MobileNav";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <TopBar />

      <div className="px-5 pt-4 pb-2">
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-3">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 className="font-display text-2xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-xs text-muted-foreground mt-1">Last updated: February 2026</p>
      </div>

      <div className="px-5 py-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">Information We Collect</h2>
          <p>When you use SEVVA Restaurant's app, we may collect your name, phone number, email address, and delivery address solely to process your bookings, orders, and provide our services.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">How We Use Your Information</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>Process table reservations and food orders</li>
            <li>Communicate order status and delivery updates</li>
            <li>Improve our menu and services</li>
            <li>Send promotional offers (with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">Data Sharing</h2>
          <p>We do not sell or share your personal information with third parties except delivery partners required to fulfill your orders.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">Data Security</h2>
          <p>We use industry-standard security measures to protect your data. All communication is encrypted and your payment details are never stored on our servers.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at +92 315 177 3177 or via WhatsApp.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">Contact Us</h2>
          <p>
            SEVVA Restaurant, Adda Plot Roundabout, Raiwind Road, Lahore, Punjab 54790.
            <br />
            Phone/WhatsApp: <a href="tel:+923151773177" className="text-primary hover:underline">+92 315 177 3177</a>
          </p>
        </section>
      </div>

      <MobileNav />
    </div>
  );
};

export default PrivacyPolicy;
