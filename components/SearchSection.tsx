//SearchSection.tsx
import React, { useEffect, useState } from 'react'
import { AddressAutocomplete, PlaceDetails } from './AddressAutocomplete'
import { ArrowBigDown, MapPinHouse, MapPlus } from 'lucide-react'
import SearchSectionSkeleton from './skeletons/SearchSectionSkeleton';

interface SearchSectionProps {
  onSourceSelect: (placeDetails: PlaceDetails) => void;
  onDestinationSelect: (placeDetails: PlaceDetails) => void;
}
const SearchSection: React.FC<SearchSectionProps> = ({ onSourceSelect, onDestinationSelect }) => {

  const [ loading, setLoading ] = useState(true)
  // const handlePlaceSelect = (place: PlaceDetails) => {
  //   console.log("Selected place details:", place);
  //   LatLonDetails(place);
  // };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  },[])

  return (
    <>
      {loading
        ? <SearchSectionSkeleton />
        : <div className='p-3 md:pd-6 border-[2px] rounded-xl flex flex-col gap-4 bg-white border-black'>
          <p className='flex text-xl font-bold gap-2 justify-center'>Select Here <ArrowBigDown /></p>
          <AddressAutocomplete
            placeholder='Enter the source'
            IconComponent={MapPlus}
            className="flex items-center gap-4 relative"
            onSelect={onSourceSelect}
          />
          <AddressAutocomplete
            placeholder='Enter the destination'
            IconComponent={MapPinHouse}
            className="flex items-center gap-4 relative"
            onSelect={onDestinationSelect}
          />

          <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'>Search</button>
        </div>
      }
    </>
  )
}

export default SearchSection