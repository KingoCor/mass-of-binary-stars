//QR-code
let is_qr_fullscreen = false;

document.getElementById("site-qr-link").addEventListener("click", (event)=>{
	document.getElementById("fullscreen-qr-box").style.display = "flex";
})
document.getElementById("fullscreen-qr-box").addEventListener("click", (event)=>{
	document.getElementById("fullscreen-qr-box").style.display = "none";
})

//Visualisation
const canvas = document.getElementById("visualisation")
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

//inputs
let m1_el = document.getElementById("m1")
let m2_el = document.getElementById("m2")
let A_el = document.getElementById("A")
let T_el = document.getElementById("T")

const draw_circle = (x,y,r,color)=> {
	ctx.beginPath();
	ctx.arc(x, y, Math.abs(r), 0, 2 * Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
}

const draw_orbit = (x,y,r,width,color)=> {
	ctx.beginPath();
	ctx.arc(x, y, Math.abs(r+width/2), 0, 2 * Math.PI, false);
	ctx.arc(x, y, Math.abs(r-width/2), 0, 2 * Math.PI, true);
	ctx.fillStyle = color;
	ctx.fill();
}

//Physics
const sun_mass = 1.989*Math.pow(10,30)
const au = 149597870

let m1=5.12
let m2=1.28
let A=40

let A1=(m2*A)/(m1+m2)
let A2=A-A1

let T = Math.sqrt(Math.pow(A,3)/(m1+m2))
console.log(T,T*100,Math.round(T*100),Math.round(T*100)/100)
T_el.value=Math.round(T*100)/100

const visualise = (m1,m2,A,A1,A2) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Scaling
	let A_on_screen = Math.min(centerX,centerY)
	let A1_on_screen = A1*A_on_screen/A
	let A2_on_screen = A_on_screen-A1_on_screen

	let m_on_screen_scale = A_on_screen/10
	let m1_on_screen = m_on_screen_scale*m1/(m1+m2)
	let m2_on_screen = m_on_screen_scale-m1_on_screen

	//Orbits
	draw_orbit(centerX,centerY,A1_on_screen,2,"white")
	draw_orbit(centerX,centerY,A2_on_screen,2,"white")

	//A
	ctx.beginPath();
	ctx.setLineDash([5, 5]);
	ctx.moveTo(centerX-A1_on_screen, centerY); 
	ctx.lineTo(centerX+A2_on_screen, centerY);
	ctx.strokeStyle = "white";
	ctx.lineWidth = 2;
	ctx.stroke();

	//Stars
	draw_circle(centerX-A1_on_screen,centerY,m1_on_screen,"#ffff00")
	draw_circle(centerX+A2_on_screen,centerY,m2_on_screen,"#ffff00")

	//mass center 
	draw_circle(centerX,centerY,A_on_screen/50,"white")
}
visualise(m1,m2,A,A1,A2)

const reculc_A12_T = () => {
	A1=(m2*A)/(m1+m2)
	A2=A-A1

	T = Math.sqrt(Math.pow(A,3)/(m1+m2))
	T_el.value=Math.round(T*100)/100

	visualise(m1,m2,A,A1,A2)
}

m1_el.addEventListener("change", (e)=>{
	m1 = Number(e.target.value)
	reculc_A12_T()
})

m2_el.addEventListener("change", (e)=>{
	m2 = Number(e.target.value)
	reculc_A12_T()
})

A_el.addEventListener("change", (e)=>{
	A = Number(e.target.value)
	reculc_A12_T()
})

