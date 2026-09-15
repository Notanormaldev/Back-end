
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="grid grid-cols-1 gap-5 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="w-full max-w-sm overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm"
        >
          {/* Image */}
          <Skeleton className="h-72 w-full rounded-none" />

          {/* Content */}
          <div className="p-5">
            {/* Category */}
            <Skeleton className="mb-3 h-4 w-24" />

            {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>

            {/* Description */}
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">
              <Skeleton className="h-6 w-12 rounded-md" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Price + Button */}
            <div className="mt-5 flex items-center justify-between">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-10 w-28 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loading;

