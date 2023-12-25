import "../styles/app.scss";
import Header from "./header";
import { ContextProvider } from "../Components/Clients";

export const metadata = {
  title: "Todo App",
  description: "Developed by Ritik Raushan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
