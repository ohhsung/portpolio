# 포기하지않는 완벽주의자

<img src="https://github.com/user-attachments/assets/9ceb2541-cbae-4082-be50-44918069229a" alt="ID Photo" style="width: 200px;"/>
  
안녕하세요!  
저는 **웹 퍼블리셔 이오성**입니다.  
HTML, CSS, JavaScript를 바탕으로 <br>
**반응형 웹**, **웹 접근성** 에 최적화된 웹 페이지를 제작합니다.

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

# 코드리뷰

    반응형 웹사이트 제작
    기술 : HTML, CSS, JAVASCRIPT, JQUERY, swiper slide, gsap
    프로그램 : 피그마, 비주얼스튜디오코드

<br>

### 1. 파일 구조 및 구성
- [x] 역할별로 디렉토리 분리 (`/css`, `/js`, `/img`...)
- [x] 태그 기본 스타일 제거 → reset.css 파일로 분리
- [x] 파일/폴더 네이밍 일관성 유지

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
                      
웹 표준을 준수하고자 시멘틱 태그를 적극적으로 사용하였으며, <br>
각 영역의 의미를 명확히 하여 유지보수성과 가독성을 높였습니다.

<br>

### 3. CSS
- [x] 재사용성과 유지보수성을 고려한 공통 클래스 구조
- [x] 반응형 디자인 구현 (미디어 쿼리)
- [x] BEM 네이밍 규칙 → 클래스 구조 명확화
- [x] 트랜지션, 애니메이션 활용 → 인터랙션 개선
- [x] 접근성을 고려한 색상 대비, 타이포그래피 설정
- [x] 시맨틱 구조와 연계된 스타일 설계


### JavaScript
```javascript
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
- 인트로 화면이 중앙에서 열리는 애니메이션 구조 구현  
- `gsap.matchMedia()`를 활용해 화면 크기 1001px 이상에서만 애니메이션 작동하도록 설정  
- `scrollTrigger` 옵션으로 스크롤 시작/종료 지점과 `endTrigger`를 명확히 지정하여 세밀한 애니메이션 제어  
- `scrub: 0` 설정으로 스크롤과 애니메이션 타이밍을 분리해 안정적인 동작 구현  
- 디버깅용 `markers`는 주석 처리하여 필요 시 쉽게 활성화 가능
