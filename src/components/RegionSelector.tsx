'use client';

import React from 'react';
import '@/styles/RegionSelector.scss';

interface RegionSelectorProps {
  regions: string[];
  currentRegion: string;
  onRegionChange?: (region: string) => void;
}

export default function RegionSelector({
  regions,
  currentRegion,
  onRegionChange,
}: RegionSelectorProps) {
  return (
    <div className="region-filter">
      <label htmlFor="region-select">Landshluti:</label>
      <select
        id="region-select"
        name="region"
        value={currentRegion}
        onChange={(e) => {
          const region = e.target.value;
          if (onRegionChange) {
            onRegionChange(region);
          }
        }}
      >
        <option value="All">Allir</option>
        {regions.map((reg) => (
          <option key={reg} value={reg}>
            {reg}
          </option>
        ))}
      </select>
    </div>
  );
}
