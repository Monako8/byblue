"use client";

import React, { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

const vec = new THREE.Vector3();
const scaleVec = new THREE.Vector3();

const PAINTINGS_DATA = [
  { url: "/artgallery/1.webp", title: "Этюд в голубых тонах", desc: "Она появилась из попытки художника подобрать идеальные оттенки снега и льда, и в итоге стала похожа на саму стихию: легкая, холодная и невероятно изящная" },
  { url: "/artgallery/2.webp", title: "Портрет сестры", desc: "Винтажный стиль, выразительный взгляд и ключевая деталь - зеленая звезда  создают образ современной героини с особенным, глубоким внутренним миром" },
  { url: "/artgallery/3.webp", title: "Молитва Танца Драконов", desc: "Фан-арт, показывающий двух ключевых героинь «Дома Дракона» — Рейниру Таргариен и Алисенту Хайтауэр" },
  { url: "/artgallery/4.webp", title: "Шепот заросшего пути", desc: "Работа передает ощущение внезапного озарения, которое случается в самый мрачный момент" },
  { url: "/artgallery/6.webp", title: "Дом с историей", desc: "Этюд фасада старинного здания в стиле готического возрождения." },
  { url: "/artgallery/7.webp", title: "Свет, затаившийся в тени", desc: "Минималистичная композиция, построенная на взаимодействии формы и яркого акцентного освещения.Работа передает ощущение свежести и объема через упрощение деталей. Вся выразительность картины заключена в уверенной работе со светом и цветом, которые делают привычный сюжет выразительным и современным." },
  { url: "/artgallery/9.webp", title: "Амфора и спелость", desc: "Это работа о гармонии повседневных вещей, где свет мягко обволакивает каждый предмет" },
  { url: "/artgallery/11.webp", title: "Завтрак в цвете", desc: "Минималистичная композиция акцентирует внимание на текстурах и насыщенности оттенков. Работа выполнена с большой свободой и эмоциональностью, где каждый мазок кисти служит для передачи не только формы, но и самого «вкуса» и настроения этого утра." },
  { url: "/artgallery/12.webp", title: "Разговор с отражением", desc: "Отражение в зеркале выглядит более «реальным» и живым, чем фигура на переднем плане, что создает интересный визуальный парадокс." },
  { url: "/artgallery/14.webp", title: "Серый силуэт", desc: "Цифровая иллюстрация, воплощающая квинтэссенцию готической эстетики «Семейки Аддамс». В центре композиции — знаменитый мрачный особняк" },
  { url: "/artgallery/15.webp", title: "Солнце на столе", desc: "Яркая, радостная композиция, пронизанная светом. Золотой чайник, отражающий окружающие предметы, играет роль «второго солнца» в картине. Контраст между теплым оранжевым цветом фруктов и холодным голубым оттенком ткани придает работе энергичность и гармонию. Это картина-настроение, передающая вкус и тепло неспешного полдня." },
  { url: "/artgallery/16.webp", title: "Белая сова", desc: "На картине изображена величественная полярная сова, застывшая в моменте глубокого спокойствия посреди заснеженной чащи." },
  { url: "/artgallery/18.webp", title: "Небесный уголок Литы", desc: "На картине изображен уютный и загадочный интерьер мансарды, принадлежащей девушке Лите. Сама она, с копной белых волос и в синем школьном костюме, стоит у большого книжного шкафа, завороженно глядя в сторону окна.Книжная иллюстрация" },
  { url: "/artgallery/20.webp", title: "Фиолетовый день", desc: "Кот на кружке кажется покровителем этого спокойного завтрака." },
  { url: "/artgallery/22.webp", title: "Морс", desc: "Маленький белый ковшик на плите с ягодами" },
  { url: "/artgallery/23.webp", title: "Внутри отражения", desc: "Фантазия без границ в одной чашке теплого чая" },
];

PAINTINGS_DATA.forEach((item) => useTexture.preload(item.url));

const Painting = React.memo(({ url, index, activeIndex, zoom }: { url: string; index: number; activeIndex: number, zoom: number }) => {
  const texture = useTexture(url);
  
  useMemo(() => {
    texture.generateMipmaps = false; 
    texture.minFilter = THREE.LinearFilter;
  }, [texture]);

  const group = useRef<THREE.Group>(null!);
  const img = texture.image as HTMLImageElement;
  const aspect = (img?.width && img?.height) ? img.width / img.height : 1;
  const height = 2.5;
  const width = height * aspect;

  useFrame((state, delta) => {
    const targetX = (index - activeIndex) * (width + 1);
    const targetScale = (index === activeIndex ? 1.2 : 0.6) * zoom;
    const targetZ = index === activeIndex ? 0.5 : 0;
    const distance = Math.abs(index - activeIndex);

    if (distance > 1.5) {
      group.current.position.set(targetX, 0, targetZ);
      group.current.scale.setScalar(targetScale);
    } else {
      group.current.position.lerp(vec.set(targetX, 0, targetZ), delta * 8);
      group.current.scale.lerp(scaleVec.setScalar(targetScale), delta * 8);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[width + 0.15, height + 0.15]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
});

Painting.displayName = 'Painting';

export default function ModernGallery() {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f8fbff", position: "relative" }}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <Environment preset="studio" />
        
        {PAINTINGS_DATA.map((item, i) => {
          if (Math.abs(i - index) > 2) return null;
          return (
            <Suspense key={item.url} fallback={null}>
              <Painting url={item.url} index={i} activeIndex={index} zoom={zoom} />
            </Suspense>
          );
        })}
      </Canvas>

      <div style={styles.descriptionBox}>
        <h2 style={{ margin: "0 0 0.3rem 0", color: "#2c3e50", fontSize: "1.2rem" }}>{PAINTINGS_DATA[index].title}</h2>
        <p style={{ margin: 0, color: "#5d6d7e", fontSize: "0.85rem" }}>{PAINTINGS_DATA[index].desc}</p>
      </div>

      <div style={styles.ui}>
        <button onClick={() => setIndex((i) => Math.max(0, i - 1))} style={styles.navBtn}>Назад</button>
        <button onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))} style={styles.zoomBtn}>-</button>
        <div style={styles.indicator}>{index + 1} / {PAINTINGS_DATA.length}</div>
        <button onClick={() => setZoom((z) => Math.min(z + 0.2, 2.2))} style={styles.zoomBtn}>+</button>
        <button onClick={() => setIndex((i) => Math.min(PAINTINGS_DATA.length - 1, i + 1))} style={styles.navBtn}>Вперед</button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  descriptionBox: { position: "absolute", top: "30px", left: "30px", padding: "1.2rem", background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(15px)", borderRadius: "15px", border: "1px solid rgba(180, 210, 255, 0.3)", maxWidth: "250px" },
  ui: { position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "1rem", padding: "0.8rem 1.5rem", background: "rgba(180, 210, 255, 0.3)", backdropFilter: "blur(10px)", borderRadius: "40px", border: "1px solid rgba(255, 255, 255, 0.5)" },
  navBtn: { background: "transparent", border: "none", cursor: "pointer", fontSize: "0.85rem", color: "#2c3e50", fontWeight: 600 },
  zoomBtn: { background: "rgba(255,255,255,0.6)", border: "none", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", fontWeight: "bold" },
  indicator: { fontSize: "0.85rem", color: "#2c3e50", minWidth: "30px", textAlign: "center" }
};