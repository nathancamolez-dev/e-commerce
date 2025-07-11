import { SearchNotFound } from "@/components/search-not-found";
import { api } from "@/data/api";
import type { Product } from "@/data/types/product";
import Image from "next/image";
import Link from "next/link";

interface SearchProps {
	searchParams: Promise<{ q: string }>;
}

async function searchProducts(query: string): Promise<Product[]> {
	if (!query) {
		const response = await api("/products", {
			next: {
				revalidate: 60 * 60, // 1 hour
			},
		});

		const products = await response.json();
		return products;
	}

	const response = await api(`/products/search?q=${query}`, {
		next: {
			revalidate: 60 * 60, // 1 hour
		},
	});

	const products = await response.json();

	if (!products.length) {
		return [];
	}
	return products;
}

export default async function Search(props: SearchProps) {
	const searchParams = await props.searchParams;
	const { q: query } = searchParams;
	const products = await searchProducts(!query ? "" : query);

	return (
		<div className="flex flex-col gap-4">
			{!!query && (
				<p className="text-sm">
					Resultados para: <span className="font-semibold">{query}</span>
				</p>
			)}
			<div className="grid grid-cols-3 gap-6">
				{products.length ? (
					products.map((product) => {
						return (
							<Link
								key={product.id}
								href={`/product/${product.slug}`}
								className="group relative  rounded-lg bg-zinc-50 overflow-hidden flex  justify-center items-end"
							>
								<Image
									src={product.image_url}
									className={`${
										product.paused ? "grayscale" : ""
									} w-[460] h-[460] object-cover group-hover:scale-105  transition-transform duration-500 rounded-lg`}
									width={460}
									height={460}
									alt="Product"
									quality={100}
								/>
								<div className="absolute bottom-10 right-28 h-12 flex items-center gap-2 max-w-[320px] rounded-full border-2 border-zinc-500 bg-violet-200/60 p-1 pl-5">
									<span className="text-sm truncate">{product.title}</span>
									<span className="flex h-full items-center justify-center rounded-full bg-zinc-100 px-4 font-semibold">
										{!product.paused
											? product.price.toLocaleString("pt-BR", {
													style: "currency",
													currency: "BRL",
											  })
											: "Indisponível"}
									</span>
								</div>
							</Link>
						);
					})
				) : (
					<SearchNotFound />
				)}
			</div>
		</div>
	);
}
