const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_BYTES = 10 * 1024 * 1024;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function asString(value: FormDataEntryValue | null, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 255;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return json(500, { error: "Submission is temporarily unavailable." });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json(400, { error: "Invalid form data." });
  }

  const firstName = asString(form.get("firstName"), 80);
  const lastName = asString(form.get("lastName"), 80);
  const email = asString(form.get("email"), 255).toLowerCase();
  const contact = asString(form.get("contact"), 150);
  const location = asString(form.get("location"), 150);
  const social = asString(form.get("social"), 255);
  const experienceRaw = asString(form.get("experience"), 8);
  const jobId = asString(form.get("jobId"), 120);
  const jobTitle = asString(form.get("jobTitle"), 200);
  const idempotencyKey = asString(form.get("idempotencyKey"), 80);
  const resume = form.get("resume");

  if (!firstName || !lastName || !isEmail(email) || contact.length < 3 || location.length < 2 || social.length < 4) {
    return json(400, { error: "Please check the form and try again." });
  }
  if (!jobId || !jobTitle) {
    return json(400, { error: "Please check the form and try again." });
  }

  const years = Number(experienceRaw);
  if (!Number.isInteger(years) || years < 0 || years > 60) {
    return json(400, { error: "Please check the form and try again." });
  }

  if (!(resume instanceof File) || resume.size === 0) {
    return json(400, { error: "Please upload your resume." });
  }
  if (resume.size > MAX_BYTES) {
    return json(400, { error: "Resume must be under 10MB." });
  }
  const type = resume.type || "";
  const name = resume.name.toLowerCase();
  const extOk = name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx");
  if (!ALLOWED_TYPES.has(type) && !extOk) {
    return json(400, { error: "Resume must be a PDF, DOC, or DOCX file." });
  }

  const { createClient } = await import("npm:@supabase/supabase-js@2");
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (idempotencyKey) {
    const { data: existing } = await admin
      .from("applications")
      .select("id")
      .eq("idempotency_key", idempotencyKey)
      .maybeSingle();
    if (existing?.id) {
      return json(200, { ok: true, duplicate: true });
    }
  }

  const windowStart = new Date(Date.now() - 60_000).toISOString();
  const { data: recent } = await admin
    .from("applications")
    .select("id")
    .eq("email", email)
    .eq("position_slug", jobId)
    .gte("created_at", windowStart)
    .limit(1);
  if (recent && recent.length > 0) {
    return json(200, { ok: true, duplicate: true });
  }

  const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  const path = `${jobId}/${crypto.randomUUID()}-${safeName}`;

  const bytes = new Uint8Array(await resume.arrayBuffer());
  const { error: uploadError } = await admin.storage.from("resumes").upload(path, bytes, {
    contentType: type || "application/octet-stream",
    upsert: false,
  });
  if (uploadError) {
    return json(500, { error: "Could not store your resume. Please try again." });
  }

  const { error: insertError } = await admin.from("applications").insert({
    first_name: firstName,
    last_name: lastName,
    full_name: `${firstName} ${lastName}`.trim(),
    email,
    linkedin_url: social,
    phone: null,
    contact_channel: contact,
    location,
    position_applied_for: jobTitle,
    position_slug: jobId,
    portfolio_url: null,
    resume_storage_path: path,
    years_of_experience: years,
    status: "new",
    idempotency_key: idempotencyKey || null,
  });

  if (insertError) {
    await admin.storage.from("resumes").remove([path]);
    if (insertError.code === "23505") {
      return json(200, { ok: true, duplicate: true });
    }
    return json(500, { error: "Could not submit your application. Please try again." });
  }

  return json(200, { ok: true });
});
