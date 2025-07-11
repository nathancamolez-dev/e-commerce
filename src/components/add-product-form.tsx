"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const addProductFormSchema = z.object({
	title: z.string().min(3, {
		message: "O nome do produto precisa ter no mínimo 3 caracteres",
	}),
	price: z.coerce
		.number()
		.min(0.01, { message: "O preço precisa ser maior que R$ 0,01" }),
	description: z.string().optional(),
	featured: z.boolean(),
	image: z.string().min(1, {
		message: "A imagem é obrigatória",
	}),
	options: z.array(z.string()).min(1, {
		message: "É obrigatorio o produto oferecer pelo menos uma opção",
	}),
});

type AddProductFormSchema = z.infer<typeof addProductFormSchema>;

export function AddProductForm() {
	const [preview, setPreview] = useState<string | null>(null);
	const [options, setOptions] = useState<string[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<AddProductFormSchema>({
		resolver: zodResolver(addProductFormSchema),
		defaultValues: {
			title: "",
			price: 0,
			description: "",
			featured: false,
			image: "",
			options: [],
		},
	});

	useEffect(() => {
		register("image");
		register("options");
	}, [register]);

	const handleAddProduct: SubmitHandler<AddProductFormSchema> = async (
		data,
	) => {
		await fetch("http://localhost:3333/product", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		});
		console.log(data);
	};

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { files } = event.target;
		if (!files || files.length === 0) {
			return;
		}
		const file = files[0];
		const previewURL = URL.createObjectURL(file);
		setPreview(previewURL);
		setValue("image", previewURL, { shouldValidate: true });
	}

	function handleAddOption(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			event.preventDefault();
			const optionInput = event.currentTarget;
			const newOption = optionInput.value.trim();
			if (newOption && !options.includes(newOption)) {
				const newOptions = [...options, newOption];
				setOptions(newOptions);
				setValue("options", newOptions, { shouldValidate: true });
				optionInput.value = "";
			}
		}
	}

	function handleRemoveOption(indexToRemove: number) {
		const newOptions = options.filter((_, index) => index !== indexToRemove);
		setOptions(newOptions);
		setValue("options", newOptions, { shouldValidate: true });
	}

	return (
		<div className="flex flex-row gap-20 items-center">
			<Image
				src={preview ?? "/icon.png"}
				alt="Product image"
				width={400}
				height={400}
				className="w-[400px] h-[400px] object-cover"
			/>
			<form
				onSubmit={handleSubmit(handleAddProduct)}
				className="relative flex flex-col gap-4 w-[480px]"
			>
				<div className="justify-center">
					<div className="flex flex-col gap-2">
						<label htmlFor="title">Nome do produto</label>
						<input
							id="title"
							type="text"
							className="border border-zinc-300 rounded-md p-2"
							{...register("title")}
						/>
						{errors.title && (
							<span className="text-red-500 text-sm">
								{errors.title.message}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="price">Preço</label>
						<input
							id="price"
							type="number"
							step="0.01"
							className="border border-zinc-300 rounded-md p-2"
							{...register("price")}
						/>
						{errors.price && (
							<span className="text-red-500 text-sm">
								{errors.price.message}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="description">Descrição</label>
						<textarea
							id="description"
							className="border border-zinc-300 rounded-md p-2"
							{...register("description")}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label>
							Imagem do produto
							<input
								type="file"
								className="hidden"
								ref={fileInputRef}
								onChange={handleFileChange}
								accept="image/*"
							/>
						</label>
						<Button type="button" onClick={() => fileInputRef.current?.click()}>
							Procurar imagem
						</Button>
						{errors.image && (
							<span className="text-red-500 text-sm">
								{errors.image.message}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="options">Opções do produto</label>
						<input
							id="options"
							type="text"
							className="border border-zinc-300 rounded-md p-2"
							onKeyDown={handleAddOption}
							placeholder="Digite uma opção e pressione Enter"
						/>
						<div className="flex flex-wrap gap-2 mt-2">
							{options.map((option, index) => (
								<div
									key={option}
									className="flex items-center gap-2 bg-zinc-200 rounded-full px-3 py-1"
								>
									<span>{option}</span>
									<button
										type="button"
										onClick={() => handleRemoveOption(index)}
										className="text-zinc-500 hover:text-zinc-800"
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex justify-end items-center mt-4">
					<Button type="submit">Adicionar produto</Button>
				</div>
			</form>
		</div>
	);
}
