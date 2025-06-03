# 포기하지않는 완벽주의자

<img src="https://github.com/user-attachments/assets/9ceb2541-cbae-4082-be50-44918069229a" alt="ID Photo" style="width: 200px;"/>
  
안녕하세요!  
저는 **웹 퍼블리셔 이오성**입니다.  
`HTML`, `CSS`, `JavaScript`를 바탕으로 <br>
**반응형 웹**, **웹 접근성** 에 최적화된 웹 페이지를 제작합니다.

<br>
<br>

> **포트폴리오 내의 모든 기획, 디자인, 코딩 작업은 본인의 기여도 100% 임을 알려드립니다.**

<br>
<br>

# To Do Skill

<p style="display: block;">디자인 툴</p>

`Photoshop`
`Illustrator`
`Figma`

<p style="display: block;">퍼블리싱</p>

`HTML5`
`CSS3 / SCSS`
`JavaScript`

<p style="display: block;">라이브러리</p>

`GSAP`
`Swiper Slide`
`jQuery`
`AOS`

<br>
<br>
<br>

# Code Review

    반응형 웹사이트 제작
    기술 : HTML, CSS, JAVASCRIPT, JQUERY, swiper slide, gsap
    프로그램 : 피그마, 비주얼스튜디오코드

<br>
<br>

### 1. 파일 구조 및 구성
- [x] 역할별로 디렉토리 분리 (`/css`, `/js`, `/img`...)
- [x] 태그 기본 스타일 제거 → reset.css 파일로 분리
- [x] 파일/폴더 네이밍 일관성 유지

<br>
<br>

### 2. HTML
```html
    <header class="header">
        <div class="inner">
            <h1 class="logo scramble-text">
                <a href="index.html">5SUNG</a>
            </h1>

            <nav class="nav">
                <ul class="gnb">
                    <li>
```
                      
> 웹 표준을 준수하고자 시멘틱 태그를 적극적으로 사용하였으며, <br>
> 각 영역의 의미를 명확히 하여 유지보수성과 가독성을 높였습니다.

<br>
<br>

### 3. CSS
- [x] 재사용성과 유지보수성을 고려한 공통 클래스 구조
- [x] 반응형 디자인 구현 (미디어 쿼리)
- [x] BEM 네이밍 규칙 → 클래스 구조 명확화
- [x] 트랜지션, 애니메이션 활용 → 인터랙션 개선
- [x] 접근성을 고려한 색상 대비, 타이포그래피 설정
- [x] 시맨틱 구조와 연계된 스타일 설계

<br>
<br>

### 4. JavaScript

```javascript
// 메인 비주얼 인트로, 가운데 열리는 gsap #######################
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
```
> 함수의 역할을 상단에 주석 처리하여 유지보수 편리성 향상 시켰습니다.
- [x] 인트로 화면이 중앙에서 열리는 애니메이션 구조 구현  
- [x] `gsap.matchMedia()`를 활용해 화면 크기 1001px 이상에서만 애니메이션 작동하도록 설정  
- [x] `scrollTrigger` 옵션으로 스크롤 시작/종료 지점과 `endTrigger`를 명확히 지정하여 세밀한 애니메이션 제어  
- [x] `scrub: 0` 설정으로 스크롤과 애니메이션 타이밍을 분리해 안정적인 동작 구현  
- [x] 디버깅용 `markers`는 주석 처리하여 필요 시 활성화 가능

<br>
<br>

```javascript
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
    let isScrolling = false;
    const scrollDuration = 800; // 스크롤 애니메이션 시간(ms)
    const offset = 100;

    // 스크롤 위치로 이동
    const scrollToSection = (target) => {
        const top = target === 0 ? 0 : target.offsetTop;
        isScrolling = true;
        window.scrollTo({ top, behavior: 'smooth' });
        setTimeout(() => (isScrolling = false), scrollDuration);
    };

    // 활성화 버튼 세팅
    const setActive = (activeBtn) => {
        navButtons.forEach((btn) => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    };

    // 버튼 클릭 시 스크롤 및 활성화 처리 (반복 제거)
    Object.entries(buttons).forEach(([key, btn]) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(key === 'top' ? 0 : sections[key]);
            setActive(btn);
        });
    });

    // 스크롤 위치에 따른 버튼 활성화 변경
    window.addEventListener('scroll', () => {
        if (isScrolling) return;

        const scrollY = window.scrollY;

        // 섹션을 내림차순으로 체크해서 가장 가까운 섹션 버튼 활성화
        const sectionOrder = ['contact', 'design', 'sub', 'main', 'about'];
        for (const key of sectionOrder) {
            if (scrollY >= sections[key].offsetTop - offset) {
                setActive(buttons[key]);
                return;
            }
        }
        setActive(buttons.top);
    });
});
```

- [x] 헤더의 섹션 버튼을 누르면 해당 섹션으로 부드럽게 스크롤 이동되면서, 버튼 강조
- [x] 스크롤할 때도 현재 위치에 따라 자동으로 버튼 강조가 바뀌도록 처리
- [x] 스크롤 중엔 클릭 이벤트랑 겹치지 않게 `isScrolling`으로 체크



