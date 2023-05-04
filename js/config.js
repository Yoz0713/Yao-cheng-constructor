
//所有英文標題
splitText(".en-title")

function gradientSquareAnimation() {
    const square = document.querySelectorAll(".gradient-square .box")
    square.forEach((item, i) => {
        this[`box${i}`] = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
            }
        })
        this[`box${i}`].to(item, {
            backgroundSize: "100% 100%",
            delay: i == 0 ? 0.5 : 0,
            duration: 2,
            opacity: 0.4
        })
    })
}

gradientSquareAnimation()


function toggleMenu() {
    const btn = document.querySelector("header .close");
    const menu = document.querySelector("header ul")
    btn.addEventListener("click", () => {
        btn.classList.toggle("active")
        menu.classList.toggle("active-ul")
    })
}
toggleMenu()