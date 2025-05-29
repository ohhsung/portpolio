// 메인 비주얼 가운데 열리는 gsap #######################
const mm = gsap.matchMedia();
mm.add('(min-width: 1001px)', () => {
    const intro = gsap
        .timeline({
            scrollTrigger: {
                trigger: '.intro',
                start: '0% 0%',
                end: '100% 100%',
                scrub: 0,
                // markers: true,
            },
        })
        .to('.intro', { duration: 5 }, 'intro')
        .to(
            '.works .works-title-wrap',
            { height: '100%', duration: 3 },
            'intro'
        );

    const works = gsap.timeline({
        scrollTrigger: {
            trigger: '.works .sticky-work',
            start: '0% 0%',
            end: '100% 100%',
            endTrigger: '.works',
            scrub: 0,
            // markers: true,
        },
    });
});

// 스크롤시 헤더 색상 #######################
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');

    if (window.scrollY > 200) {
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
    }
});

//스크롤시 사라지는 헤더 ####################
// let lastScrollY = window.scrollY;

// window.addEventListener("scroll", function () {
//     const header = document.querySelector(".header");
//     const currentScrollY = window.scrollY;

//     if (currentScrollY > lastScrollY) {
//         // 스크롤 내릴 때 → 헤더 숨김
//         header.classList.add("hide");
//     } else {
//         // 스크롤 올릴 때 → 헤더 보임
//         header.classList.remove("hide");
//     }

//     lastScrollY = currentScrollY;
// });

// 헤더 버튼 클릭시 섹션 이동 #######################
document.addEventListener('DOMContentLoaded', () => {
    const buttons = {
        top: document.querySelector('.header-top-btn'),
        about: document.querySelector('.header-about-btn'),
        main: document.querySelector('.header-main-btn'),
        sub: document.querySelector('.header-side-btn'),
        design: document.querySelector('.header-design-btn'),
        contact: document.querySelector('.header-contact-btn'),
    };

    const sections = {
        about: document.querySelector('.about-me'),
        main: document.querySelector('.main-project'),
        sub: document.querySelector('.side-project'),
        design: document.querySelector('.design'),
        contact: document.querySelector('.contact'),
    };

    const navButtons = Object.values(buttons);

    let isScrolling = false; // 클릭으로 스크롤 중인지 확인용

    const scrollToSection = (target) => {
        const top = target === 0 ? 0 : target.offsetTop;
        isScrolling = true;

        window.scrollTo({ top, behavior: 'smooth' });

        // 스크롤이 끝날 때까지 약간의 여유시간을 둠 (0.8초)
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    };

    const setActive = (activeBtn) => {
        navButtons.forEach((btn) => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    };

    buttons.top.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(0);
        setActive(buttons.top);
    });

    buttons.about.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(sections.about);
        setActive(buttons.about);
    });

    buttons.main.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(sections.main);
        setActive(buttons.main);
    });

    buttons.sub.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(sections.sub);
        setActive(buttons.sub);
    });

    buttons.design.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(sections.design);
        setActive(buttons.design);
    });

    buttons.contact.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(sections.contact);
        setActive(buttons.contact);
    });

    // 섹션에 닿으면 버튼 변경 ###############
    window.addEventListener('scroll', () => {
        if (isScrolling) return; // 클릭 스크롤 중이면 무시

        const scrollY = window.scrollY;
        const offset = 100;

        const aboutTop = sections.about.offsetTop;
        const mainTop = sections.main.offsetTop;
        const subTop = sections.sub.offsetTop;
        const designTop = sections.design.offsetTop;
        const contactTop = sections.contact.offsetTop;

        if (scrollY >= contactTop - offset) {
            setActive(buttons.contact);
        } else if (scrollY >= designTop - offset) {
            setActive(buttons.design);
        } else if (scrollY >= subTop - offset) {
            setActive(buttons.sub);
        } else if (scrollY >= mainTop - offset) {
            setActive(buttons.main);
        } else if (scrollY >= aboutTop - offset) {
            setActive(buttons.about);
        } else {
            setActive(buttons.top);
        }
    });
});

// 스크럼블 텍스트 #########################
gsap.registerPlugin(ScrambleTextPlugin);

// 모든 .scramble-text 요소 선택
const scrambleElements = document.querySelectorAll('.scramble-text');

// 각 요소에 이벤트 리스너 적용
scrambleElements.forEach((el) => {
    const originalText = el.textContent;

    el.addEventListener('mouseenter', () => {
        gsap.to(el, {
            duration: 0.8,
            scrambleText: {
                text: originalText,
                characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                speed: 1,
                revealDelay: 0.1,
                delimiter: ' ',
                tweenLength: false,
            },
            ease: 'power1.out',
        });
    });
});

// 퍼블리셔 포트폴리오 스플릿 텍스트 애니메이션 (시작시에만 실행) #############
gsap.registerPlugin(SplitText);

