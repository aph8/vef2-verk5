'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Image as DatoImage } from 'react-datocms';
import RegionSelector from './RegionSelector';
import { River } from '@/lib/datocms';
import '@/styles/rivers.scss';

interface RiverSearchProps {
  rivers: River[];
  regions: string[];
}

export default function RiverSearch({ rivers, regions }: RiverSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [filteredRivers, setFilteredRivers] = useState<River[]>(rivers);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    const newFilteredRivers = rivers
      .filter((river) => regionFilter === 'All' || river.region.includes(regionFilter))
      .filter((river) => {
        if (!query) return true;
        const words = river.title.toLowerCase().split(' ');
        return words.some((word) => word.startsWith(query));
      })
      .sort((a, b) => a.title.localeCompare(b.title));

    setFilteredRivers(newFilteredRivers);
  }, [searchQuery, regionFilter, rivers]);

  return (
    <>
      <div className="search-and-filter">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="Leita eftir fyrstu stöfum orðs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <RegionSelector
          regions={regions}
          currentRegion={regionFilter}
          onRegionChange={(region) => setRegionFilter(region)}
        />
      </div>

      <div className="rivers-grid">
        {filteredRivers.map((river) => (
          <Link href={`/rivers/${river.slug}`} key={river.id} className="river-card">
            <div className="image-wrapper">
              <DatoImage data={river.image[0].responsiveImage} />
            </div>
            <div className="river-info">
              <h2>{river.title}</h2>
              <p>Veiddir fiskar (2024): {river.fishcount}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
