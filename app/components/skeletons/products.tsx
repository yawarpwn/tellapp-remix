function SkeletonCard() {
  return (
    <div className="card card-compact bg-base-200 shadow-sm">
      <div className="card-body">
        <div className="border-b-base-content/10 flex justify-center border-b pb-2">
          <div className="skeleton h-12 w-11/12 "></div>
        </div>
        <div className="border-b-base-content/10 flex justify-between border-b py-2 text-center">
          <div className="skeleton h-4 w-16"></div>
          <div className="skeleton h-4 w-16"></div>
          <div className="skeleton h-4 w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="skeleton h-4 w-16"></div>
          <div className="skeleton h-4 w-16"></div>
          <div className="flex gap-x-2">
            <div className="skeleton h-6 w-6"></div>
            <div className="skeleton h-6 w-6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductSkeletonRow() {
  return (
    <tr>
      <td>
        <div className="flex flex-col gap-1.5">
          <p className="skeleton h-2.5 w-[280px]"></p>
          <p className="skeleton h-2.5 w-[280px]"></p>
          <p className="skeleton h-2.5 w-[280px]"></p>
          <p className="skeleton h-2.5 w-40"></p>
        </div>
      </td>
      <td>
        <div className="skeleton h-4 w-12 truncate "></div>
      </td>
      {/* U/M */}
      <td>
        <div className="skeleton h-4 w-12"></div>
      </td>
      {/* Cost */}
      <td>
        <div className="skeleton h-4 w-10"></div>
      </td>
      {/* Precio */}
      <td>
        <div className="skeleton h-4 w-10"></div>
      </td>
      {/* Category */}
      <td>
        <p className="skeleton h-4 w-[40px] truncate"></p>
      </td>
      {/* Acciones */}
      <td>
        <div className="flex items-center gap-x-2">
          <div className="skeleton h-4 w-6"></div>
          <div className="skeleton h-4 w-6"></div>
        </div>
      </td>
    </tr>
  )
}

export function ProductsSkeleton() {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-xs mt-4 table">
          {/* head */}
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Codigo</th>
              <th>U/M</th>
              <th>Costo</th>
              <th>Precio</th>
              <th>Categ</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
            <ProductSkeletonRow />
          </tbody>
        </table>
      </div>
    </>
  )
}