gsap.set('.gsap-text', { opacity: 1 });

let splits = SplitText.create('.gsap-text', { type: 'chars' });
// 각 글자를 20px 아래에서 위로 올라오면서 점점 나타나게 애니메이션
gsap.from(splits.chars, {
    y: 20,
    autoAlpha: 0,
    stagger: 0.05,
    duration: 0.5,
    delay: 0.5,
});

// 스크롤시 채워지는 텍스트 섹션 ##############
gsap.config({ trialWarn: false });
console.clear();
gsap.registerPlugin(ScrollTrigger, SplitText);
const split = new SplitText('.split-text', { type: 'lines' });

split.lines.forEach((target) => {
    gsap.to(target, {
        backgroundPositionX: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: target,
            // markers: true,
            scrub: 1,
            start: 'top 80%',
            end: 'top 60%',
        },
    });
});

// 메인프로젝트 탭메뉴 #####################
const project = document.querySelector('.main-project');
const tabs = project.querySelectorAll('.tab');
const contents = project.querySelectorAll('.content');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        // 탭 활성화 클래스 처리
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const tabClass = tab.classList[1]; // 'all', 'responsive', etc.

        // 콘텐츠 필터링
        contents.forEach((content) => {
            if (tabClass === 'all' || content.classList.contains(tabClass)) {
                content.classList.add('show');
            } else {
                content.classList.remove('show');
            }
        });
    });
});
// 초기 상태 'All' 탭 적용
project.querySelector('.tab.all').click();

// 마우스 기준 채워지는 버튼 #################################
const buttons = document.querySelectorAll('.fill-btn');

buttons.forEach((button) => {
    button.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--x', `${x}px`);
        this.style.setProperty('--y', `${y}px`);
    });
});

// 배경색 변경되는 서브 프로젝트 섹션 ######################
window.addEventListener('scroll', () => {
    const sideProjects = document.querySelectorAll('.side-project');
    const header = document.querySelector('.header');
    const mainProject = document.querySelector('.main-project');
    const windowHeight = window.innerHeight - 500;

    let anyVisible = false;

    sideProjects.forEach((project) => {
        const rect = project.getBoundingClientRect();
        const isVisible = rect.top <= windowHeight && rect.bottom >= 0;

        if (isVisible) {
            project.classList.add('active');
            anyVisible = true;
        } else {
            project.classList.remove('active');
        }
    });

    // .header에 클래스 토글
    if (anyVisible) {
        header.classList.add('section-active');
        mainProject.classList.add('section-active');
    } else {
        header.classList.remove('section-active');
        mainProject.classList.remove('section-active');
    }
});

//팝업 오버레이 띄우기########################################
const popupOverlay = document.querySelector('.popup-overlay');
const popupImage = popupOverlay.querySelector('.popup-img');
const closeBtn = popupOverlay.querySelector('.close-btn');

// 버튼마다 이벤트 설정
document.querySelectorAll('.popup-button').forEach((button) => {
    button.addEventListener('click', () => {
        const imgUrl = button.getAttribute('data-img');
        popupImage.src = imgUrl;
        popupOverlay.classList.add('active');
    });
});

// 닫기 버튼
closeBtn.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
    popupImage.src = ''; // 이미지 초기화
});

// 배경 클릭 시 닫기
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        popupOverlay.classList.remove('active');
        popupImage.src = '';
    }
});

// 물음표 클릭시 텍스트 상자 열기 ######################
document.querySelectorAll('.light-content').forEach(content => {
    const lightBtn = content.querySelector('.light-btn');
    const lightBox = content.querySelector('.light-box');
    const lightOverlay = content.querySelector('.overlay');

    // 버튼 클릭 시 열기/닫기
    lightBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 클릭 전파 방지
        lightBtn.classList.toggle('active');
        lightBox.classList.toggle('active');
        lightOverlay.classList.toggle('active');

    });

    // overlay 클릭 시 닫기
    lightOverlay.addEventListener('click', () => {
        lightBtn.classList.remove('active');
        lightBox.classList.remove('active');
        lightOverlay.classList.remove('active');
    });

    // 닫기 버튼
    const closeBtn = lightBox.querySelector('.close-btn');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 클릭이 lightBox에 전달되지 않도록
        lightBtn.classList.remove('active');
        lightBox.classList.remove('active');
        lightOverlay.classList.remove('active');
    });
});


// 디자인섹션 흐르는 오토 슬라이드 ##########################################
const designSlide = new Swiper('.designSlide', {
    loop: true,
    speed: 8000,
    freeModeMomentum: true,
    grabCursor: true,

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },

    slidesPerView: 2,

    breakpoints: {
        1000: {
            slidesPerView: 4,
        },

        600: {
            slidesPerView: 3,
        },
    },
});
