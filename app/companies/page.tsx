import Link from "next/link";
import StatusSelect from "./status-select";
import AddCompanyForm from "./add-company-form";
import DatePicker from "./date-picker";
import DeleteCompanyButton from "./delete-company-button";
import PrioritySelect from "./priority-select";

export const dynamic = "force-dynamic";

async function getCompanies() {
  const res = await fetch("http://localhost:3000/api/companies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch companies");
  }

  return res.json();
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Not set";

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status: string | null) {
  return status ? status.replaceAll("_", " ") : "No status";
}

function tagList(tags: string | null) {
  if (!tags) return [];

  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export default async function CompaniesPage() {
  const companies = await getCompanies();

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
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#111827",
              fontWeight: 800,
            }}
          >
            ApplyFlow
          </Link>

          <div style={{ display: "flex", gap: "16px" }}>
            <Link
              href="/dashboard"
              style={{ color: "#374151", textDecoration: "none" }}
            >
              Dashboard
            </Link>
          </div>
        </nav>

        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "44px",
              margin: "0 0 8px",
              color: "#111827",
            }}
          >
            Companies
          </h1>

          <p style={{ color: "#6b7280", fontSize: "18px", margin: 0 }}>
            Add companies, track applications and keep your LIA search organized.
          </p>
        </div>

        <AddCompanyForm />

        <div style={{ marginTop: "28px", display: "grid", gap: "16px" }}>
          {companies.length === 0 ? (
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "18px",
                padding: "28px",
                color: "#6b7280",
              }}
            >
              No companies added yet.
            </div>
          ) : (
            companies.map((c: any) => {
              const tags = tagList(c.tags);

              return (
                <article
                  key={c.id}
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "20px",
                    padding: "28px",
                    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "16px",
                      alignItems: "flex-start",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          marginTop: 0,
                          marginBottom: "8px",
                          fontSize: "32px",
                          color: "#111827",
                        }}
                      >
                        <Link
                          href={`/companies/${c.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {c.name}
                        </Link>
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          marginBottom: "18px",
                          color: "#6b7280",
                        }}
                      >
                        {c.location && <span>{c.location}</span>}
                        {c.website && <span>• {c.website}</span>}
                      </div>
                    </div>

                    <span
                      style={{
                        background: "#eef2ff",
                        color: "#3730a3",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontSize: "14px",
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {formatStatus(c.status)}
                    </span>
                  </div>

                  {tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginBottom: "18px",
                      }}
                    >
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: "#f3f4f6",
                            color: "#374151",
                            padding: "5px 10px",
                            borderRadius: "999px",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "12px",
                      marginBottom: "16px",
                      color: "#4b5563",
                    }}
                  >
                    <p>
                      <strong>Priority:</strong> {c.priority ?? "-"}
                    </p>

                    <p>
                      <strong>Next follow-up:</strong>{" "}
                      {formatDate(c.next_followup_at)}
                    </p>

                    <p>
                      <strong>Contact:</strong>{" "}
                      {c.contact_person || "Not added"}
                    </p>
                  </div>

                  <div
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "14px",
                      padding: "14px",
                      marginBottom: "16px",
                      color: "#4b5563",
                    }}
                  >
                    <strong>Notes:</strong>
                    <p style={{ margin: "6px 0 0" }}>
                      {c.notes || "No notes added."}
                    </p>
                  </div>

                  {c.application_id ? (
                    <div
                      style={{
                        display: "grid",
                        gap: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      <StatusSelect
                        applicationId={c.application_id}
                        currentStatus={c.status}
                      />

                      <DatePicker
                        applicationId={c.application_id}
                        currentDate={c.next_followup_at}
                      />

                      <PrioritySelect
                        applicationId={c.application_id}
                        currentPriority={c.priority}
                      />
                    </div>
                  ) : (
                    <p>No application yet.</p>
                  )}

                  <DeleteCompanyButton companyId={c.id} companyName={c.name} />
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
