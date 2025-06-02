"use client";

import { useState, useEffect, useCallback } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Maps from "@/Components/Maps/Maps";
import ContinueButton from "@/Components/ContinueButton/ContinueButton";
import InputDiv from "@/Components/InputDiv/InputDiv";

// Define the maximum file size
const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface FormData {
  storeName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  longitude: number;
  latitude: number;
  images: (File | null)[]; // File objects can have an added 'preview' property
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
    images: [null, null, null],
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const {
      storeName,
      street,
      city,
      state,
      pincode,
      longitude,
      latitude,
      images,
    } = formData;
    const allImagesSelected = images.every((image) => image !== null);
    const allFieldsFilled = !!(
      storeName &&
      street &&
      city &&
      state &&
      pincode &&
      (longitude !== 0 || latitude !== 0) &&
      allImagesSelected
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

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0] ?? null;
    const currentImageInSlot = formData.images[index];

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        alert(
          `File "${file.name}" (${(file.size / 1024 / 1024).toFixed(
            2
          )}MB) is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`
        );
        e.target.value = ""; // Clear the file input to allow re-selection

        // Optionally, if you want to clear the slot if an invalid file was attempted:
        // (If you want to keep the previous valid image, skip this setFormData call or modify it)
        if (currentImageInSlot && (currentImageInSlot as any).preview) {
          URL.revokeObjectURL((currentImageInSlot as any).preview);
        }
        setFormData((prev) => {
          const newImages = [...prev.images];
          newImages[index] = null;
          return { ...prev, images: newImages };
        });
        return; // Stop processing this oversized file
      }

      // File size is valid, proceed
      setFormData((prev) => {
        const newImages = [...prev.images];
        // If there was a previous image in this slot, revoke its object URL
        if (prev.images[index] && (prev.images[index] as any).preview) {
          URL.revokeObjectURL((prev.images[index] as any).preview);
        }

        // Create a preview URL and attach it to the file object
        (file as any).preview = URL.createObjectURL(file);
        newImages[index] = file;
        return { ...prev, images: newImages };
      });
    } else {
      // No file selected (e.g., user clicked "cancel" or cleared the input)
      // Clear the image from the slot and revoke its preview URL if it existed
      setFormData((prev) => {
        const newImages = [...prev.images];
        if (prev.images[index] && (prev.images[index] as any).preview) {
          URL.revokeObjectURL((prev.images[index] as any).preview);
        }
        newImages[index] = null;
        return { ...prev, images: newImages };
      });
    }
  };

  const handleContinue = async () => {
    if (!isFormValid || isUploading) return;

    setIsUploading(true);
    const uploadedImageIds: string[] = [];
    let allUploadsSuccessful = true;
    const imagesToUpload = [...formData.images]; // Work with a snapshot

    for (const imageFile of imagesToUpload) {
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", imageFile);

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/file/upload`,
            {
              method: "POST",
              body: imageFormData,
            }
          );

          if (!response.ok) {
            const errorData = await response.text();
            console.error(
              `Failed to upload image: ${imageFile.name}. Server response: ${errorData}`
            );
            allUploadsSuccessful = false;
            break;
          }
          const result = await response.json();
          if (result.fileUrl) {
            uploadedImageIds.push(result.fileUrl);
          } else {
            console.error(
              `Upload succeeded for ${imageFile.name} but no fileId or fileUrl in response.`
            );
            allUploadsSuccessful = false;
            break;
          }
        } catch (error) {
          console.error(`Error uploading image ${imageFile.name}:`, error);
          allUploadsSuccessful = false;
          break;
        }
      }
    }
    setIsUploading(false);

    if (
      allUploadsSuccessful &&
      uploadedImageIds.length ===
        imagesToUpload.filter((img) => img !== null).length
    ) {
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
        images: uploadedImageIds,
      });
      router.push("/onboarding/services");
    } else {
      alert(
        "Some images could not be uploaded. Please check image sizes and try again."
      );
    }
  };

  const handleLocationChange = useCallback(
    (coords: { lat: number; lng: number }) => {
      setFormData((prev) => ({
        ...prev,
        latitude: coords.lat,
        longitude: coords.lng,
      }));
    },
    []
  );

  useEffect(() => {
    if (data.setup) {
      const { storeName, storeAddress, longitude, latitude } = data.setup;
      setFormData((prev) => ({
        ...prev,
        storeName: storeName ?? prev.storeName,
        street: storeAddress?.street ?? prev.street,
        city: storeAddress?.city ?? prev.city,
        state: storeAddress?.state ?? prev.state,
        pincode: storeAddress?.pincode ?? prev.pincode,
        longitude: longitude ?? prev.longitude,
        latitude: latitude ?? prev.latitude,
      }));
    }
  }, [data.setup]);

  // Effect to revoke object URLs on component unmount or when images array reference changes
  useEffect(() => {
    const currentImagesWithPreviews = formData.images.filter(
      (img): img is File & { preview: string } =>
        img !== null && typeof (img as any).preview === "string"
    );
    return () => {
      currentImagesWithPreviews.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [formData.images]);

  return (
    <div className="flex items-center justify-center px-4 my-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:gap-4 lg:gap-8">
        {/* Left Column: Form */}
        <div className="flex flex-col space-y-8 flex-1">
          <div className="flex flex-col gap-2">
            <p className="heading">Set Up Your Print Store</p>
            <p className="subHeading">Basic Store Information</p>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <span className="text">
                Upload up to 3 images (max {MAX_FILE_SIZE_MB}MB each)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {[0, 1, 2].map((idx) => (
                <label
                  key={idx}
                  className={`relative bg-[#61E98740] border-[0.5px] border-dotted border-[#61E987]
                                   min-h-[102px] max-h-[102px] flex-1 rounded-[10px] flex justify-center items-center
                                   overflow-hidden ${
                                     isUploading
                                       ? "cursor-not-allowed"
                                       : "cursor-pointer"
                                   }`}
                >
                  {formData.images[idx] ? (
                    <img
                      // Use the preview URL attached to the file object
                      src={(formData.images[idx] as any).preview}
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
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleImageChange(e, idx)}
                    disabled={isUploading}
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
                disabled={isUploading}
              />
              <InputDiv
                inputType="text"
                inputId="street"
                inputName="street"
                label="Store Address"
                required={true}
                inputValue={formData.street}
                onChange={handleChange}
                disabled={isUploading}
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
                  disabled={isUploading}
                />
                <InputDiv
                  inputType="text"
                  inputId="state"
                  inputName="state"
                  label="State"
                  required={true}
                  inputValue={formData.state}
                  onChange={handleChange}
                  disabled={isUploading}
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
                disabled={isUploading}
              />
            </div>

            <div className="flex justify-end mt-6">
              <ContinueButton
                isDisabled={!isFormValid || isUploading}
                onClick={handleContinue}
              >
                {isUploading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Uploading...
                  </>
                ) : (
                  "Continue"
                )}
              </ContinueButton>
            </div>
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="flex flex-col space-y-8 flex-1">
          <div className="flex flex-col gap-2">
            <p className="heading">Pin Your Store Location</p>
            <p className="subHeading">
              Point out your store location for better results
            </p>
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
