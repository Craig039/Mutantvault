import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: {
    default: "Mutant Vault | Curated High-Grade X-Men & Marvel Comics",
    template: "%s | Mutant Vault",
  },
  description: "Premium graded X-Men and Marvel comics selected for eye appeal, presentation, and collector value.",
  metadataBase: new URL("https://mutantvault.com"),
  openGraph: {
    title: "Mutant Vault",
    description: "Curated high-grade X-Men & Marvel comics.",
    url: "https://mutantvault.com",
    siteName: "Mutant Vault",
    images: ["/brand/mutant-vault-primary.png"],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
