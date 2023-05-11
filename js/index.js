window.onbeforeunload = function () {
    window.scrollTo(0, 0);

};
window.onload = function () {

    //拆字
    splitText(".first-page h2")
    splitText(".first-page .banner-paraBox > :nth-child(2)")

    function pixiSplit() {
        const container = document.querySelector(".canvas-container")
        //pixi設定
        let app = new PIXI.Application({
            width: container.clientWidth,
            height: container.clientHeight,
            antialias: true,    // default: false
            transparent: true, // default: false
            resolution: 1,      // default: 1
            autoResize: true,
        });

        app.renderer.view.style.touchAction = "auto";
        window.onresize = () => {
            app.renderer.resize(container.clientWidth, container.clientHeight);
        }
        container.appendChild(app.view);

        //圖片種類
        if (window.innerWidth > 820) {// 電腦版圖片
            images = ['./img/index/webp/first-page-banner1.webp', './img/index/jpg/banner-bg2.jpg', './img/index/jpg/banner-bg3.jpg'];
        } else {//手機板圖片
            images = ['./img/index/jpg/banner-bg2.png', './img/index/jpg/banner-bg4.png'];
        }

        let random = Math.floor(Math.random() * images.length);
        const imageUrl = images[random];
        //切圖片幾乘幾
        const gap = 6;
        const blocksNum = {
            x: window.innerWidth > 820 ? 10 : 3,
            y: 4
        };

        //載入圖片改變寬高使其符合螢幕後才呼叫onLoad函數
        let sprite;
        const img = new Image();
        img.src = imageUrl
        img.onload = () => {
            const texture = PIXI.Texture.from(img);
            texture.baseTexture.width = container.clientWidth * 1.05
            texture.baseTexture.height = container.clientHeight * 0.75
            sprite = PIXI.Sprite.from(texture);//'./img/index/jpg/test.webp'
            onLoad()
        }

        let standardHeight = (app.view.height - gap * (blocksNum.y - 1)) / blocksNum.y * 0.66
        let standardWidth = (app.view.width - gap * (blocksNum.x - 1)) / blocksNum.x
        let longHeight = (app.view.height - gap * (blocksNum.y - 1) - standardHeight) / (blocksNum.y - 2) * 0.66;
        function onLoad() {
            //切割方塊
            for (let i = 0; i < blocksNum.x; i++) {
                for (let j = 0; j < blocksNum.y; j++) {
                    if (j == 0) {
                        const texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle(i * standardWidth + gap * i, j, standardWidth, standardHeight));
                        const croppedSprite = new PIXI.Sprite(texture);
                        const container = new PIXI.Container();
                        container.addChild(croppedSprite);
                        container.position.x = i * standardWidth + gap * i;
                        container.position.y = j * (standardHeight + gap);
                        app.stage.addChild(container);
                    } else if (j == 1) {
                        let texture;
                        if (window.innerWidth > 820) {
                            if (i == 0) {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle(0, standardHeight + gap, standardWidth / 2, longHeight));
                            } else if (i == 7) {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle((i - 1) * (standardWidth + gap) + (standardWidth / 2 - gap), standardHeight + gap, standardWidth + gap * (i - 1), longHeight));
                            } else if (i == 8) {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + gap, standardWidth + gap, longHeight));
                            } else {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + gap, standardWidth, longHeight));
                            }
                        } else {
                            if (i == 0) {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle(0, standardHeight + gap, standardWidth / 2, longHeight));
                            } else if (i == 2 || i == 3 || i == 4) {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap) - gap * (i - 1), standardHeight + gap, standardWidth + gap * 2, longHeight));
                            } else {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + gap, standardWidth, longHeight));
                            }
                        }
                        const croppedSprite = new PIXI.Sprite(texture);
                        const container = new PIXI.Container();
                        container.addChild(croppedSprite);
                        if (window.innerWidth > 820) {
                            container.position.x = i == 0 ? 0 : i <= 6 || i >= 8 ? (i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap) : (i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap) - gap * (i - 5);
                        } else {
                            container.position.x = i == 0 ? 0 : i <= 1 || i > 4 ? (i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap) : (i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap) - gap * (i - 1);
                        }

                        container.position.y = j * (standardHeight + gap);
                        app.stage.addChild(container);
                    } else if (j == 2) {
                        const texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle(i * standardWidth + gap * i, j * gap + standardHeight + longHeight, standardWidth, longHeight));
                        const croppedSprite = new PIXI.Sprite(texture);
                        const container = new PIXI.Container();
                        container.addChild(croppedSprite);
                        container.position.x = i * standardWidth + gap * i;
                        container.position.y = j * gap + longHeight + standardHeight;
                        app.stage.addChild(container);
                    } else if (j == 3) {
                        let texture;
                        if (window.innerWidth > 820) {
                            if (i == 0) {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle(0, standardHeight + longHeight + gap * 2, standardWidth / 2, longHeight));
                            } else {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + longHeight + gap * 2, standardWidth, longHeight));
                            }
                        } else {
                            if (i == 0) {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle(0, standardHeight + longHeight + gap * 2, standardWidth / 2, longHeight));
                            } else {
                                texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + longHeight + gap * 2, standardWidth, longHeight));
                            }
                        }
                        const croppedSprite = new PIXI.Sprite(texture);
                        const container = new PIXI.Container();
                        container.addChild(croppedSprite);
                        container.position.x = i == 0 ? 0 : (i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap);
                        container.position.y = j * gap + standardHeight + longHeight * (j - 1);
                        app.stage.addChild(container);
                    }
                }
            }

            //第二列第四列最後半塊，必包原理
            function addLast() {
                let count = 0

                return () => {
                    count++
                    if (count == 1) {
                        const i = window.innerWidth > 820 ? 10 : 3;
                        let texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + gap, standardWidth / 2, longHeight));
                        const croppedSprite = new PIXI.Sprite(texture);
                        const container = new PIXI.Container();
                        container.addChild(croppedSprite);
                        container.position.x = (i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap)
                        container.position.y = (standardHeight + gap);
                        app.stage.addChild(container);
                    } else {
                        const i = window.innerWidth > 820 ? 10 : 3;
                        let texture = new PIXI.Texture(sprite.texture.baseTexture, new PIXI.Rectangle((i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap), standardHeight + longHeight + gap * 2, standardWidth / 2, longHeight));
                        const croppedSprite = new PIXI.Sprite(texture);
                        const container = new PIXI.Container();
                        container.addChild(croppedSprite);
                        container.position.x = (i - 1) * (standardWidth + gap) + (standardWidth / 2 + gap)
                        container.position.y = 3 * gap + standardHeight + longHeight * 2;
                        app.stage.addChild(container);
                    }

                }

            }
            const test = addLast()
            test()
            test()


            //bannerOut動畫
            let bannerOut = gsap.timeline({
                scrollTrigger: {
                    trigger: '.first-page',
                    start: "top top",
                    scrub: 1
                }
            })
            if (window.innerWidth <= 820) {
                bannerOut.fromTo(app.stage.children[0], {
                    x: app.stage.children[0].position.x,
                    y: app.stage.children[0].position.y,
                }, {
                    x: -window.innerWidth / 2,
                    y: -window.innerWidth * 1.2,
                }).fromTo(app.stage.children[4], {
                    x: app.stage.children[4].position.x,
                    y: app.stage.children[4].position.y,
                }, {
                    x: -window.innerWidth / 10,
                    y: -window.innerWidth * 2,
                }, "<").fromTo(app.stage.children[8], {
                    x: app.stage.children[8].position.x,
                    y: app.stage.children[8].position.y,
                }, {
                    x: window.innerWidth / 2,
                    y: -window.innerWidth * 2,
                }, "<").fromTo(app.stage.children[1], {
                    x: app.stage.children[1].position.x,
                    y: app.stage.children[1].position.y,
                }, {
                    x: -window.innerWidth / 2,
                    y: -window.innerWidth * 1,
                }, "<").fromTo(app.stage.children[5], {
                    x: app.stage.children[5].position.x,
                    y: app.stage.children[5].position.y,
                }, {
                    x: -window.innerWidth / 10,
                    y: -window.innerWidth * 2,
                }, "<").fromTo(app.stage.children[9], {
                    x: app.stage.children[9].position.x,
                    y: app.stage.children[9].position.y,
                }, {
                    x: window.innerWidth / 1.5,
                    y: -window.innerWidth * 1.7,
                }, "<").fromTo(app.stage.children[12], {
                    x: app.stage.children[12].position.x,
                    y: app.stage.children[12].position.y,
                }, {
                    x: window.innerWidth / 0.6,
                    y: -window.innerWidth * 0.6,
                }, "<").fromTo(app.stage.children[2], {
                    x: app.stage.children[2].position.x,
                    y: app.stage.children[2].position.y,
                }, {
                    x: -window.innerWidth / 2,
                    y: -window.innerWidth * 0.4,
                }, "<").fromTo(app.stage.children[6], {
                    x: app.stage.children[6].position.x,
                    y: app.stage.children[6].position.y,
                }, {
                    x: window.innerWidth / 3,
                    y: -window.innerWidth * 1.7,
                }, "<").fromTo(app.stage.children[10], {
                    x: app.stage.children[10].position.x,
                    y: app.stage.children[10].position.y,
                }, {
                    x: window.innerWidth / 1.2,
                    y: -window.innerWidth * 0.4,
                }, "<").fromTo(app.stage.children[3], {
                    x: app.stage.children[3].position.x,
                    y: app.stage.children[3].position.y,
                }, {
                    x: -window.innerWidth / 2,
                    y: -window.innerWidth * 0.000005,
                }, "<").fromTo(app.stage.children[7], {
                    x: app.stage.children[7].position.x,
                    y: app.stage.children[7].position.y,
                }, {
                    x: -window.innerWidth / 5,
                    y: -window.innerWidth * 1,
                }, "<").fromTo(app.stage.children[11], {
                    x: app.stage.children[11].position.x,
                    y: app.stage.children[11].position.y,
                }, {
                    x: window.innerWidth / 2.5,
                    y: -window.innerWidth * 0.5,
                }, "<").fromTo(app.stage.children[13], {
                    x: app.stage.children[13].position.x,
                    y: app.stage.children[13].position.y,
                }, {
                    x: window.innerWidth / 1,
                    y: -window.innerWidth * 0.00005,
                }, "<")
            } else {
                //             const canvases1 = gsap.utils.toArray('.addCanvas:nth-of-type(4n+2)');
                // const canvases2 = gsap.utils.toArray('.addCanvas:nth-of-type(4n+3)');
                // const canvases3 = gsap.utils.toArray('.addCanvas:nth-of-type(4n+4)');
                let arr1 = []
                let arr2 = []
                let arr3 = []
                let arr4 = [];
                for (let i = 0; i < blocksNum.x; i++) {
                    if (i == 0) {
                        arr1.push(app.stage.children[0])
                        arr2.push(app.stage.children[1])
                        arr3.push(app.stage.children[2])
                        arr4.push(app.stage.children[3])

                    } else if (i == blocksNum.x - 1) {
                        //arr1
                        arr1.push(app.stage.children[4 * i])
                        arr1.push(app.stage.children[38])
                        //arr2
                        arr2.push(app.stage.children[4 * i + 1])
                        arr2.push(app.stage.children[40])
                        //arr3
                        arr3.push(app.stage.children[4 * i + 2])
                        arr3.push(app.stage.children[39])
                        //arr4
                        arr4.push(app.stage.children[4 * i + 3])
                        arr4.push(app.stage.children[41])
                    } else {
                        //arr2
                        arr1.push(app.stage.children[4 * i])
                        //arr2
                        arr2.push(app.stage.children[4 * i + 1])
                        //arr3
                        arr3.push(app.stage.children[4 * i + 2])
                        //arr4
                        arr4.push(app.stage.children[4 * i + 3])
                    }

                }
                const canvases1 = gsap.utils.toArray(arr1);
                const canvases2 = gsap.utils.toArray(arr2);
                const canvases3 = gsap.utils.toArray(arr3);
                const canvases4 = gsap.utils.toArray(arr4);

                bannerOut.to(".banner-paraBox", {
                    y: -window.innerHeight / 2,
                    duration: 500 / window.innerHeight
                }).fromTo(canvases1, {
                    x: (index) => {
                        return canvases1[index].position.x;
                    },
                    y: (index) => {
                        return canvases1[index].position.y;
                    },
                }, {
                    x: (index) => {
                        let x;

                        let side = blocksNum.x - index <= blocksNum.x / 2 ? 1 : -1;
                        let distance = Math.abs(index - blocksNum.x / 2)
                        x = canvases1[index].position.x + side * window.innerWidth * (distance / 10) * 0.5
                        return x;
                    },
                    y: (index) => {
                        let y;
                        let distance = Math.abs(index - blocksNum.x / 2)
                        x = canvases1[index].position.y - window.innerWidth / (distance == 0 ? 0.08 : distance / 10) * 0.08
                        return x;
                    },
                }, "<").fromTo(canvases2, {
                    x: (index) => {
                        return canvases2[index].position.x;
                    },
                    y: (index) => {
                        return canvases2[index].position.y;
                    },
                }, {
                    x: (index) => {
                        let x;

                        let side = blocksNum.x - index <= blocksNum.x / 2 ? 1 : -1;
                        let distance = Math.abs(index - blocksNum.x / 2)
                        x = canvases2[index].position.x + side * window.innerWidth * (distance / 10) * 0.5
                        return x;
                    },
                    y: (index) => {
                        let y;
                        let distance = Math.abs(index - blocksNum.x / 2)
                        x = canvases2[index].position.y - window.innerWidth / (distance == 0 ? 0.08 : distance / 10) * 0.08
                        return x;
                    },
                }, "<").fromTo(canvases3, {
                    x: (index) => {
                        return canvases3[index].position.x;
                    },
                    y: (index) => {
                        return canvases3[index].position.y;
                    },
                }, {
                    x: (index) => {
                        let x;

                        let side = blocksNum.x - index <= blocksNum.x / 2 ? 1 : -1;
                        let distance = Math.abs(index - blocksNum.x / 2)
                        x = canvases3[index].position.x + side * window.innerWidth * (distance / 10) * 0.5
                        return x;
                    },
                    y: (index) => {
                        let y;
                        let distance = Math.abs(index - blocksNum.x / 2)
                        x = canvases3[index].position.y - window.innerWidth / (distance == 0 ? 0.08 : distance / 10) * 0.08
                        return x;
                    },
                }, "<").fromTo(canvases4, {
                    x: (index) => {
                        return canvases4[index].position.x;
                    },
                    y: (index) => {
                        return canvases4[index].position.y;
                    },
                }, {
                    x: (index) => {
                        let x;

                        let side = blocksNum.x - index <= blocksNum.x / 2 ? 1 : -1;
                        let distance = Math.abs(index - blocksNum.x / 2)
                        x = canvases4[index].position.x + side * window.innerWidth * (distance / 10) * 0.5
                        return x;
                    },
                    y: (index) => {
                        let y;
                        let distance = Math.abs(index - blocksNum.x / 2)
                        x = canvases4[index].position.y - window.innerWidth / (distance == 0 ? 0.08 : distance / 10) * 0.08
                        return x;
                    },
                }, "<")
            }

            //banner進場，位置要擺在bannerOut下面，才能捕捉到原始座標
            bannerInAnimation()
        }
        function bannerInAnimation() {
            const array = gsap.utils.toArray(app.stage.children);

            let gg = gsap.timeline()

            gg.from(array, {
                x: window.innerWidth * 1.2,
                y: window.innerHeight / 2,
                rotation: window.innerWidth > 820 ? -Math.PI / 3 : -Math.PI / 5,
                stagger: 0.04,
                ease: "power2.inOut",
                duration: window.innerWidth > 820 ? 1.8 : 1.2
            }).to(".first-page .banner-paraBox ", {
                opacity: 1,
                duration: 0.3,
            }, ">-0.5").from(".first-page h2 span", {
                x: 80,
                duration: 0.6,
                stagger: 0.012
            }, "<").to(".first-page h2 span", {
                opacity: 1,
                duration: 0.6,
                stagger: 0.012
            }, "<").from(".first-page p span", {
                x: 80,
                duration: 0.6,
                stagger: 0.012
            }, "<+0.6").to(".first-page p span", {
                opacity: 1,
                duration: 0.6,
                stagger: 0.012
            }, "<").to(".first-page .box", {
                opacity: 1,
                duration: 0.3,
            }, "<").from(".first-page .box .line", {
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
    }
    pixiSplit()



    //第三cut輪播
    function carosule() {
        const swiperIndex = document.querySelector(".swiper-index")
        const swiper = new Swiper(".swiper", {
            slidesPerView: 1,

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
            breakpoints: {
                821: {  //当屏幕宽度大于等于320
                    slidesPerView: 5,
                    centeredSlides: true,
                },

            }
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
                start: "top 80%",
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

    // function particles() {
    //     particlesJS.load('particles-js', './js/particlesjs-config.json', function () {
    //         console.log('callback - particles.js config loaded',);
    //     });
    // }
    // particles()
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