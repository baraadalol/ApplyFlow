"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCompanyForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

const res = await fetch("/api/companies", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name,
    website,
    location,
    tags,
    notes,
  }),
});

if (!res.ok) {
  alert("Could not add company");
  setSaving(false);
  return;
}
    setName("");
    setWebsite("");
    setLocation("");
    setTags("");
    setNotes("");
    setSaving(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "24px",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "16px" }}>Add Company</h2>

      <div style={{ display: "grid", gap: "12px" }}>
        <input
          type="text"
          placeholder="Company name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        />

        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", minHeight: "100px" }}
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            backgroundColor: "#111827",
            color: "white",
            border: "none",
            padding: "12px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {saving ? "Saving..." : "Add company"}
        </button>
      </div>
    </form>
  );
}
