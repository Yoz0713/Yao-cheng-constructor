window.onbeforeunload = function () {
    window.scrollTo(0, 0);

};
window.onload = function () {

    //拆字
    splitText(".first-page h2")
    splitText(".first-page .banner-paraBox > :nth-child(2)")
    splitText(".second-page .paraBox h2")
    splitText(".third-page .paraBox h2")
    splitText(".forth-page .paraBox h2")
    //首頁切割輪播 imgRatio = 20 : 11
    const images = ['./img/webp/first-page-banner2.webp', './img/webp/first-page-banner3.webp', './img/webp/first-page-banner4.webp', './img/webp/first-page-banner5.webp', './img/webp/first-page-banner6.webp'];
    let index = 0;
    let isAnimating = false;
    function loadNextImage(flag = true) {
        if (isAnimating) {
            return;
        }

        isAnimating = true;

        // 獲取下一張圖片的url
        let imageUrl
        if (flag) {
            imageUrl = './img/webp/first-page-banner1.webp';
        } else {
            imageUrl = images[index];
        }


        // 創建新的圖像對象
        const image = new Image();
        image.src = imageUrl;

        image.onload = function () {

            // 獲取canvas元素
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const canvasContainer = document.querySelector('.canvas-container')

            canvas.width = canvasContainer.clientWidth;
            canvas.height = canvasContainer.clientHeight;


            // 繪制圖像
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const gap = 3;
            let standardHeight = (canvas.height - gap * 3) / 4
            let standardWidth = (canvas.width - gap * 9) / 10
            let longHeight = (canvas.height - gap * 3 - standardHeight) / 2

            // // 創建10*5個canvas元素

            for (let i = 0; i < 11; i++) {
                for (let j = 0; j < 4; j++) {
                    // 創建canvas元素
                    const blockCanvas = document.createElement('canvas');
                    let imageData;
                    blockCanvas.classList.add("addCanvas")
                    blockCanvas.width = standardWidth;

                    if (j == 1 || j == 3) {

                        blockCanvas.height = longHeight;
                        // 設置canvas的位置和大小
                        blockCanvas.style.top = j == 1 ? standardHeight + gap + 'px' : standardHeight + longHeight * (j - 1) + gap * j + 'px';
                        blockCanvas.style.left = i == 0 ? '0px' : (i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap) + 'px';
                        blockCanvas.style.width = i < 6 || i > 8 ? standardWidth + "px" : standardWidth + gap * 0.95 + "px";
                        blockCanvas.style.height = longHeight + 'px';
                        // 將canvas元素添加到DOM中
                        document.querySelector('.canvas-container').appendChild(blockCanvas);
                        //處理四格連在一起的比例

                        // 獲取區塊的像素數據
                        if (j == 1) {
                            if (i == 0) {
                                imageData = ctx.getImageData(0, standardHeight + gap, blockCanvas.width / 2, blockCanvas.height);
                            } else if (i == 6) {
                                imageData = ctx.getImageData((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + gap, standardWidth * 4, longHeight);
                            } else {
                                imageData = ctx.getImageData((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + gap, standardWidth, longHeight);
                            }
                        } else {
                            if (i == 0) {
                                imageData = ctx.getImageData(0, standardHeight + longHeight + gap * 2, blockCanvas.width / 2, longHeight);
                            } else {
                                imageData = ctx.getImageData((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + longHeight + gap * 2, standardWidth, longHeight);
                            }
                        }


                    } else {
                        blockCanvas.height = standardHeight;
                        // 設置canvas的位置和大小
                        blockCanvas.style.top = j == 0 ? 0 : standardHeight + longHeight * (j - 1) + gap * j + 'px';
                        blockCanvas.style.left = i * standardWidth + i * gap + 'px';
                        blockCanvas.style.width = standardWidth + 'px';
                        blockCanvas.style.height = j == 0 ? standardHeight + 'px' : longHeight + 'px';
                        // 將canvas元素添加到DOM中
                        document.querySelector('.canvas-container').appendChild(blockCanvas);

                        // 獲取區塊的像素數據
                        if (j == 0) {
                            imageData = ctx.getImageData(i * standardWidth + i * gap, j * standardHeight + j * gap, standardWidth, standardHeight);
                        } else {
                            imageData = ctx.getImageData(i * standardWidth + i * gap, standardHeight + longHeight + j * gap, standardWidth, longHeight);
                        }

                    }




                    // 繪制像素數據到對應的canvas元素上
                    const blockCtx = blockCanvas.getContext('2d');
                    blockCtx.putImageData(imageData, 0, 0);



                }
            }
            if (flag) {
                bannerAnimation()
                bannerOutAnimation()
            }
            // 設置canvas的寬度和高度
            // window.onresize = () => {
            //     const addCanvas = document.querySelectorAll(".addCanvas")
            //     ctx.clearRect(0, 0, canvas.width, canvas.height);
            //     // 繪制圖像
            //     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            //     let imageData;
            //     const imageDataArr = [];
            //     canvas.width = window.innerWidth;
            //     canvas.height = canvasContainer.clientHeight;
            //     const gap = 3;
            //     standardHeight = (canvas.height - gap * 2) * 5 / 18
            //     standardWidth = (canvas.width - gap * 9) / 10
            //     longHeight = canvas.height - (standardHeight * 2) - gap * 2
            //     for (let i = 0; i < 11; i++) {
            //         for (let j = 0; j < 3; j++) {
            //             addCanvas.width = standardWidth;
            //             if (j == 1) {
            //                 // 獲取區塊的像素數據
            //                 if (i == 0) {
            //                     imageData = ctx.getImageData(0, standardHeight + gap, standardWidth / 2, longHeight);
            //                 } else if (i == 6) {
            //                     imageData = ctx.getImageData((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + gap, standardWidth * 4, longHeight);
            //                 } else {
            //                     imageData = ctx.getImageData((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + gap, standardWidth, longHeight);
            //                 }

            //             } else {

            //                 // 獲取區塊的像素數據
            //                 if (j == 0) {
            //                     imageData = ctx.getImageData(i * standardWidth + i * gap, j * standardHeight + j * gap, standardWidth, standardHeight);
            //                 } else {
            //                     imageData = ctx.getImageData(i * standardWidth + i * gap, standardHeight + longHeight + j * gap, standardWidth, standardHeight);
            //                 }

            //             }
            //             // 繪制像素數據到對應的canvas元素上
            //             imageDataArr.push(imageData)


            //         }
            //     }
            //     console.log(imageDataArr)
            //     for (let i = 0; i < imageDataArr.length; i++) {
            //         const blockCtx = addCanvas[i].getContext('2d');
            //         blockCtx.putImageData(imageDataArr[i], 0, 0);
            //     }
            // }
            window.onresize = () => {
                window.location.reload();
                window.scrollTo(0, 0)
            }
        };
    }
    loadNextImage();

    function bannerAnimation() {
        let gg = gsap.timeline()
        gg.from(".canvas-container .addCanvas", {
            left: "105vw",
            top: "-3vh",
            stagger: 0.04,
            ease: "power2.inOut",
            transform: "rotateX(-130deg) rotateY(-100deg) rotateZ(-160deg)",
            duration: 1.2
        }).from(".first-page h2 span", {
            x: 80,
            opacity: 0,
            duration: 0.6,
            stagger: 0.012
        }, "<+2.4").from(".first-page p span", {
            x: 80,
            opacity: 0,
            duration: 0.6,
            stagger: 0.012
        }, "<+0.6").from(".first-page .box .line", {
            width: 0,
            duration: 0.8,
        }, "<+0.4").from(".first-page .box p", {
            x: -30,
            opacity: 0,
            duration: 0.8,
        }, "<+0.4").to("body", {
            overflow: "auto",
            duration: 0.001
        })
    }
    function bannerOutAnimation() {
        let bannerOut = gsap.timeline({
            scrollTrigger: {
                trigger: ".second-page",
                start: "top 90%",
                scrub: 1,
                end: `+=${window.innerHeight}`,
                toggleActions: "play none none reverse"
            }
        });
        const canvases1 = gsap.utils.toArray('.addCanvas:nth-of-type(4n+2)');
        const canvases2 = gsap.utils.toArray('.addCanvas:nth-of-type(4n+3)');
        const canvases3 = gsap.utils.toArray('.addCanvas:nth-of-type(4n+4)');
        const canvases4 = gsap.utils.toArray('.addCanvas:nth-of-type(4n+5)');
        bannerOut.to(".banner-paraBox", {
            opacity: 0,
            y: -window.innerHeight / 2,
            duration: 0.2
        }).to(canvases1, {
            y: (index, target) => {
                let yDistance;
                if (index == 5) {
                    yDistance = window.innerHeight * 2
                } else if (index == 4 || index == 6) {
                    yDistance = window.innerHeight * 1.8
                } else if (index == 3 || index == 7) {
                    yDistance = window.innerHeight * 1.6
                } else if (index == 2 || index == 8) {
                    yDistance = window.innerHeight * 1.4
                } else if (index == 1 || index == 9) {
                    yDistance = window.innerHeight * 1.2
                } else if (index == 0 || index == 10) {
                    yDistance = window.innerHeight * 1
                }
                return `-${yDistance}px`;
            },
            duration: 1
        }, "<").to(canvases2, {
            y: (index, target) => {
                let yDistance;
                if (index % 2 == 0) {
                    yDistance = window.innerHeight * 1.6
                } else {
                    yDistance = window.innerHeight * 1.35
                }
                return `-${yDistance}px`;
            },

            duration: 1
        }, "<").fromTo(canvases2, {
            x: 0
        }, {
            x: (index, target) => {
                let xDistance;
                let side = index < 5 ? -1 : 1
                if (index == 5) {
                    xDistance = 0
                } else if (index == 4 || index == 6) {
                    xDistance = side * 35
                } else if (index == 3 || index == 7) {
                    xDistance = side * 70
                } else if (index == 2 || index == 8) {
                    xDistance = side * 105
                } else if (index == 1 || index == 9) {
                    xDistance = side * 140
                } else if (index == 0 || index == 10) {
                    xDistance = side * 175
                }
                return `${xDistance}px`;
            },
        }, "<").to(canvases3, {
            y: (index, target) => {
                let yDistance;
                if (index == 5) {
                    yDistance = window.innerHeight * 1.5
                } else if (index == 4 || index == 6) {
                    yDistance = window.innerHeight * 1.3
                } else if (index == 3 || index == 7) {
                    yDistance = window.innerHeight * 1.2
                } else if (index == 2 || index == 8) {
                    yDistance = window.innerHeight * 1.1
                } else if (index == 1 || index == 9) {
                    yDistance = window.innerHeight * 1
                } else if (index == 0 || index == 10) {
                    yDistance = window.innerHeight * 0.9
                }
                return `-${yDistance}px`;
            },
            duration: 1
        }, "<").fromTo(canvases3, {
            x: 0
        }, {
            x: (index, target) => {
                let xDistance;
                let side = index < 5 ? -1 : 1
                if (index == 5) {
                    xDistance = 0
                } else if (index == 4 || index == 6) {
                    xDistance = side * window.innerWidth / 35
                } else if (index == 3 || index == 7) {
                    xDistance = side * window.innerWidth / 35 * 2
                } else if (index == 2 || index == 8) {
                    xDistance = side * window.innerWidth / 35 * 3
                } else if (index == 1 || index == 9) {
                    xDistance = side * window.innerWidth / 35 * 4
                } else if (index == 0 || index == 10) {
                    xDistance = side * window.innerWidth / 35 * 5
                }
                return `${xDistance}px`;
            },
        }, "<").to(canvases4, {
            y: (index, target) => {
                let yDistance;
                if (index == 5) {
                    yDistance = window.innerHeight * 1.5
                } else if (index == 4 || index == 6) {
                    yDistance = window.innerHeight * 1.4
                } else if (index == 3 || index == 7) {
                    yDistance = window.innerHeight * 1.2
                } else if (index == 2 || index == 8) {
                    yDistance = window.innerHeight * 0.9
                } else if (index == 1 || index == 9) {
                    yDistance = window.innerHeight * 0.6
                } else if (index == 0 || index == 10) {
                    yDistance = window.innerHeight * 0.4
                }
                return `-${yDistance}px`;
            },
            duration: 1
        }, "<").fromTo(canvases4, {
            x: 0
        }, {
            x: (index, target) => {
                let xDistance;
                let side = index < 5 ? -1 : 1
                if (index == 5) {
                    xDistance = 0
                } else if (index == 4 || index == 6) {
                    xDistance = side * window.innerWidth / 30
                } else if (index == 3 || index == 7) {
                    xDistance = side * window.innerWidth / 30 * 2
                } else if (index == 2 || index == 8) {
                    xDistance = side * window.innerWidth / 30 * 3
                } else if (index == 1 || index == 9) {
                    xDistance = side * window.innerWidth / 30 * 4
                } else if (index == 0 || index == 10) {
                    xDistance = side * window.innerWidth / 30 * 5
                }
                return `${xDistance}px`;
            },
        }, "<").from(".second-page", {
            duration: 0.6,
            opacity: 0,
        }, "<")
    }


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

    //第三cut輪播
    function carosule() {
        const swiperIndex = document.querySelector(".swiper-index")
        const swiper = new Swiper(".swiper", {
            slidesPerView: 5,
            centeredSlides: true,
            loop: true,
            spaceBetween: 0,
            speed: 1000,
            autoplay: {
                delay: 3100,
                disableOnInteraction: false
            },
            on: {
                slideChangeTransitionStart: function () {
                    //pagination 
                    if (swiper.realIndex == 1) {
                        swiperIndex.innerHTML = `06`
                    } else if (swiper.realIndex == 0) {
                        swiperIndex.innerHTML = `05`
                    } else if (swiper.realIndex > 7) {
                        swiperIndex.innerHTML = `0${swiper.realIndex - 7}`
                    } else {
                        swiperIndex.innerHTML = `0${swiper.realIndex - 1}`
                    }

                },
            },
            effect: 'slide' /* 设置幻灯片效果为'slide' */,

        });
        //pagination init
        if (swiper.realIndex == 1) {
            swiperIndex.innerHTML = `06`
        } else if (swiper.realIndex == 0) {
            swiperIndex.innerHTML = `05`
        } else if (swiper.realIndex > 7) {
            swiperIndex.innerHTML = `0${swiper.realIndex - 7}`
        } else {
            swiperIndex.innerHTML = `0${swiper.realIndex - 1}`
        }

        //navigation
        const arrow = document.querySelectorAll(".swiper .navBox img")
        arrow.forEach((item, i) => {
            if (i == 0) {
                item.addEventListener("click", () => {
                    swiper.slidePrev()
                    console.log(swiper.realIndex - 1)
                })
            } else {
                item.addEventListener("click", () => {
                    swiper.slideNext()
                    console.log(swiper.realIndex - 1)
                })
            }
        })


    }
    carosule()

    function pageAnimation() {
        let secondPage = gsap.timeline({
            scrollTrigger: {
                trigger: ".second-page",
                start: "top 60%",
                toggleActions: "play none none reverse",
            }
        })
        secondPage.to(".second-page .gray", {
            opacity: 0,
            duration: 2.5
        }).from(".second-page .left .imgBox > img ", {
            scale: 1.3,
            duration: 2,
            stagger: 0.2
        }, "<").from(".second-page .paraBox h2 > :nth-child(1) ", {
            opacity: 0,
            x: 30,
            color: "#000",
            duration: 1.5,
        }, "<+0.3").from(".second-page .paraBox h2 > :not(:first-child) ", {
            opacity: 0,
            x: 30,
            duration: 1.6,
            stagger: 0.06
        }, "<+0.3").from(".second-page .paraBox h4 ", {
            opacity: 0,
            duartion: 1.4
        }, "<+0.3").from(".second-page .paraBox p ", {
            opacity: 0,
            duartion: 1.4
        }, "<+0.3")

        let thirdPage = gsap.timeline({
            scrollTrigger: {
                trigger: ".third-page",
                start: "top 60%",
                toggleActions: "play none none reverse",
            }
        })
        thirdPage.from(".third-page .paraBox ", {
            opacity: 0,
            duration: 1.2,
        }, "<+0.8").from(".third-page .swiper ", {
            opacity: 0,
            y: 15,
            duration: 1.2,
        }, "<+0.8")

        let forthPage = gsap.timeline({
            scrollTrigger: {
                trigger: ".forth-page",
                start: "top 60%",
                toggleActions: "play none none reverse",
            }
        })
        forthPage.to(".forth-page .gray", {
            opacity: 0,
            duration: 2.5
        }).from(".forth-page .imageBox .imgBox > img ", {
            scale: 1.3,
            duration: 2,
            stagger: 0.2
        }, "<").from(".forth-page .paraBox h2 ", {
            opacity: 0,
            duration: 0.8
        }, "<+0.3").from(".forth-page .paraBox h4 ", {
            opacity: 0,
            duration: 0.8
        }, "<").from(".forth-page .paraBox p ", {
            opacity: 0,
            duration: 0.8
        }, "<+0.3")
    }
    pageAnimation()
}

































// 短長短
// ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
// const gap = 3;
// let standardHeight = (canvas.height - gap * 2) * 5 / 18
// let standardWidth = (canvas.width - gap * 9) / 10
// let longHeight = canvas.height - (standardHeight * 2) - gap * 2
// for (let i = 0; i < 11; i++) {
//     for (let j = 0; j < 3; j++) {
//         // 創建canvas元素
//         const blockCanvas = document.createElement('canvas');
//         let imageData;
//         blockCanvas.classList.add("addCanvas")
//         blockCanvas.width = standardWidth;

//         if (j == 1) {

//             blockCanvas.height = longHeight;
//             // 設置canvas的位置和大小
//             blockCanvas.style.top = standardHeight + gap + 'px';
//             blockCanvas.style.left = i == 0 ? '0px' : (i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap) + 'px';
//             blockCanvas.style.width = i < 6 || i > 8 ? standardWidth + "px" : standardWidth + gap * 0.95 + "px";
//             blockCanvas.style.height = longHeight + 'px';
//             // 將canvas元素添加到DOM中
//             document.querySelector('.canvas-container').appendChild(blockCanvas);
//             //處理四格連在一起的比例

//             // 獲取區塊的像素數據
//             if (i == 0) {
//                 imageData = ctx.getImageData(0, standardHeight + gap, blockCanvas.width / 2, blockCanvas.height);
//             } else if (i == 6) {
//                 imageData = ctx.getImageData((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + gap, standardWidth * 4, longHeight);
//             } else {
//                 imageData = ctx.getImageData((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + gap, standardWidth, longHeight);
//             }

//         } else {
//             blockCanvas.height = standardHeight;
//             // 設置canvas的位置和大小
//             blockCanvas.style.top = j == 0 ? 0 : standardHeight + longHeight + gap * j + 'px';
//             blockCanvas.style.left = i * standardWidth + i * gap + 'px';
//             blockCanvas.style.width = standardWidth + 'px';
//             blockCanvas.style.height = standardHeight + 'px';
//             // 將canvas元素添加到DOM中
//             document.querySelector('.canvas-container').appendChild(blockCanvas);

//             // 獲取區塊的像素數據
//             if (j == 0) {
//                 imageData = ctx.getImageData(i * standardWidth + i * gap, j * standardHeight + j * gap, standardWidth, standardHeight);
//             } else {
//                 imageData = ctx.getImageData(i * standardWidth + i * gap, standardHeight + longHeight + j * gap, standardWidth, standardHeight);
//             }

//         }




//         // 繪制像素數據到對應的canvas元素上
//         const blockCtx = blockCanvas.getContext('2d');
//         blockCtx.putImageData(imageData, 0, 0);



//     }
// }