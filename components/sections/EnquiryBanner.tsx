import { QuoteForm } from "@/components/forms/QuoteForm";

export function EnquiryBanner() {
  return (
    <section className="bg-primary/5 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold text-darktext">
            Get a free treatment quote
          </h2>
          <p className="mt-3 max-w-md text-muted">
            Share your medical reports or treatment needs, and our care coordinators
            will get back to you within 24 hours with a personalised quote.
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
