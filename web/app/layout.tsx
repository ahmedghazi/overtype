import "./styles/index.scss";
import "./global.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import website from "./config/website";
import { PageContextProvider } from "./context/PageContext";
import { getSettings } from "./sanity-api/sanity-queries";
import { LocaleContextProvider } from "./context/LocaleContext";
import { PaddleProvider } from "./components/shop/Paddle/PaddleProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { ShopWrapper } from "./components/shop/ShopContext";
import { ToastContainer } from "react-toastify";
import CookieConsent from "./components/ui/CookieConsent";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  metadataBase: new URL(website.url),
  title: {
    template: `%s — ${website.title}`,
  },
  description: website.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const { isEnabled } = await draftMode();
  return (
    <html lang='en'>
      <body className='is-loading' data-theme='theme-overtype'>
        <div id='page'>
          <LocaleContextProvider>
            <PageContextProvider settings={settings}>
              <ThemeProvider>
                <ShopWrapper licenses={settings.licenses}>
                  <PaddleProvider>
                    <Header settings={settings} />
                    <main>{children}</main>

                    <Footer settings={settings} />
                    <CookieConsent msg={settings.messagemCookie || []} />
                    <ToastContainer
                      autoClose={3000}
                      position='top-right'
                      hideProgressBar={true}
                      newestOnTop={false}
                      closeOnClick={false}
                      // rtl={false}
                      // pauseOnFocusLoss
                      // draggable
                      pauseOnHover
                      // theme='colored'
                    />
                    <div className='grid-sample px-md'>
                      <div className='grid grid--2 md:grid-cols-2 gap-md'>
                        <div className='item'></div>
                      </div>
                    </div>
                    {isEnabled && (
                      <VisualEditing
                        zIndex={1000} // Optional
                      />
                    )}
                  </PaddleProvider>
                </ShopWrapper>
              </ThemeProvider>
            </PageContextProvider>
          </LocaleContextProvider>
        </div>
      </body>
      <GoogleAnalytics gaId='G-PB2Y9GBKE3' />
    </html>
  );
}
