"use client";

import { useState, useEffect, useCallback } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Maps from "@/components/Maps/Maps";
import ContinueButton from "@/components/ContinueButton/ContinueButton";
import InputDiv from "@/components/InputDiv/InputDiv";

interface FormData {
	storeName: string;
	street: string;
	city: string;
	state: string;
	pincode: string;
	longitude: number;
	latitude: number;
	images: File[];
}

export default function StoreSetup() {
	const router = useRouter();
	const { data, updateSetup } = useOnboarding();

	const [formData, setFormData] = useState<FormData>({
		storeName: "",
		street: "",
		city: "",
		state: "",
		pincode: "",
		longitude: 0,
		latitude: 0,
		images: [],
	});

	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const { storeName, street, city, state, pincode, longitude, latitude, images } = formData;
		const allFieldsFilled = !!(
			storeName &&
			street &&
			city &&
			state &&
			pincode &&
			longitude &&
			latitude &&
			images.length === 3
		);
		setIsFormValid(allFieldsFilled);
	}, [formData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const file = e.target.files?.[0] ?? null;
		setFormData((prev) => {
			const images = [...prev.images];
			if (file) {
				images[index] = file;
			}

			return { ...prev, images };
		});
	};

	const handleContinue = () => {
		updateSetup({
			storeName: formData.storeName,
			storeAddress: {
				street: formData.street,
				city: formData.city,
				state: formData.state,
				pincode: formData.pincode,
			},
			longitude: formData.longitude,
			latitude: formData.latitude,
			images: formData.images,
		});
		router.push("/onboarding/services");
		// Navigate to the next step
	};

	const handleLocationChange = useCallback((coords: { lat: number; lng: number }) => {
		setFormData((prev) => ({ ...prev, latitude: coords.lat, longitude: coords.lng }));
	}, []);

	useEffect(() => {
		if (data.setup) {
			const { storeAddress, ...finalData } = data.setup;
			setFormData({ ...storeAddress, ...finalData });
		}
	}, []);

	return (
		<div className="flex items-center justify-center px-4 mt-10">
			<div className="w-full max-w-6xl flex flex-col md:flex-row md:gap-4 lg:gap-8">
				{/* Left Column: Form */}
				<div className="flex flex-col space-y-8 flex-1">
					<div className="flex flex-col gap-2">
						<p className="heading">Set Up Your Print Store</p>
						<p className="subHeading">Basic Store Information</p>
					</div>
					<div className="flex flex-col gap-2">
						<div>
							<span className="text">Upload up to 3 images</span>
						</div>
						<div className="flex flex-col sm:flex-row gap-2">
							{[0, 1, 2].map((idx) => (
								<label
									key={idx}
									className="relative bg-[#61E98740] border-[0.5px] border-dotted border-[#61E987] 
                       min-h-[102px] flex-1 rounded-[10px] flex justify-center items-center 
                       cursor-pointer overflow-hidden">
									{formData.images[idx] ? (
										<img
											src={URL.createObjectURL(formData.images[idx]!)}
											alt={`Preview ${idx + 1}`}
											className="object-cover w-full h-full"
										/>
									) : (
										<div className="bg-[#3AE180] rounded-full h-5 w-5 flex justify-center items-center text-black">
											<FontAwesomeIcon icon={faPlus} />
										</div>
									)}

									<input
										type="file"
										accept="image/*"
										className="absolute inset-0 w-full h-full opacity-0"
										onChange={(e) => handleImageChange(e, idx)}
									/>
								</label>
							))}
						</div>

						<div className="flex flex-col gap-2">
							<InputDiv
								inputType="text"
								inputId="storeName"
								inputName="storeName"
								label="Store Name"
								required={true}
								inputValue={formData.storeName}
								onChange={handleChange}
							/>
							<InputDiv
								inputType="text"
								inputId="street"
								inputName="street"
								label="Store Address"
								required={true}
								inputValue={formData.street}
								onChange={handleChange}
							/>
							<div className="flex flex-col md:flex-row gap-4">
								<InputDiv
									inputType="text"
									inputId="city"
									inputName="city"
									label="City"
									required={true}
									inputValue={formData.city}
									onChange={handleChange}
								/>

								<InputDiv
									inputType="text"
									inputId="state"
									inputName="state"
									label="State"
									required={true}
									inputValue={formData.state}
									onChange={handleChange}
								/>
							</div>

							<InputDiv
								inputType="text"
								inputId="pincode"
								inputName="pincode"
								label="Postal Code"
								required={true}
								inputValue={formData.pincode}
								onChange={handleChange}
							/>
						</div>

						<div className="flex justify-end mt-6">
							<ContinueButton
								isDisabled={!isFormValid}
								onClick={handleContinue}
							/>
						</div>
					</div>
				</div>

				{/* Right Column: Map */}
				<div className="flex flex-col space-y-8 flex-1">
					<div className="flex flex-col gap-2">
						<p className="heading">Pin Your Store Location</p>
						<p className="subHeading">Point out your store location for better results </p>
					</div>
					<div className="flex-1 rounded border border-gray-300">
						<div className="w-full h-full ">
							<Maps
								streetAddress={formData.street}
								onLocationChange={handleLocationChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
