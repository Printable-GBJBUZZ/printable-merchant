"use client";

import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import { useState, useRef, useEffect, useCallback } from "react";

const containerStyle = {
	width: "100%",
	height: "100%",
};

type LatLng = { lat: number; lng: number };

interface MapsProps {
	streetAddress: string;
	onLocationChange?: (coords: LatLng) => void;
}

export default function Maps({ streetAddress, onLocationChange }: MapsProps) {
	const [location, setLocation] = useState<LatLng>({
		lat: 23.0225,
		lng: 72.5714,
	});

	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

	// 1) Get user’s current geo on mount
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const coords = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					};
					setLocation(coords);
					onLocationChange?.(coords);
				},
				(err) => {
					console.warn("Geolocation error:", err);
				}
			);
		}
	}, [onLocationChange]);

	// 2) When streetAddress prop changes, geocode it
	useEffect(() => {
		if (!streetAddress) return;

		// wait for maps API to be loaded
		if (typeof window === "undefined" || !(window as any).google) return;

		const geocoder = new (window as any).google.maps.Geocoder();
		geocoder.geocode({ address: streetAddress }, (results: any[], status: string) => {
			if (status === "OK" && results[0]) {
				const loc = results[0].geometry.location;
				const coords = { lat: loc.lat(), lng: loc.lng() };
				setLocation(coords);
				onLocationChange?.(coords);
				console.log("Geocoded:", streetAddress, coords);
			} else {
				console.warn("Geocode failed:", status);
			}
		});
	}, [streetAddress, onLocationChange]);

	// 3) Autocomplete handlers (for manual input)
	const onLoad = useCallback((auto: google.maps.places.Autocomplete) => {
		autocompleteRef.current = auto;
	}, []);

	const onPlaceChanged = useCallback(() => {
		const auto = autocompleteRef.current;
		if (!auto) return;
		const place = auto.getPlace();
		if (place.geometry?.location) {
			const coords = {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
			};
			setLocation(coords);
			onLocationChange?.(coords);
		}
	}, [onLocationChange]);

	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
			libraries={["places"]}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={location}
				zoom={14}>
				<Marker position={location} />
			</GoogleMap>
		</LoadScript>
	);
}
