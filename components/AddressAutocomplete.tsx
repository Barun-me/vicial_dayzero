// AddressAutocomplete.tsx
"use client"
import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export interface PlaceDetails {
  name: string;
  formatted_address: string;
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface AddressAutocompleteProps {
  placeholder?: string;
  IconComponent: React.ComponentType;
  className?: string;
  // avoid unused‐vars on the param name by renaming it
  onSelect: (placeDetails: PlaceDetails) => void;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  placeholder,
  IconComponent,
  onSelect,
  className,
}) => {
  const [address, setAddress] = useState("");

  const handleChange = (newAddress: string) => {
    setAddress(newAddress);
  };

  const handleSelect = async (selectedAddress: string) => {
    setAddress(selectedAddress);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      const place: PlaceDetails = {
        name: results[0].formatted_address,
        formatted_address: results[0].formatted_address,
        place_id: results[0].place_id,
        geometry: {
          location: {
            lat: latLng.lat,
            lng: latLng.lng,
          },
        },
      };
      onSelect(place);
    } catch (error) {
      console.error("Error getting address details:", error);
    }
  };

  return (
    <div className={className}>
      <IconComponent />
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="w-full mt-3 mr-5">
            <input
              {...getInputProps({
                placeholder,
                className: "p-5 w-full bg-gray-300 border rounded-lg",
              })}
            />
            <div>
              {loading ? (
                <div className="p-4">Loading...</div>
              ) : (
                <div className="absolute left-0 z-10 mt-1 w-full max-h-70 overflow-y-auto bg-white rounded-lg shadow-lg shadow-gray-800">
                  {suggestions.map((suggestion) => {
                    const {key, ...restprops} = getSuggestionItemProps(suggestion, {
                      className: suggestion.active
                        ? "p-4 cursor-pointer bg-gray-200"
                        : "p-4 cursor-pointer hover:bg-gray-100",
                    });
                    return (
                      <div key={key} {...restprops}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};
