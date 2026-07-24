"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {createPortal} from "react-dom";
import {imageSource,imageAlt} from "../lib/images";

const LENS_SIZE = 210;
const MAGNIFICATION = 2.75;
const DRAG_THRESHOLD = 8;

export default function ComicGallery({title,images=[]}){
  const clean=useMemo(()=>images.filter(Boolean),[images]);
  const [active,setActive]=useState(0);
  const [zoom,setZoom]=useState(null);
  const [open,setOpen]=useState(false);
  const [scale,setScale]=useState(1);
  const [mounted,setMounted]=useState(false);
  const touchStart=useRef(null);
  const pointerState=useRef({active:false,id:null,startX:0,startY:0,moved:false,type:null});
  const suppressClick=useRef(false);
  const mainRef=useRef(null);
  const imageRef=useRef(null);

  const image=clean[active];
  const display=imageSource(image,"display");
  const full=imageSource(image,"full");
  const previous=()=>{setActive(v=>(v-1+clean.length)%clean.length);setScale(1);setZoom(null)};
  const next=()=>{setActive(v=>(v+1)%clean.length);setScale(1);setZoom(null)};

  useEffect(()=>{setMounted(true)},[]);

  useEffect(()=>{
    if(!open)return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=previousOverflow};
  },[open]);

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

  function updateMagnifier(clientX,clientY){
    const container=mainRef.current?.getBoundingClientRect();
    const rendered=imageRef.current?.getBoundingClientRect();
    if(!container||!rendered)return;

    const localX=clientX-rendered.left;
    const localY=clientY-rendered.top;

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

  function handlePointerEnter(e){
    if(e.pointerType==="mouse")updateMagnifier(e.clientX,e.clientY);
  }

  function handlePointerDown(e){
    if(e.pointerType==="mouse")return;
    pointerState.current={
      active:true,
      id:e.pointerId,
      startX:e.clientX,
      startY:e.clientY,
      moved:false,
      type:e.pointerType
    };
    suppressClick.current=false;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateMagnifier(e.clientX,e.clientY);
    e.preventDefault();
  }

  function handlePointerMove(e){
    if(e.pointerType==="mouse"){
      updateMagnifier(e.clientX,e.clientY);
      return;
    }

    const state=pointerState.current;
    if(!state.active||state.id!==e.pointerId)return;

    const distance=Math.hypot(e.clientX-state.startX,e.clientY-state.startY);
    if(distance>DRAG_THRESHOLD){
      state.moved=true;
      suppressClick.current=true;
    }

    updateMagnifier(e.clientX,e.clientY);
    e.preventDefault();
  }

  function finishPointer(e){
    const state=pointerState.current;
    if(!state.active||state.id!==e.pointerId)return;

    if(state.moved)suppressClick.current=true;
    pointerState.current={active:false,id:null,startX:0,startY:0,moved:false,type:null};
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    setZoom(null);
  }

  function handleMainClick(e){
    if(suppressClick.current){
      suppressClick.current=false;
      e.preventDefault();
      return;
    }
    setOpen(true);
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
    <button
      ref={mainRef}
      className="gallery-main"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={finishPointer}
      onPointerCancel={finishPointer}
      onPointerLeave={e=>{if(e.pointerType==="mouse")setZoom(null)}}
      onClick={handleMainClick}
      aria-label={`Inspect ${title}. Hover with a mouse or press and drag on a touch screen to magnify. Tap to open full screen.`}
    >
      <img ref={imageRef} src={display} alt={imageAlt(image,`${title} image ${active+1}`)} draggable="false"/>
      {zoom&&<span className="magnifier-lens" style={{
        left:`${zoom.left}px`,
        top:`${zoom.top}px`,
        backgroundImage:`url(${full})`,
        backgroundSize:`${zoom.backgroundWidth}px ${zoom.backgroundHeight}px`,
        backgroundPosition:`${zoom.backgroundX}px ${zoom.backgroundY}px`
      }}/>} 
    </button>
    {clean.length>1&&<div className="gallery-thumbnails">{clean.map((img,i)=><button key={`${imageSource(img,"thumb")}-${i}`} className={i===active?"active":""} onClick={()=>{setActive(i);setScale(1);setZoom(null)}} aria-label={`View ${title} image ${i+1}`}><img src={imageSource(img,"thumb")} alt=""/></button>)}</div>}
    {mounted&&open&&createPortal(
      <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} full-screen image viewer`} onTouchStart={startTouch} onTouchEnd={endTouch}>
        <div className="lightbox-tools"><button onClick={()=>setScale(v=>Math.max(1,v-.25))} aria-label="Zoom out">−</button><span>{Math.round(scale*100)}%</span><button onClick={()=>setScale(v=>Math.min(3,v+.25))} aria-label="Zoom in">+</button><button onClick={()=>setScale(1)}>Reset</button></div>
        <button className="lightbox-close" onClick={()=>setOpen(false)} aria-label="Close full screen viewer">×</button>
        {clean.length>1&&<button className="lightbox-arrow lightbox-prev" onClick={previous} aria-label="Previous image">‹</button>}
        <div className={`lightbox-canvas ${scale>1?"is-zoomed":""}`}><img src={full} alt={imageAlt(image,`${title} full-resolution image`)} style={{transform:`scale(${scale})`}}/></div>
        {clean.length>1&&<button className="lightbox-arrow lightbox-next" onClick={next} aria-label="Next image">›</button>}
      </div>,
      document.body
    )}
  </div>
}
