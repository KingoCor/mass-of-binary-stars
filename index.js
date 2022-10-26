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

let animation_deg = 0;

//inputs
let m1_el = document.getElementById("m1")
let m2_el = document.getElementById("m2")
let A_el = document.getElementById("A")
let culc_data = document.getElementById("culc-data")

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

const visualise = (m1,m2,A,A1,A2,deg=0) => {
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

	//Culc x and y 
	rad = deg*Math.PI/180
	let x1 = centerX + A1_on_screen * Math.cos(rad)
	let y1 = centerY + A1_on_screen * Math.sin(rad)
	let x2 = centerX - A2_on_screen * Math.cos(rad)
	let y2 = centerY - A2_on_screen * Math.sin(rad)

	//A
	ctx.beginPath();
	ctx.setLineDash([5, 5]);
	ctx.moveTo(x1, y1); 
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = "white";
	ctx.lineWidth = 2;
	ctx.stroke();

	//Stars
	draw_circle(x1,y1,m1_on_screen,"#ffff00")
	draw_circle(x2,y2,m2_on_screen,"#ffff00")

	//mass center 
	draw_circle(centerX,centerY,A_on_screen/50,"white")
}

const reculc_A12_T = () => {
	A1=(m2*A)/(m1+m2)
	A2=A-A1

	T = Math.sqrt(Math.pow(A,3)/(m1+m2))
	
	culc_data.innerHTML=`<p>T = ${Math.round(T*100)/100} лет</p>`
	culc_data.innerHTML+=`<p>A<sub>1</sub> = ${Math.round(A1*100)/100} а.е.</p>`
	culc_data.innerHTML+=`<p>A<sub>2</sub> = ${Math.round(A2*100)/100} а.е.</p>`

	animation_deg = 0

	visualise(m1,m2,A,A1,A2)
}
reculc_A12_T()

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

let play_button = document.getElementById("play-button")
let is_animation_playing = false;
let interval

play_button.addEventListener("click", (e)=>{
	console.log(e.target)
	if (is_animation_playing) {
		play_button.children[0].className = "fa-solid fa-play"	
		clearInterval(interval)
		animation_deg = 0;
		visualise(m1,m2,A,A1,A2,animation_deg);
	} else {
		play_button.children[0].className = "fa-solid fa-pause"

		interval = setInterval(()=>{
			visualise(m1,m2,A,A1,A2,animation_deg);
			animation_deg+=1;
			if (animation_deg>=360) {
				animation_deg = 0;
			}
		},50)
	}

	is_animation_playing=!is_animation_playing
})


