export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Overview
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your financial operations and performance.
        </p>
      </div>

      <section
        aria-labelledby="dashboard-placeholder"
        className="rounded-xl border border-dashed p-12 text-center"
      >
        <h2
          id="dashboard-placeholder"
          className="text-sm font-medium"
        >
          Dashboard coming next
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Financial metrics and analytics will appear here.
        </p>
      </section>
    </div>
  );
}