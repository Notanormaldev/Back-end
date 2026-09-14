
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="group w-full max-w-sm overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      <div className="flex h-72 items-center justify-center border-b bg-muted/40 p-6">
        <Link
          href={`/product/${product.id}`}
          className="flex h-full w-full items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </p>

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h2 className="line-clamp-2 text-lg font-semibold leading-tight tracking-tight transition-colors hover:text-primary">
            {product.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
            <span className="text-sm">★</span>

            <span className="text-sm font-medium">
              {product.rating?.rate ?? product.rate}
            </span>
          </div>

          {product.rating?.count && (
            <span className="text-xs text-muted-foreground">
              {product.rating.count} reviews
            </span>
          )}
        </div>

        {/* Price + Button */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tight">
            ${product.price}
          </span>

          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

