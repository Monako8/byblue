"use client";
import Gallery3D from "../../components/Gallery3D"; // Убедитесь, что путь к файлу верный

export default function MuseumPage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Моя Галерея</h1>
      <Gallery3D />
    </main>
  );
}