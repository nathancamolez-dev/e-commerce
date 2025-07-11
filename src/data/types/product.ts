export interface Product {
	id: string;
	title: string;
	slug: string;
	price: number;
	image_url: string;
	description: string;
	featured: boolean;
	options: string[];
	created_at: Date;
	paused: boolean;
}
