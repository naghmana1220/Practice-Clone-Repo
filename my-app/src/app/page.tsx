import Image from "next/image";
import { client } from "@/sanity/lib/client";

  const Home = async () => {
    const products = await client.fetch(`
      *[_type == "product"]{
        _id,
        name,
        description,
        price,
        discountPercentage,
        "priceWithoutDiscount" : price,
        rating,
        ratingCount,
        tags,
        sizes,
        "imageUrl": image.asset->url
      }
  `);
  
  return (
    <div className="p-4 bg-slate-950">
     <h1 className="text-4xl font-semibold font-serif mb-6 text-cyan-500">Data Fetching Using Pre-Built API and Schema Queries</h1>
     <p className="text-1xl font-sm mb-6 text-cyan-500 text-start">Seamlessly access and display data with powerful API integration and schema-driven queries!</p>
    <div className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-slate-950">
      {products.map((product:any) => (
       <div
       key={product._id}
       className="border rounded-lg  hover:shadow-md p-4 shadow-lg hover:shadow-cyan-500"
       >
        <Image
        src={product.imageUrl}
        alt={product.name}
        height={500}
        width={500}
        className="w-full h-48 object-cover rounded-md"
        />
<h2 className="text-cyan-500 text-lg font-semibold mt-4">{product.name}</h2>
<p className="text-gray-400 text-sm mt-2">{product.description}</p>
<div className="mt-3">
 <p className="text-red-700 font-bold text-lg">
  ${product.price - (product.price * (product.discountPercentage || 0)) /100}
 </p>
 <p className="text-gray-500 text-sm line-through">
  ${product.priceWithoutDiscount}
 </p>
</div>
<p className="text-sm mt-2 text-yellow-700">
  {product.rating} * ({product.ratingCount} review)
</p>
<div className="flex mt-2 gap-1 flex-wrap">
 {product.tags?.map((tags: any, index: any) => (
  <span 
  key={index} 
  className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
 {tags}
  </span>
 ))}
</div>
<div className="mt-2">
 <p className="text-sm text-gray-400">Sizes:</p>
 <div className="flex gap-2 mt-1">
 {product.sizes?.map((size: any, index: any) => (
  <span
  key={index}
  className="text-xs border px-2 py-1 rounded text-gray-600"     
  >
 {size}
  </span> 
 ))}
 </div>
</div> 

        </div>
      ))}

    </div>
    </div>
  );
};
export default Home;
