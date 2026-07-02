import { prisma } from "@/lib/db";
import { Price } from "@/components/ui/Price";

function formatUsdEquivalent(inr: number) {
  return Math.round(inr / 83);
}

export async function TreatmentCosts() {
  const treatments = await prisma.treatment.findMany({ take: 5 });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-semibold text-darktext">
        Treatment Cost Comparison
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
        See how much you can save by choosing Kerala for your treatment.
      </p>

      <div className="mt-10 overflow-x-auto rounded-card bg-white shadow-soft">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-primary/5 text-darktext">
            <tr>
              <th className="px-5 py-3 font-semibold">Treatment</th>
              <th className="px-5 py-3 font-semibold">Kerala Cost</th>
              <th className="px-5 py-3 font-semibold">USA Cost</th>
              <th className="px-5 py-3 font-semibold">UK Cost</th>
              <th className="px-5 py-3 font-semibold">Savings</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((t) => {
              const keralaUsd = formatUsdEquivalent(t.costIndia);
              const savings = t.costUSA
                ? Math.round(((t.costUSA - keralaUsd) / t.costUSA) * 100)
                : null;
              return (
                <tr key={t.id} className="border-t border-offwhite">
                  <td className="px-5 py-3 font-medium text-darktext">{t.name}</td>
                  <td className="px-5 py-3 text-muted"><Price amountInINR={t.costIndia} /></td>
                  <td className="px-5 py-3 text-muted">{t.costUSA ? `$${t.costUSA.toLocaleString()}` : "-"}</td>
                  <td className="px-5 py-3 text-muted">{t.costUK ? `£${t.costUK.toLocaleString()}` : "-"}</td>
                  <td className="px-5 py-3 font-semibold text-primary">
                    {savings !== null ? `${savings}%` : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
