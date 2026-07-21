"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {imageSource,imageAlt} from "../lib/images";

const LENS_SIZE = 210;
const MAGNIFICATION = 2.75;

export default function ComicGallery({title,images=[]}){
  const clean=useMemo(()=>images.filter(Boolean),[images]);
  const [active,setActive]=useState(0);
  const [zoom,setZoom]=useState(null);
  const [open,setOpen]=useState(false);
  const [scale,setScale]=useState(1);
  const touchStart=useRef(null);
  const mainRef=useRef(null);
  const imageRef=useRef(null);

  const image=clean[active];
  const display=imageSource(image,"display");
  const full=imageSource(image,"full");
  const previous=()=>{setActive(v=>(v-1+clean.length)%clean.length);setScale(1);setZoom(null)};
  const next=()=>{setActive(v=>(v+1)%clean.length);setScale(1);setZoom(null)};

  useEffect(()=>{
    const fn=e=>{
      if(!open)return;
      if(e.key==="Escape")setOpen(false);
      if(e.key==="ArrowRight")next();
      if(e.key==="ArrowLeft")previous();
      if(e.key==="+")setScale(v=>Math.min(3,v+.25));
      if(e.key==="-")setScale(v=>Math.max(1,v-.25));
    };
    window.addEventListener("keydown",fn);
    return()=>window.removeEventListener("keydown",fn);
  },[open,clean.length]);

  if(!display)return <div className="detail-image-placeholder"><strong>{title}</strong><span>Photos coming soon</span></div>;

  function move(e){
    const container=mainRef.current?.getBoundingClientRect();
    const rendered=imageRef.current?.getBoundingClientRect();
    if(!container||!rendered)return;

    const localX=e.clientX-rendered.left;
    const localY=e.clientY-rendered.top;

    if(localX<0||localY<0||localX>rendered.width||localY>rendered.height){
      setZoom(null);
      return;
    }

    const lensLeft=rendered.left-container.left+localX;
    const lensTop=rendered.top-container.top+localY;
    const backgroundWidth=rendered.width*MAGNIFICATION;
    const backgroundHeight=rendered.height*MAGNIFICATION;
    const backgroundX=-(localX*MAGNIFICATION-LENS_SIZE/2);
    const backgroundY=-(localY*MAGNIFICATION-LENS_SIZE/2);

    setZoom({
      left:lensLeft,
      top:lensTop,
      backgroundWidth,
      backgroundHeight,
      backgroundX,
      backgroundY
    });
  }

  function startTouch(e){touchStart.current=e.touches?.[0]?.clientX??null}
  function endTouch(e){
    if(touchStart.current===null||clean.length<2)return;
    const end=e.changedTouches?.[0]?.clientX??touchStart.current;
    const delta=end-touchStart.current;
    if(Math.abs(delta)>45){delta>0?previous():next()}
    touchStart.current=null;
  }

  return <div className="comic-gallery">
    <button ref={mainRef} className="gallery-main" onMouseMove={move} onMouseLeave={()=>setZoom(null)} onClick={()=>setOpen(true)} onTouchStart={startTouch} onTouchEnd={endTouch}>
      <img ref={imageRef} src={display} alt={imageAlt(image,`${title} image ${active+1}`)}/>
      <span className="zoom-hint">Hover to magnify · Click for full screen</span>
      {zoom&&<span className="magnifier-lens" style={{
        left:`${zoom.left}px`,
        top:`${zoom.top}px`,
        backgroundImage:`url(${full})`,
        backgroundSize:`${zoom.backgroundWidth}px ${zoom.backgroundHeight}px`,
        backgroundPosition:`${zoom.backgroundX}px ${zoom.backgroundY}px`
      }}/>} 
    </button>
    {clean.length>1&&<div className="gallery-thumbnails">{clean.map((img,i)=><button key={`${imageSource(img,"thumb")}-${i}`} className={i===active?"active":""} onClick={()=>{setActive(i);setScale(1);setZoom(null)}} aria-label={`View ${title} image ${i+1}`}><img src={imageSource(img,"thumb")} alt=""/></button>)}</div>}
    {open&&<div className="lightbox" onTouchStart={startTouch} onTouchEnd={endTouch}>
      <div className="lightbox-tools"><button onClick={()=>setScale(v=>Math.max(1,v-.25))} aria-label="Zoom out">−</button><span>{Math.round(scale*100)}%</span><button onClick={()=>setScale(v=>Math.min(3,v+.25))} aria-label="Zoom in">+</button><button onClick={()=>setScale(1)}>Reset</button></div>
      <button className="lightbox-close" onClick={()=>setOpen(false)} aria-label="Close full screen viewer">×</button>
      {clean.length>1&&<button className="lightbox-arrow lightbox-prev" onClick={previous} aria-label="Previous image">‹</button>}
      <div className="lightbox-canvas"><img src={full} alt={imageAlt(image,`${title} full-resolution image`)} style={{transform:`scale(${scale})`}}/></div>
      {clean.length>1&&<button className="lightbox-arrow lightbox-next" onClick={next} aria-label="Next image">›</button>}
      <div className="lightbox-caption">Image {active+1} of {clean.length} · Use +/− to inspect details</div>
    </div>}
  </div>
}
