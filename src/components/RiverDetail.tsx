import { StructuredText } from 'react-datocms';
import ImageGallery from '@/components/ImageGallery';
import { River } from '@/lib/datocms';
import '@/styles/river-page.scss';

interface RiverDetailProps {
  river: River;
}

export default function RiverDetail({ river }: RiverDetailProps) {
  return (
    <main className="river-page">
      <div className="river-card-detail">
        <div className="slug-hero">
          <ImageGallery images={river.image} containerHeight={400} customWidth={1200} quality={100} />
        </div>

        <div className="slug-page-layout">
          <aside className="sidebar">
            <div className="info-grid">
              <div className="info-item">
                <strong>Landshluti:</strong> {river.region?.[0]}
              </div>
              <div className="info-item">
                <strong>Veiddir fiskar (2024):</strong> {river.fishcount}
              </div>
              <div className="info-item">
                <strong>Veiðitímabil:</strong> {river.season}
              </div>
              <div className="info-item">
                <strong>Leyfilegt agn:</strong> {river.bait}
              </div>
            </div>
          </aside>

          <section className="main-content">
            <h1>{river.title}</h1>
            <div className="description">
              <StructuredText data={river.description.value} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
