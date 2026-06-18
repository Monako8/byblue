"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { Preloader } from "@/components/Preloader";
import { ProfileHeader } from "@/components/profile-header";
import { TabsNavigation, type TabType } from "@/components/tabs-navigation";
import { PostCard, type PostData, type MediaItem } from "@/components/post-card";
import { ContactsPage } from "@/components/contacts-page";
import { Footer } from "@/components/footer";
import { Lightbox } from "@/components/lightbox";

const posts: PostData[] = [
// В файле page.tsx
{
  id: "pinned",
  author: "Celestinablue",
  avatar: "/images/avatars.webp",
  time: "закреплено",
  pinned: true,
  headerImage: "/textglav/1.webp",
  text: "ЧТО Я ДЕЛАЮ:",
  services: [
    { icon: "/smiles/2.webp", title: "Иллюстрация", description: "— персонажи, обложки, арты для соцсетей" },
    { icon: "/smiles/3.webp", title: "Дизайн", description: "— логотипы, фирменный стиль, упаковка" },
    { icon: "/smiles/1.webp", title: "Web", description: "— лендинги, сайты-портфолио, UI/UX" },
    { icon: "/smiles/4.webp", title: "Концепт-арт", description: "— персонажи для игр, окружение" },
    { icon: "/smiles/5.webp", title: "Время работы", description: "— пн-сб: 09:00 - 20:00 (МСК)" },
    { icon: "/smiles/6.webp", title: "Скорость ответа", description: "— в течение 1 часа" },
  ],
  footerText: "Для заказа пишите в форму внизу страницы 💙",
  likes: 567,
  comments: 89,
  reposts: 45,
},
{
  id: "pinned-1",
  author: "Celestinablue",
  avatar: "/images/avatars.webp",
  time: "1 дн.",
  category: "art",
  headerImage: "/textglav/2.webp",

  // Добавляем массив tools, чтобы код увидел, что нужно нарисовать кнопки
  tools: ["Adobe Photoshop", "Adobe Illustrator", "Go Paint", "Adobe InDisign", "Pixso", "Blender", "Visual Studio Code", "Procreate", "FontLab 8", "Figma"],
  text: "",
  likes: 342,
  comments: 67,
  reposts: 25,
},
  {
    id: "art-1",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "1 дн.",
    category: "art",
    headerImage: "/textglav/3.webp",
    text: "Процесс отрисовки персонажа\n\n1. Скетчи и поиск формы\n2. ЧБ\n3. Цвет \n4. Финализация",
    media: [
      { src: "/images/charactersone.webp", type: "image" },
      { src: "/images/characterstwo.webp", type: "image" },
      { src: "/images/charactersthree.webp", type: "image" },
      { src: "/images/charactersfore.webp", type: "image" },
    ],
    likes: 342,
    comments: 67,
    reposts: 25,
  },
  {
    id: "design-1",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "2 дн.",
    category: "design",
    text: "",
    media: [
      { src: "/images/1.webp", type: "image" },
      { src: "/images/2.webp", type: "image" },
      { src: "/images/3.webp", type: "image" },
      { src: "/images/4.webp", type: "image" },
    ],
    likes: 342,
    comments: 67,
    reposts: 25,
  },
  {
    id: "art-2",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "4 дн.",
    category: "art",
    headerImage: "/textglav/4.webp",
    text: "Процесс работы над портретом в 4 этапа\n\n1. Фотография\n2. Быстрый набросок\n3. Свет и тень \n4. Финализация,детали",
    media: [
      { src: "/images/ref.webp", type: "image" },
      { src: "/images/refone.webp", type: "image" },
      { src: "/images/reftwo.webp", type: "image" },
      { src: "/images/reftree.webp", type: "image" },
    ],
    likes: 700,
    comments: 50,
    reposts: 19,
  },
  {
    id: "art-3",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "6 дн.",
    category: "art",
    headerImage: "/textglav/5.webp",
    text: "Услуга: Мемы и персонажи\nСоздаю уникальных персонажей для мемов, стикеров и контента. Вот примеры моих работ:",
    media: [
      { src: "/images/memc.webp", type: "image" },
      { src: "/images/memf.webp", type: "image" },
      { src: "/images/memone.webp", type: "image" },
      { src: "/images/memp.webp", type: "image" },
      { src: "/images/mems.webp", type: "image" },
      { src: "/images/memsev.webp", type: "image" },
      { src: "/images/memt.webp", type: "image" },
      { src: "/images/memtr.webp", type: "image" },
    ],
    likes: 960,
    comments: 50,
    reposts: 20,
  },
  {
    id: "reviews",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "6 дн.",
     headerImage: "/textglav/7.webp",
    text: `💙💙💙💙💙 "Кристина справилась на отлично, сразу поняли друг друга, заказ выполнен оперативно, все супер, рекомендую!" — @Katrin_Lisica\n\n💙💙💙💙💙 "Большое спасибо, получился очень крутой аватар из детского рисунка, все очень очень рады)))" — @AlexanderFin\n\n💙💙💙💙💙 "Отличная работа! Сложный проект выполнен точно по ТЗ и в короткий срок. Качественные исходники, продуманные варианты." — @andbea713\n\n💙💙💙💙💙 "Обратился за бейджами и остался в восторге! Как будто вытащила идею из моей головы. Спасибо за оперативность!" — @berkovvadim\n\n💙💙💙💙💙 "Весь заказ был сделан на высшем уровне! Правки над персонажем были сделаны очень быстро, пришли к лучшему решению." — @DyxDoma\n\n💙💙💙💙💙 "Всё качественно. При необходимости можно внести правки, пока итоговый продукт вас не устроит. Рекомендую! ⚡" — @Black_Birzha\n\n💙💙💙💙💙 "Заказывали 3D анимационные ролики наших купелей. Исполнительницу отобрали на основе конкурса. Она выполнила все наши пожелания по проекту и выпустила ролики ранее установленных сроков." — @Дмитрий\n\nБлагодарю всех за доверие! Посмотреть <a href="https://kwork.ru/user/Celestinablue" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: underline; font-weight: 600;">все отзывы</a> можно на бирже. 💙`,
    media: [
      { src: "/images/a.webp", type: "image" },
      { src: "/images/f.webp", type: "image" },
      { src: "/images/d.webp", type: "image" },
      { src: "/images/c.webp", type: "image" },
      { src: "/images/b.webp", type: "image" },
      { src: "/images/I.webp", type: "image" },
      { src: "/images/g.webp", type: "image" },
    ],
    likes: 445,
    comments: 78,
    reposts: 34,
  },
  {
    id: "faq",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "12.05.2026",
    headerImage: "/textglav/6.webp",
    text: "💭 NFT коллекции?\n→ Создаю базу и атрибуты. Все слои передаются в идеальном порядке для генерации.\n\n💭 Ваш стиль?\n→ Яркий 2D арт, полуреализм и стилизация. От аватарок до игровых локаций.\n\n💭 Дизайн сайта?\n→ Уникальные иллюстрации и интерфейсы, отрисованные вручную под проект.\n\n💭 Какие сроки?\n→ Скетч 1-2 дня. Финальный арт 3-7 дней. Сайт — от 15 рабочих дней.\n\n💭 Про правки\n→ На этапе скетча — безлимит. После покраса — до 3 небольших правок бесплатно.\n\n💭 Об оплате\n→ Оплата 50%. До начала эскиза.\n\n💭 Какие форматы?\n→ Исходники PSD, Ai по слоям и другие необходимые, a также финалы в PNG, JPG и SVG для веба.\n\n💭 Срочный заказ?\n→ Да, ускоренная работа возможна c доплатой 30-50% при наличии окна.\n\n💭 Права на арт?\n→ Вы получаете полные коммерческие права на использование арта.\n\nОстались вопросы? Пишите в личные сообщения! 📧",
    likes: 234,
    comments: 45,
    reposts: 12,
  },
  {
    id: "faq-1",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "12.05.2026",
    headerImage: "/textglav/8.webp",
    text: "📌 Что обязательно стоит прописать в ТЗ на разработку персонажа?\nЧтобы результат совпал с вашей задумкой на все 100%, а процесс был быстрым и комфортным, я подготовила наглядную шпаргалку-картинку!\nС ней составить ТЗ (техническое задание) будет проще простого.",
    media: [{ src: "/images/tz.webp", type: "image" }],
    likes: 5499,
    comments: 300,
    reposts: 60,
  },
  {
    id: "animation-1",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "12.05.2026",
    category: "animation",
    headerImage: "/textglav/9.webp",
    text: "Процесс включает разработку ключевых кадров, работу с таймингом и экспорт в различные форматы для web и соцсетей.\n\nНажмите для просмотра",
    media: [
      { src: "/animation/1.gif", preview: "/prewi/1.webp", type: "gif" },
      { src: "/animation/8.gif", preview: "/prewi/7.webp", type: "gif" },
      { src: "/animation/5.gif", preview: "/prewi/4.webp", type: "gif" },
      { src: "/animation/6.gif", preview: "/prewi/5.webp", type: "gif" },
      { src: "/animation/11.gif", preview: "/prewi/8.webp", type: "gif" },
      { src: "/animation/12.gif", preview: "/prewi/10.webp", type: "gif" },
      { src: "/animation/7.gif", preview: "/prewi/6.webp", type: "gif" },
      { src: "/animation/2.gif", preview: "/prewi/2.webp", type: "gif" },
      { src: "/animation/4.gif", preview: "/prewi/3.webp", type: "gif" },
    ],
    likes: 567,
    comments: 89,
    reposts: 45,
  },
  {
    id: "design-2",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "10.05.2026",
    category: "design",
    headerImage: "/textglav/10.webp",
    text: "Дизайн иконок для мобильных приложений\n\n* разработка по сетке\n* чб логотип\n* любой логотип можно купить",
    media: [
      { src: "/images/final.webp", type: "image" },
      { src: "/images/coffee.webp", type: "image" },
      { src: "/images/vverh.webp", type: "image" },
      { src: "/images/flowers.webp", type: "image" },
      { src: "/images/panter.webp", type: "image" },
      { src: "/images/wals.webp", type: "image" },
      { src: "/images/eat.webp", type: "image" },
      { src: "/images/messege.webp", type: "image" },
      { src: "/images/pet.webp", type: "image" },
      { src: "/images/news.webp", type: "image" },
    ],
    likes: 213,
    comments: 119,
    reposts: 2,
  },
  {
    id: "art-4",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "09.05.2026",
    category: "art",
    headerImage: "/textglav/11.webp",
    text: "Цифровые иллюстрации на любую тему.",
    media: [
      { src: "/images/assa.webp", type: "image" },
      { src: "/images/fruit.webp", type: "image" },
      { src: "/images/kitchen.webp", type: "image" },
      { src: "/images/krisha.webp", type: "image" },
      { src: "/images/natur.webp", type: "image" },
      { src: "/images/snow.webp", type: "image" },
      { src: "/images/wens.webp", type: "image" },
    ],
    likes: 156,
    comments: 45,
    reposts: 8,
  },
  {
    id: "art-5",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "09.05.2026",
    category: "art",
    headerImage: "/textglav/11.webp",
    text: "Цифровые иллюстрации на любую тему №2.",
    media: [
      { src: "/images/dfgfh.webp", type: "image" },
      { src: "/images/dsfdsf.webp", type: "image" },
      { src: "/images/ewrwer.webp", type: "image" },
      { src: "/images/gdrgrd.webp", type: "image" },
      { src: "/images/hghfg.webp", type: "image" },
      { src: "/images/rewrwee.webp", type: "image" },
      { src: "/images/rrdrg.webp", type: "image" },
      { src: "/images/rtgt.webp", type: "image" },
      { src: "/images/seresr.webp", type: "image" },
      { src: "/images/treter.webp", type: "image" },
      { src: "/images/weqe.webp", type: "image" },
    ],
    likes: 590,
    comments: 70,
    reposts: 50,
  },
  {
    id: "art-6",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "08.05.2026",
    category: "art",
    headerImage: "/textglav/4.webp",
    text: "Цифровые портреты №2.",
    media: [
      { src: "/images/fdsf.webp", type: "image" },
      { src: "/images/fdsg.webp", type: "image" },
      { src: "/images/htht.webp", type: "image" },
      { src: "/images/ret.webp", type: "image" },
      { src: "/images/rwer.webp", type: "image" },
      { src: "/images/sdfds.webp", type: "image" },
      { src: "/images/ser.webp", type: "image" },
      { src: "/images/sere.webp", type: "image" },
      { src: "/images/sr.webp", type: "image" },
      { src: "/images/vxdf.webp", type: "image" },
    ],
    likes: 1770,
    comments: 45,
    reposts: 90,
  },
  {
    id: "web-1",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "08.05.2026",
    category: "web",
    headerImage: "/textglav/12.webp",
    text: "Минималистичный дизайн лендинга для компании POLARSPA.",
    media: [
      { src: "/images/qone.webp", type: "image" },
      { src: "/images/qtwo.webp", type: "image" },
      { src: "/images/qtree.webp", type: "image" },
      { src: "/images/qfore.webp", type: "image" },
      { src: "/images/qfive.webp", type: "image" },
      { src: "/images/qzero.webp", type: "image" },
    ],
    likes: 89,
    comments: 23,
    reposts: 12,
  },
  {
    id: "web-2",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "08.05.2026",
    category: "web",
    headerImage: "/textglav/13.webp",
    text: "Презентационный сайт художника-дизайнера BABYBLUE (черновик)",
    media: [
      { src: "/images/bbone.webp", type: "image" },
      { src: "/images/bbtw.webp", type: "image" },
      { src: "/images/bbt.webp", type: "image" },
      { src: "/images/bbfore.webp", type: "image" },
      { src: "/images/bbfive.webp", type: "image" },
      { src: "/images/bbsix.webp", type: "image" },
    ],
    likes: 990,
    comments: 45,
    reposts: 12,
  },
  {
    id: "design-3",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "08.05.2026",
    category: "design",
    headerImage: "/textglav/14.webp",
    text: "Услуга: Стикеры\nСоздаю стикеры для любых соц.сетей. Вот примеры моих работ:",
    media: [
      { src: "/images/Stikone.webp", type: "image" },
      { src: "/images/stiktwo.webp", type: "image" },
      { src: "/images/stiktr.webp", type: "image" },
      { src: "/images/stikf.webp", type: "image" },
      { src: "/images/stikfive.webp", type: "image" },
      { src: "/images/stiksix.webp", type: "image" },
      { src: "/images/stikers.webp", type: "image" },
    ],
    likes: 960,
    comments: 50,
    reposts: 20,
  },
  {
    id: "design-4",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "07.05.2026",
    category: "design",
    headerImage: "/textglav/15.webp",
    text: "Услуга: Панели для twitch-канала\nСоздаю панели для любых соц.сетей. Вот примеры моих работ:",
    media: [
      { src: "/images/CVAYVAYSYCS.webp", type: "image" },
      { src: "/images/CYMSMCMSCSYCS.webp", type: "image" },
      { src: "/images/CYSYCSAVYAVYA.webp", type: "image" },
      { src: "/images/CYSYCSMMSCMS.webp", type: "image" },
      { src: "/images/CYSYCSSCYSCY.webp", type: "image" },
      { src: "/images/CYSYCSYCSYCS.webp", type: "image" },
    ],
    likes: 990,
    comments: 45,
    reposts: 12,
  },
  {
    id: "design-5",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "29.04.2026",
    category: "design",
    headerImage: "/textglav/16.webp",
    text: "Календарь для киберспортивной команды PAFOX",
    media: [
      { src: "/images/odin.webp", type: "image" },
      { src: "/images/dva.webp", type: "image" },
      { src: "/images/tri.webp", type: "image" },
      { src: "/images/chetiri.webp", type: "image" },
      { src: "/images/pyat.webp", type: "image" },
      { src: "/images/shest.webp", type: "image" },
      { src: "/images/sem.webp", type: "image" },
      { src: "/images/vosem.webp", type: "image" },
      { src: "/images/devyat.webp", type: "image" },
      { src: "/images/desyat.webp", type: "image" },
      { src: "/images/odinasat.webp", type: "image" },
      { src: "/images/dvenesad.webp", type: "image" },
      { src: "/images/trinasad.webp", type: "image" },
      { src: "/images/chetirnasat.webp", type: "image" },
      { src: "/images/pyatnasat.webp", type: "image" },
      { src: "/images/shestasat.webp", type: "image" },
      { src: "/images/semtasat.webp", type: "image" },
      { src: "/images/vosemnasat.webp", type: "image" },
      { src: "/images/devyatnasat.webp", type: "image" },
      { src: "/images/dvatst.webp", type: "image" },
      { src: "/images/dvatsatodin.webp", type: "image" },
      { src: "/images/dvatsatdva.webp", type: "image" },
      { src: "/images/dvatsattri.webp", type: "image" },
      { src: "/images/dvatsatchetiri.webp", type: "image" },
      { src: "/images/dvstsatpyat.webp", type: "image" },
    ],
    likes: 990,
    comments: 45,
    reposts: 12,
  },
  {
    id: "art-7",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "22.04.2026",
    category: "art",
    headerImage: "/textglav/17.webp",
    text: "NFT - коллекции, генеративное искусство.",
    media: [
      { src: "/images/nftone.webp", type: "image" },
      { src: "/images/nfttwo.webp", type: "image" },
      { src: "/images/nftthre.webp", type: "image" },
      { src: "/images/nftfore.webp", type: "image" },
      { src: "/images/nftfive.webp", type: "image" },
      { src: "/images/nftsix.webp", type: "image" },
      { src: "/images/nftseven.webp", type: "image" },
      { src: "/images/nfteit.webp", type: "image" },
      { src: "/images/nftten.webp", type: "image" },
      { src: "/images/nfteleven.webp", type: "image" },
      { src: "/images/nftdvenedsat.webp", type: "image" },
      { src: "/images/nfttrinasat.webp", type: "image" },
      { src: "/images/nftchetirnasat.webp", type: "image" },
      { src: "/images/nftpyatnasat.webp", type: "image" },
    ],
    likes: 509,
    comments: 90,
    reposts: 44,
  },
  {
    id: "art-8",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "22.04.2026",
    category: "art",
    headerImage: "/textglav/18.webp",
    text: "Концепт-арт персонажа в разных ракурсах.",
    media: [
      { src: "/consept/1.webp", type: "image" },
      { src: "/consept/2.webp", type: "image" },
      { src: "/consept/3.webp", type: "image" },
      { src: "/consept/4.webp", type: "image" },
      { src: "/consept/5.webp", type: "image" },
      { src: "/consept/6.webp", type: "image" },
      { src: "/consept/7.webp", type: "image" },
      { src: "/consept/8.webp", type: "image" },
      { src: "/consept/9.webp", type: "image" },
    ],
    likes: 694,
    comments: 40,
    reposts: 15,
  },
  {
    id: "web-3",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "08.05.2026",
    category: "web",
    headerImage: "/textglav/20.webp",
    text: "Услуга: Комплексная разработка айдентики и веб-дизайна (Brand Design / UX/UI дизайн)\nДля проекта «Стома-Сервис»: Ребрендинг и разработка дизайн-системы сайта.",
    media: [
      { src: "/stoma/1.webp", type: "image" },
      { src: "/stoma/2.webp", type: "image" },
    ],
    likes: 990,
    comments: 45,
    reposts: 12,
  },
  {
    id: "design-6",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "08.05.2026",
    category: "design",
    headerImage: "/textglav/19.webp",
    text: "Услуга: Разработка айдентики и мерча для проекта «ИграБезНенависти». (Brand Design)",
    media: [
      { src: "/gamenot/1.webp", type: "image" },
      { src: "/gamenot/2.webp", type: "image" },
    ],
    likes: 990,
    comments: 45,
    reposts: 12,
  },
  {
    id: "art-9",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "22.04.2026",
    category: "art",
    headerImage: "/textglav/18.webp",
    text: "Услуга: Концепт-арт.",
    media: [
      { src: "/consepttwo/1.webp", type: "image" },
      { src: "/consepttwo/2.webp", type: "image" },
      { src: "/consepttwo/3.webp", type: "image" },
      { src: "/consepttwo/4.webp", type: "image" },
      { src: "/consepttwo/5.webp", type: "image" },
      { src: "/consepttwo/6.webp", type: "image" },
      { src: "/consepttwo/7.webp", type: "image" },
      { src: "/consepttwo/8.webp", type: "image" },
      { src: "/consepttwo/9.webp", type: "image" },
      { src: "/consepttwo/10.webp", type: "image" },
      { src: "/consepttwo/11.webp", type: "image" },
      { src: "/consepttwo/12.webp", type: "image" },
    ],
    likes: 694,
    comments: 40,
    reposts: 15,
  },
  {
    id: "design-7",
    author: "Celestinablue",
    avatar: "/images/avatars.webp",
    time: "08.05.2026",
    category: "design",
        headerImage: "/textglav/18.webp",
    text: "Услуга: Дизайн метафорических карт (МАК)",
    media: [
      { src: "/card/1.webp", type: "image" },
      { src: "/card/2.webp", type: "image" },
      { src: "/card/3.webp", type: "image" },
      { src: "/card/4.webp", type: "image" },
      { src: "/card/5.webp", type: "image" },
      { src: "/card/6.webp", type: "image" },
      { src: "/card/7.webp", type: "image" },
      { src: "/card/8.webp", type: "image" },
    ],
    likes: 990,
    comments: 45,
    reposts: 12,
  },
]

