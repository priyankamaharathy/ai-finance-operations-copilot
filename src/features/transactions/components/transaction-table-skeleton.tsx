import { Card, CardContent } from "@/components/ui/card";

const skeletonRows = Array.from({ length: 5 });

function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className}`}
      aria-hidden="true"
    />
  );
}

export function TransactionTableSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading transactions"
      aria-busy="true"
      className="space-y-3"
    >
      <span className="sr-only">Loading transactions...</span>

      {/* Desktop skeleton */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <div className="flex items-center gap-6 border-b bg-muted/30 px-4 py-3">
            <SkeletonLine className="h-4 w-20" />
            <SkeletonLine className="h-4 w-36" />
            <SkeletonLine className="h-4 w-28" />
            <SkeletonLine className="h-4 w-20" />
            <SkeletonLine className="ml-auto h-4 w-20" />
            <SkeletonLine className="h-4 w-16" />
          </div>

          {skeletonRows.map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-6 border-b px-4 py-5 last:border-0"
            >
              <SkeletonLine className="h-4 w-20 shrink-0" />
              <SkeletonLine className="h-4 w-36" />
              <SkeletonLine className="h-4 w-28" />
              <SkeletonLine className="h-4 w-20" />
              <SkeletonLine className="ml-auto h-4 w-20" />
              <SkeletonLine className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Mobile skeleton */}
      <div className="space-y-2 md:hidden">
        {skeletonRows.slice(0, 4).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-2">
                  <SkeletonLine className="h-4 w-36 max-w-full" />
                  <SkeletonLine className="h-3 w-28 max-w-full" />
                </div>

                <SkeletonLine className="h-4 w-24 shrink-0" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <SkeletonLine className="h-3 w-24" />
                  <SkeletonLine className="h-3 w-16" />
                </div>

                <SkeletonLine className="h-6 w-20 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}