"use client";

import { useId, useState } from "react";

import { AREAS_OF_INTEREST, SITE } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

type Errors = Partial<Record<"name" | "company" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function InquiryForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const values = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      area: String(data.get("area") ?? ""),
      message: String(data.get("message") ?? "").trim(),
      // Bots fill hidden fields; humans do not.
      website: String(data.get("website") ?? ""),
    };

    const nextErrors: Errors = {};
    if (!values.name) nextErrors.name = "Please enter your name.";
    if (!values.company) nextErrors.company = "Please enter your company.";
    if (!values.email) nextErrors.email = "Please enter your business email.";
    else if (!EMAIL_RE.test(values.email))
      nextErrors.email = "Please enter a valid email address.";
    if (!values.message) nextErrors.message = "Please tell us what you need.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Query by name, not by aria-invalid: React has not re-rendered yet, so
      // the invalid attributes are not in the DOM at this point.
      const order = ["name", "company", "email", "message"] as const;
      const firstInvalid = order.find((key) => nextErrors[key]);
      if (firstInvalid) {
        form
          .querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
          ?.focus();
      }
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.status === 503) {
        setStatus("unconfigured");
        return;
      }
      if (!response.ok) throw new Error(String(response.status));

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-copper/40 bg-copper/5 p-8 lg:p-10"
      >
        <p className="type-eyebrow text-copper">Received</p>
        <h3 className="mt-5 type-h3 text-chalk">Thank you — your inquiry is with us.</h3>
        <p className="mt-4 measure type-body text-mist">
          A member of the team will respond to your enquiry directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 type-index text-stone underline underline-offset-4 transition-colors duration-300 hover:text-copper"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          name="name"
          label="Name"
          autoComplete="name"
          error={errors.name}
        />
        <Field
          id={`${id}-company`}
          name="company"
          label="Company"
          autoComplete="organization"
          error={errors.company}
        />
      </div>

      <Field
        id={`${id}-email`}
        name="email"
        type="email"
        label="Business Email"
        autoComplete="email"
        error={errors.email}
      />

      {/* Area of interest */}
      <div>
        <label
          htmlFor={`${id}-area`}
          className="block type-eyebrow text-stone"
        >
          Area of Interest
        </label>
        <div className="relative">
          <select
            id={`${id}-area`}
            name="area"
            defaultValue=""
            className="w-full appearance-none border-b border-hairline bg-transparent py-4 pr-8 text-[1.0625rem] text-chalk transition-colors duration-300 focus:border-copper focus:outline-none"
          >
            {/* Neutral default so submissions are not skewed toward whichever
                discipline happens to be listed first. */}
            <option value="" className="bg-ink text-chalk">
              Select an area
            </option>
            {AREAS_OF_INTEREST.map((area) => (
              <option key={area} value={area} className="bg-ink text-chalk">
                {area}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-stone"
          >
            <path
              d="M1 1.5 6 6.5l5-5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor={`${id}-message`}
          className="block type-eyebrow text-stone"
        >
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={`w-full resize-y border-b bg-transparent py-4 text-[1.0625rem] leading-relaxed text-chalk transition-colors duration-300 placeholder:text-stone focus:outline-none ${
            errors.message
              ? "border-red-400 focus:border-red-400"
              : "border-hairline focus:border-copper"
          }`}
          placeholder="Material, volume, tenor and destination."
        />
        {errors.message ? (
          <p id={`${id}-message-error`} className="mt-3 type-index text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — visually and programmatically hidden from people. */}
      <div aria-hidden className="hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:gap-8">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-3 border border-copper bg-copper px-8 py-4.5 type-eyebrow text-ink transition-colors duration-400 hover:bg-copper-lift hover:border-copper-lift disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Start an Inquiry"}
          <svg
            aria-hidden
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          >
            <path
              d="M0 4h12M9 1l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
        </button>

        {(status === "error" || status === "unconfigured") && (
          <p role="alert" className="measure type-body text-mist">
            {status === "unconfigured"
              ? "The inquiry form is not yet connected. Please email us directly at "
              : "Something went wrong sending your inquiry. Please email us directly at "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-copper underline underline-offset-4"
            >
              {SITE.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block type-eyebrow text-stone">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full border-b bg-transparent py-4 text-[1.0625rem] text-chalk transition-colors duration-300 focus:outline-none ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-hairline focus:border-copper"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-3 type-index text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
