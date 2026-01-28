/* --- Lecteur (niveau 2 : 2 pages superposées) --- */
.reader{
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 18px;
}

.topbar{
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  align-items: center;
  z-index: 1000;
}

.counter{
  background: rgba(0,0,0,0.55);
  color: #fff;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 14px;
}

.fs{
  border: none;
  background: rgba(0,0,0,0.55);
  color: #fff;
  padding: 8px 10px;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
}

.home{
  position: fixed;
  top: 12px;
  left: 12px;
  background: rgba(0,0,0,0.55);
  color: #fff;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 999px;
  z-index: 1001;
}

/* Hint visible au début, puis on le fera disparaître en JS */
#hint{
  position: fixed;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.55);
  color: rgba(255,255,255,0.92);
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  z-index: 1000;
  pointer-events: none;
  transition: opacity 0.35s ease;
}

/* Le "livre" */
.book{
  position: relative;
  width: min(92vw, 980px);
  height: min(92vh, 720px);
  perspective: 1400px;              /* indispensable */
  perspective-origin: center;
}

/* Les pages */
.page{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  background: #111;
  backface-visibility: hidden;
}

/* dessous : page cible */
.under{
  z-index: 1;
  filter: brightness(0.98);
}

/* dessus : page qui tourne */
.over{
  z-index: 2;
  transform-origin: left center;
  box-shadow: 0 18px 45px rgba(0,0,0,0.45);
}

/* animation page suivante */
.over.turn-next{
  transition: transform 0.55s ease, box-shadow 0.55s ease, opacity 0.45s ease;
  transform: translateX(-55px) rotateY(-55deg);
  box-shadow: 30px 0 55px rgba(0,0,0,0.55);
  opacity: 0.25;
}

/* animation page précédente (tourne dans l'autre sens) */
.over.turn-prev{
  transition: transform 0.55s ease, box-shadow 0.55s ease, opacity 0.45s ease;
  transform-origin: right center;
  transform: translateX(55px) rotateY(55deg);
  box-shadow: -30px 0 55px rgba(0,0,0,0.55);
  opacity: 0.25;
}

