"use client"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "20px" }}>
        <header style={{ marginBottom: "20px" }}>
          <h1>Next.js CRUD App</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
