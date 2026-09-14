import Link from "next/link";

export default function ProductCard({product}) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Image */}
      <div className="flex h-72 items-center justify-center bg-gray-50 p-6">
       <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain"
        />
       </Link>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <p className="mb-2 text-sm font-medium capitalize text-blue-600">
          {product.category}
        </p>

        {/* Title */}
        <h2 className="line-clamp-2 text-lg font-bold text-gray-900">
          {product.title}
        </h2>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">
         

          <span className="font-semibold text-gray-800">
            {product.rate}
          </span>
        </div>

        {/* Price + Button */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>

          <button className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  )
}