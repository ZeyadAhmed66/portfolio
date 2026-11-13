(()=>{
const frames=[...document.querySelectorAll('iframe[data-portal-src]')];
function load(frame,view){
 if(view)frame.dataset.requestedView=view;
 if(!frame.hasAttribute('src')){
  const url=new URL(frame.dataset.portalSrc,location.href);
  if(view)url.hash=view;
  frame.src=url.href;
 }else if(frame.dataset.portalReady==='true'&&view){frame.contentWindow.location.hash=view;}
}
window.loadPortfolioPortal=load;
frames.forEach(frame=>frame.addEventListener('load',()=>{
 if(!frame.hasAttribute('src'))return;
 frame.dataset.portalReady='true';
 if(frame.dataset.requestedView)frame.contentWindow.location.hash=frame.dataset.requestedView;
}));
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){load(entry.target);observer.unobserve(entry.target);}
 }),{rootMargin:'300px 0px'});
 frames.forEach(frame=>observer.observe(frame));
}else{frames.forEach(frame=>load(frame));}
})();
