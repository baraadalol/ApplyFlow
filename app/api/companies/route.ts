import { NextResponse } from "next/server";
import {
  getAllCompanies,
  createCompany,
  createApplication,
  deleteCompany,
} from "../../../lib/queries";

export async function GET() {
  const companies = getAllCompanies();
  return NextResponse.json(companies);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name || body.name.trim() === "") {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 });
  }

  const safeName = body.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9åäö]+/g, "_")
    .replace(/^_+|_+$/g, "");

  const uniqueSuffix = Date.now();

  const id = `c_${safeName}_${uniqueSuffix}`;
  const applicationId = `a_${safeName}_${uniqueSuffix}`;

  createCompany({
    id,
    name: body.name.trim(),
    website: body.website,
    location: body.location,
    tags: body.tags,
    notes: body.notes,
  });

  createApplication({
    id: applicationId,
    company_id: id,
    status: "not_contacted",
  });

  return NextResponse.json({ ok: true, id });
}

export async function DELETE(req: Request) {
  const body = await req.json();

  if (!body.id) {
    return NextResponse.json({ error: "Missing company id" }, { status: 400 });
  }

  deleteCompany(body.id);

  return NextResponse.json({ ok: true });
}
