import { Skeleton } from "@/components/skeleton";

export default function HomeLoading() {
	return (
		<div className="grid grid-cols-9 gap-6">
			<Skeleton className="col-span-5 aspect-square w-full rounded-xl" />

			<div className="col-span-4 flex flex-col gap-4 pl-48 pt-48">
				<Skeleton className="h-20 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-5/6" />

				<Skeleton className="h-10 w-1/3" />

				<div className="flex gap-2 mt-2">
					<Skeleton className="h-10 w-15 rounded-full" />
					<Skeleton className="h-10 w-15 rounded-full" />
					<Skeleton className="h-10 w-15 rounded-full" />
				</div>

				<Skeleton className="mt-4 h-12 w-3/4 rounded-full" />
			</div>
		</div>
	);
}
