import Link from "next/link";

export const dynamic = "force-dynamic";

async function getData() {
  const res = await fetch("http://localhost:3000/api/companies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return res.json();
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "No follow-up date";

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getBucket(dateStr: string | null) {
  if (!dateStr) return "none";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);

  const diff = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diff < 0) return "overdue";
  if (diff === 0) return "today";
  if (diff <= 7) return "next";
  return "later";
}

function formatStatus(status: string) {
  return status ? status.replaceAll("_", " ") : "No status";
}

export default async function DashboardPage() {
  const data = await getData();

  const overdue = data.filter((c: any) => getBucket(c.next_followup_at) === "overdue");
  const today = data.filter((c: any) => getBucket(c.next_followup_at) === "today");
  const next = data.filter((c: any) => getBucket(c.next_followup_at) === "next");
  const later = data.filter((c: any) => getBucket(c.next_followup_at) === "later");  

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <nav style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
          <Link href="/" style={{ textDecoration: "none", color: "#111827", fontWeight: 800 }}>
            ApplyFlow
          </Link>

          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/companies" style={{ color: "#374151", textDecoration: "none" }}>
              Companies
            </Link>
          </div>
        </nav>

        <h1 style={{ fontSize: "44px", marginBottom: "8px", color: "#111827" }}>
          Dashboard
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "28px", fontSize: "18px" }}>
          Follow-ups grouped by when you need to act.
        </p>

        <div style={{ display: "grid", gap: "20px" }}>
          <Section title="Overdue" items={overdue} />
          <Section title="Today" items={today} />
          <Section title="Next 7 days" items={next} />
          <Section title="Later" items={later} />
        </div>
      </section>
    </main>
  );
}

function Section({ title, items }: { title: string; items: any[] }) {
  return (
    <section
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "18px" }}>
        <h2 style={{ margin: 0, color: "#111827" }}>{title}</h2>

        <span
          style={{
            background: "#eef2ff",
            color: "#3730a3",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {items.length === 0 ? (
        <p style={{ color: "#6b7280", margin: 0 }}>Nothing planned here.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {items.map((c) => (
            <details
              key={c.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                padding: "16px",
                background: "#f9fafb",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                {c.name} — {formatDate(c.next_followup_at)}
              </summary>

              <div style={{ marginTop: "14px", color: "#4b5563", display: "grid", gap: "8px" }}>
                <p><strong>Status:</strong> {formatStatus(c.status)}</p>
                <p><strong>Priority:</strong> {c.priority ?? "-"}</p>
                <p><strong>Contact person:</strong> {c.contact_person || "Not added"}</p>
                <p><strong>Contact channel:</strong> {c.contact_channel || "Not added"}</p>
                <p><strong>Notes:</strong> {c.notes || "No notes"}</p>

                <Link
                  href={`/companies/${c.id}`}
                  style={{
                    marginTop: "8px",
                    color: "#3730a3",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Open company details
                </Link>
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