export default function CelestinabluePage() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [visibleCount, setVisibleCount] = useState(5);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
    setVisibleCount(5);
    window.scrollTo(0, 0);
  }, []);

  // ИСПРАВЛЕНИЕ: принимаем index из PostCard
  const handleMediaClick = useCallback((src: string, allMedia: MediaItem[], index: number) => {
    setLightboxMedia(allMedia);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const filteredPosts = useMemo(() => {
    return activeTab === "home" || activeTab === "contacts"
      ? posts
      : posts.filter(post => post.category === activeTab);
  }, [activeTab]);

  return (
    <div className="max-w-[800px] mx-auto border-x border-border min-h-screen bg-background">
      <Preloader />
      
      <div className="p-4 pb-0">
        <img 
          src="/images/banner.webp" 
          alt="Celestinablue banner" 
          className="w-full h-auto rounded-2xl shadow-xl border border-black" 
          loading="eager" 
        />
      </div>

      <ProfileHeader />
      <TabsNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <main>
        {activeTab === "contacts" ? (
          <ContactsPage />
        ) : (
          <div>
            {filteredPosts.slice(0, visibleCount).map(post => (
              <PostCard
                key={post.id}
                post={post}
                onMediaClick={handleMediaClick}
              />
            ))}
            
            {visibleCount < filteredPosts.length && (
              <div className="p-6 text-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 5)} 
                  className="px-4 py-2 bg-[#93C3EF] text-white rounded-full hover:bg-[#7db1e8] transition" 
                >
                  Загрузить еще
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer onNavigate={handleTabChange} />

      <Lightbox 
        media={lightboxMedia} 
        currentIndex={lightboxIndex} 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        // ИСПРАВЛЕНИЕ: используем функциональное обновление состояния (prev), 
        // чтобы избежать проблем с замыканием и устаревшими данными
        onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxMedia.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + lightboxMedia.length) % lightboxMedia.length)}
      />
    </div>
  );
}