import { useState } from "react";
import { Check, X } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface ShopFiltersProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export default function ShopFilters({ 
  onFilterChange, 
  priceRange, 
  onPriceRangeChange 
}: ShopFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    period: [],
    region: [],
    condition: [],
  });
  
  const periodOptions: FilterOption[] = [
    { id: '1500s', label: '1500s' },
    { id: '1600s', label: '1600s' },
    { id: '1700s', label: '1700s' },
    { id: '1800s', label: '1800s' },
    { id: '1900s', label: '1900s' },
  ];
  
  const regionOptions: FilterOption[] = [
    { id: 'north-america', label: 'North America' },
    { id: 'europe', label: 'Europe' },
    { id: 'asia', label: 'Asia' },
    { id: 'africa', label: 'Africa' },
    { id: 'oceania', label: 'Oceania' },
    { id: 'south-america', label: 'South America' },
  ];
  
  const conditionOptions: FilterOption[] = [
    { id: 'excellent', label: 'Excellent' },
    { id: 'very-good', label: 'Very Good' },
    { id: 'good', label: 'Good' },
    { id: 'fair', label: 'Fair' },
  ];
  
  const handleFilterChange = (category: string, value: string) => {
    const newFilters = { ...activeFilters };
    
    if (newFilters[category].includes(value)) {
      // Remove the filter
      newFilters[category] = newFilters[category].filter(v => v !== value);
    } else {
      // Add the filter
      newFilters[category] = [...newFilters[category], value];
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    const emptyFilters = {
      period: [],
      region: [],
      condition: [],
    };
    setActiveFilters(emptyFilters);
    onFilterChange(emptyFilters);
    onPriceRangeChange([0, 10000]);
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value, 10);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    onPriceRangeChange(newRange);
  };
  
  // Count total active filters
  const totalActiveFilters = Object.values(activeFilters).flat().length + 
    (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0);
  
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-medium">Filters</h3>
        {totalActiveFilters > 0 && (
          <button 
            onClick={clearFilters}
            className="text-sm text-primary flex items-center"
          >
            Clear all <X className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="pl-7 pr-3 py-2 border border-neutral-300 rounded w-full"
            />
          </div>
          <span className="text-neutral-400">to</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
            <input
              type="number"
              min={priceRange[0]}
              max="10000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="pl-7 pr-3 py-2 border border-neutral-300 rounded w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Time Period */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Time Period</h4>
        <div className="space-y-2">
          {periodOptions.map((option) => (
            <label 
              key={option.id} 
              className="flex items-center cursor-pointer"
            >
              <div 
                className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                  activeFilters.period.includes(option.id)
                    ? 'bg-primary border-primary'
                    : 'border-neutral-300'
                }`}
                onClick={() => handleFilterChange('period', option.id)}
              >
                {activeFilters.period.includes(option.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Region */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Region</h4>
        <div className="space-y-2">
          {regionOptions.map((option) => (
            <label 
              key={option.id} 
              className="flex items-center cursor-pointer"
            >
              <div 
                className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                  activeFilters.region.includes(option.id)
                    ? 'bg-primary border-primary'
                    : 'border-neutral-300'
                }`}
                onClick={() => handleFilterChange('region', option.id)}
              >
                {activeFilters.region.includes(option.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Condition */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Condition</h4>
        <div className="space-y-2">
          {conditionOptions.map((option) => (
            <label 
              key={option.id} 
              className="flex items-center cursor-pointer"
            >
              <div 
                className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                  activeFilters.condition.includes(option.id)
                    ? 'bg-primary border-primary'
                    : 'border-neutral-300'
                }`}
                onClick={() => handleFilterChange('condition', option.id)}
              >
                {activeFilters.condition.includes(option.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
