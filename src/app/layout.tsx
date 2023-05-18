"use client";

import "./globals.css";
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@/app/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>notes-app</title>
        </head>
        <body>{children}</body>
      </html>
    </Provider>
  );
}
