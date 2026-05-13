import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
        padding: "48px 24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gap: "32px",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, color: "#111827" }}>ApplyFlow</h2>

          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/dashboard" style={{ color: "#374151", textDecoration: "none" }}>
              Dashboard
            </Link>
            <Link href="/companies" style={{ color: "#374151", textDecoration: "none" }}>
              Companies
            </Link>
          </div>
        </nav>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "56px",
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.10)",
            border: "1px solid #e5e7eb",
          }}
        >
          <p
            style={{
              color: "#4f46e5",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            LIA Application Tracker
          </p>

          <h1
            style={{
              fontSize: "56px",
              lineHeight: "1.05",
              margin: "0 0 20px",
              color: "#111827",
              maxWidth: "760px",
            }}
          >
            Keep track of companies, applications and follow-ups.
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.6",
              color: "#4b5563",
              maxWidth: "680px",
              marginBottom: "32px",
            }}
          >
           ApplyFlow helps students organize LIA applications, contact history,
           priorities and next follow-up dates in one simple place.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link
              href="/companies"
              style={{
                backgroundColor: "#111827",
                color: "white",
                padding: "14px 22px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Manage companies
            </Link>

            <Link
              href="/dashboard"
              style={{
                backgroundColor: "#eef2ff",
                color: "#3730a3",
                padding: "14px 22px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              View dashboard
            </Link>
          </div>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            ["Track companies", "Save companies, websites, locations and notes."],
            ["Follow up", "See when you should contact a company again."],
            ["Made for LIA search", "Created to make internship applications easier to follow."],
          ].map(([title, text]) => (
            <div
              key={title}
              style={{
                backgroundColor: "white",
                borderRadius: "18px",
                padding: "24px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 8px 20px rgba(15, 23, 42, 0.06)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#111827" }}>{title}</h3>
              <p style={{ color: "#6b7280", lineHeight: "1.5" }}>{text}</p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
