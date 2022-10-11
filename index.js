let is_qr_fullscreen = false;

document.getElementById("site-qr-link").addEventListener("click", (event)=>{
	document.getElementById("fullscreen-qr-box").style.display = "flex";
})
document.getElementById("fullscreen-qr-box").addEventListener("click", (event)=>{
	document.getElementById("fullscreen-qr-box").style.display = "none";
})
