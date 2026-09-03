import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const alt = 'Aotearoa Festivals';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#171717',
        color: '#f5f5f5',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          textAlign: 'center',
          padding: '0 80px',
        }}
      >
        Aotearoa Festivals
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 32,
          color: '#a3a3a3',
        }}
      >
        Discover New Zealand music festivals
      </div>
    </div>,
    { ...size }
  );
}
