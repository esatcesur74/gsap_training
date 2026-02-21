import imgA from "../assets/a.jpeg";
import imgB from "../assets/b.jpeg";
import imgC from "../assets/c.jpeg";
import imgD from "../assets/d.jpeg";
import imgE from "../assets/e.jpeg";
import imgF from "../assets/f.jpeg";
import imgG from "../assets/g.jpeg";
import imgH from "../assets/h.jpeg";
import imgJ from "../assets/j.jpeg";
import imgK from "../assets/k.jpeg";
import imgL from "../assets/l.jpeg";
import imgM from "../assets/m.jpeg";
import imgO from "../assets/o.jpeg";
import imgP from "../assets/p.jpeg";
import imgQ from "../assets/q.jpeg";
import imgR from "../assets/r.jpeg";
import imgS from "../assets/s.jpeg";
import imgT from "../assets/t.jpeg";
import imgU from "../assets/u.jpeg";
import imgV from "../assets/v.jpeg";
import imgX from "../assets/x.jpeg";
import imgZ from "../assets/z.jpeg";
import imgOE from "../assets/ø.jpeg";
import imgAA from "../assets/aa.jpeg";
import imgAB from "../assets/ab.jpeg";
import imgAC from "../assets/ac.jpeg";
import imgAD from "../assets/ad.jpeg";

// === PHOTO METADATA ===
// Each photo has its source image and info shown on hover
export const photoMeta = {
  a: { src: imgA, date: "20 may 2025", shotBy: "Akif Akgun", location: "Oppsal / Oslo", coords: null, model: "Ali Azzaro", campaign: "Tugra Caps / 2025" },
  b: { src: imgB, date: "16 january 2026", shotBy: "Life Jumanson", location: "Majorstuen / Oslo", coords: "59.927481, 10.719930", model: "Rayan", campaign: "Comme De Immigres" },
  c: { src: imgC, date: "18 january 2026", shotBy: "Bashir Mohammed", location: "Tøyen / Oslo", coords: "59.918239, 10.773224", model: "Richard", campaign: "Comme des Immigres" },
  d: { src: imgD, date: "8 January 2026", shotBy: "Akif Akgun", location: "Tøyen / Oslo", coords: "59.918239, 10.773224", model: "Babou", campaign: "Hooligan Sweaters" },
  e: { src: imgE, date: "06 july 2026", shotBy: "Siar Esat Cesur", location: "Nice / France", coords: null, model: "Melih", campaign: null },
  f: { src: imgF, date: null, shotBy: "Akif Akgun", location: "Amsterdam / Netherlands", coords: null, model: "Esat", campaign: "Eu Tee" },
  g: { src: imgG, date: null, shotBy: "Ali Ezzawi", location: "Grønland / Oslo", coords: null, model: "Ekip", campaign: "Ekip Eu Tee" },
  h: { src: imgH, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  j: { src: imgJ, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  k: { src: imgK, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  l: { src: imgL, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  m: { src: imgM, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  o: { src: imgO, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  p: { src: imgP, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  q: { src: imgQ, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  r: { src: imgR, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  s: { src: imgS, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  t: { src: imgT, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  u: { src: imgU, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  v: { src: imgV, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  x: { src: imgX, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  z: { src: imgZ, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  oe: { src: imgOE, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  aa: { src: imgAA, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  ab: { src: imgAB, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  ac: { src: imgAC, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
  ad: { src: imgAD, date: null, shotBy: null, location: null, coords: null, model: null, campaign: null },
};

// === GALLERY PAGES ===
// Each page is one full-screen section
// position: where the photo sits (% of the viewport)
// width: how wide the photo is
// depth: 0 = far away (subtle movement), 1 = close (strong movement)
export const galleryPages = [
  {
    id: 1,
    photos: [
      { photoId: "a", position: { top: "5%", left: "8%" }, width: "28vw", depth: 0.9 },
      { photoId: "b", position: { top: "15%", left: "62%" }, width: "22vw", depth: 0.3 },
      { photoId: "c", position: { top: "45%", left: "35%" }, width: "26vw", depth: 0.6 },
      { photoId: "d", position: { top: "65%", left: "5%" }, width: "20vw", depth: 0.2 },
      { photoId: "e", position: { top: "55%", left: "72%" }, width: "24vw", depth: 0.7 },
    ],
  },
  {
    id: 2,
    photos: [
      { photoId: "f", position: { top: "8%", left: "55%" }, width: "25vw", depth: 0.8 },
      { photoId: "g", position: { top: "20%", left: "5%" }, width: "23vw", depth: 0.4 },
      { photoId: "h", position: { top: "42%", left: "40%" }, width: "27vw", depth: 0.7 },
      { photoId: "j", position: { top: "68%", left: "15%" }, width: "21vw", depth: 0.2 },
      { photoId: "k", position: { top: "52%", left: "72%" }, width: "22vw", depth: 0.5 },
    ],
  },
  {
    id: 3,
    photos: [
      { photoId: "l", position: { top: "10%", left: "12%" }, width: "24vw", depth: 0.6 },
      { photoId: "m", position: { top: "5%", left: "65%" }, width: "26vw", depth: 0.9 },
      { photoId: "o", position: { top: "48%", left: "30%" }, width: "22vw", depth: 0.3 },
      { photoId: "p", position: { top: "60%", left: "68%" }, width: "20vw", depth: 0.8 },
      { photoId: "q", position: { top: "70%", left: "8%" }, width: "25vw", depth: 0.4 },
    ],
  },
  {
    id: 4,
    photos: [
      { photoId: "r", position: { top: "8%", left: "45%" }, width: "27vw", depth: 0.7 },
      { photoId: "s", position: { top: "18%", left: "3%" }, width: "22vw", depth: 0.3 },
      { photoId: "t", position: { top: "45%", left: "60%" }, width: "24vw", depth: 0.9 },
      { photoId: "u", position: { top: "55%", left: "10%" }, width: "26vw", depth: 0.5 },
      { photoId: "v", position: { top: "72%", left: "50%" }, width: "21vw", depth: 0.2 },
    ],
  },
  {
    id: 5,
    photos: [
      { photoId: "x", position: { top: "5%", left: "10%" }, width: "25vw", depth: 0.8 },
      { photoId: "z", position: { top: "12%", left: "60%" }, width: "23vw", depth: 0.4 },
      { photoId: "oe", position: { top: "40%", left: "35%" }, width: "28vw", depth: 0.6 },
      { photoId: "aa", position: { top: "62%", left: "65%" }, width: "22vw", depth: 0.9 },
      { photoId: "ab", position: { top: "68%", left: "5%" }, width: "24vw", depth: 0.3 },
    ],
  },
  {
    id: 6,
    photos: [
      { photoId: "ac", position: { top: "8%", left: "50%" }, width: "26vw", depth: 0.7 },
      { photoId: "ad", position: { top: "20%", left: "5%" }, width: "24vw", depth: 0.5 },
    ],
  },
];
