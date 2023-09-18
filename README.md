- router-dom
- zustand
- @tanstack/react-query
- styled-components
- styled-reset
- @supabase/supabase-js
- @types/navermaps
- @mui/types
- @mui/styles
- @mui/icons-material
- @supabase/auth-ui-react
- @supabase/auth-ui-shared
- axios
- @types/axios
- react-kakao-maps-sdk
- react-slick
- @types/react-slick
- slick-carousel
- @tanstack/react-query-devtools
- react-toastify

<img src="https://capsule-render.vercel.app/api?type=wave&color=auto&height=300&section=header&text=⚾🏸GongGong%20Play⚽🏐&fontSize=60" />

### 실행법
- yarn start

# HIPPOP 🌇

## 🖥️ 프로젝트 개요

- 팝업스토어 정보를 공유하며 유저들간의 소통을 도모하는 interactive communication service

<br />

### 📍 사이트 주소

<a href="https://www.hippop.kr/">FIND YOUR HIPPOP</a>

<br />

### 🕰️ 개발 기간

2023.08.16 ~ 2023.09.18

<br />

### 🖼 와이어프레임

<details>
<summary><a href="https://www.figma.com/community/file/1264539931329446342">Figma</a> | 펼칠 시 스크린샷</summary>
<br />
	
![123](https://github.com/kimhwanhoon/20230724_team_project/assets/123552221/45f102ee-ba89-442f-b7ea-4bc9cf0637e8)

![456](https://github.com/kimhwanhoon/20230724_team_project/assets/123552221/938892b3-c550-49cd-b729-cd9fe73e206a)

![789](https://github.com/kimhwanhoon/20230724_team_project/assets/123552221/33b1859d-c723-48fc-848a-ddb21ef87274)

<br />

</details>

<br />

### 🏷 폴더 구조

<details>
<summary>펼칠 시 파일 상세 구조</summary>
  
```
 ┣ 📂api
 ┃ ┣ 📜alarm 2.ts
 ┃ ┣ 📜alarm.ts
 ┃ ┣ 📜bookmark.ts
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜message.ts
 ┃ ┣ 📜post 2.ts
 ┃ ┣ 📜post.ts
 ┃ ┣ 📜store.ts
 ┃ ┣ 📜subscribe.ts
 ┃ ┣ 📜supabase.ts
 ┃ ┗ 📜user.ts
 ┣ 📂components
 ┃ ┣ 📂about
 ┃ ┃ ┣ 📜AboutBannser.tsx
 ┃ ┃ ┗ 📜AboutInfo.tsx
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┗ 📜St.Login.tsx
 ┃ ┃ ┗ 📜Login.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📜St.AlarmBox.tsx
 ┃ ┃ ┃ ┣ 📜St.Footer.tsx
 ┃ ┃ ┃ ┣ 📜St.Header.tsx
 ┃ ┃ ┃ ┣ 📜St.NotFound.tsx
 ┃ ┃ ┃ ┗ 📜St.TopButton.tsx
 ┃ ┃ ┣ 📜Alarm.tsx
 ┃ ┃ ┣ 📜AlarmBox.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┣ 📜NotFound.tsx
 ┃ ┃ ┗ 📜TopButton.tsx
 ┃ ┣ 📂community
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┃ ┣ 📜St.Comments.tsx
 ┃ ┃ ┃ ┃ ┣ 📜St.Subscribe.tsx
 ┃ ┃ ┃ ┃ ┗ 📜St.Writer.tsx
 ┃ ┃ ┃ ┣ 📜Comments.tsx
 ┃ ┃ ┃ ┣ 📜Subscribe.tsx
 ┃ ┃ ┃ ┗ 📜Writer.tsx
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📂mate
 ┃ ┃ ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┃ ┃ ┗ 📜St.MPosts.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MNewPosts.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MPosts.tsx
 ┃ ┃ ┃ ┃ ┗ 📜MStorePosts.tsx
 ┃ ┃ ┃ ┗ 📂review
 ┃ ┃ ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┃ ┃ ┗ 📜St.RPosts.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CommentCount.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RNewPosts.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RPopularPosts.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RPosts.tsx
 ┃ ┃ ┃ ┃ ┗ 📜RStorePosts.tsx
 ┃ ┃ ┗ 📂write
 ┃ ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┃ ┣ 📜St.Edit.tsx
 ┃ ┃ ┃ ┃ ┣ 📜St.SearchDefault.tsx
 ┃ ┃ ┃ ┃ ┣ 📜St.SearchModal.tsx
 ┃ ┃ ┃ ┃ ┗ 📜St.Write.tsx
 ┃ ┃ ┃ ┣ 📜Edit.tsx
 ┃ ┃ ┃ ┣ 📜Editor.tsx
 ┃ ┃ ┃ ┣ 📜SearchDefault.tsx
 ┃ ┃ ┃ ┣ 📜SearchModal.tsx
 ┃ ┃ ┃ ┗ 📜Write.tsx
 ┃ ┣ 📂detail
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📜St.BookMark.tsx
 ┃ ┃ ┃ ┣ 📜St.Calendar.tsx
 ┃ ┃ ┃ ┣ 📜St.HotPlace.tsx
 ┃ ┃ ┃ ┣ 📜St.NearbyStore.tsx
 ┃ ┃ ┃ ┣ 📜St.Share.tsx
 ┃ ┃ ┃ ┣ 📜St.StoreDetail.tsx
 ┃ ┃ ┃ ┗ 📜St.StoreMap.tsx
 ┃ ┃ ┣ 📜BookMark.tsx
 ┃ ┃ ┣ 📜Calendar.tsx
 ┃ ┃ ┣ 📜HotPlace.tsx
 ┃ ┃ ┣ 📜NearbyStore.tsx
 ┃ ┃ ┣ 📜Share.tsx
 ┃ ┃ ┣ 📜StoreDetail.tsx
 ┃ ┃ ┗ 📜StoreMap.tsx
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┗ 📜St.Card.tsx
 ┃ ┃ ┗ 📜Card.tsx
 ┃ ┣ 📂message
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📜St.Message.tsx
 ┃ ┃ ┃ ┣ 📜St.MessageDetail.tsx
 ┃ ┃ ┃ ┣ 📜St.MessageReply.tsx
 ┃ ┃ ┃ ┣ 📜St.ReceiveBox.tsx
 ┃ ┃ ┃ ┗ 📜St.SendBox.tsx
 ┃ ┃ ┣ 📜Message.tsx
 ┃ ┃ ┣ 📜MessageDetail.tsx
 ┃ ┃ ┣ 📜MessageReply.tsx
 ┃ ┃ ┣ 📜ReceiveBox.tsx
 ┃ ┃ ┗ 📜SendBox.tsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📜MyBookmark.tsx
 ┃ ┃ ┣ 📜MyReview.tsx
 ┃ ┃ ┣ 📜MySubModal.tsx
 ┃ ┃ ┗ 📜UserInfo.tsx
 ┃ ┗ 📂search
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📜St.SearchCalender.tsx
 ┃ ┃ ┃ ┗ 📜St.SearchList.tsx
 ┃ ┃ ┣ 📜SearchCalendar.tsx
 ┃ ┃ ┗ 📜SearchList.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useHandleImageName.ts
 ┃ ┗ 📜useRealTimeData.ts
 ┣ 📂pages
 ┃ ┣ 📂style
 ┃ ┃ ┣ 📜St.About.tsx
 ┃ ┃ ┣ 📜St.Main.tsx
 ┃ ┃ ┣ 📜St.Mate.tsx
 ┃ ┃ ┣ 📜St.MDetail.tsx
 ┃ ┃ ┣ 📜St.MyPage.tsx
 ┃ ┃ ┣ 📜St.RDetail.tsx
 ┃ ┃ ┣ 📜St.Review.tsx
 ┃ ┃ ┗ 📜St.YourPage.tsx
 ┃ ┣ 📜About.tsx
 ┃ ┣ 📜Detail.tsx
 ┃ ┣ 📜Main.tsx
 ┃ ┣ 📜Mate.tsx
 ┃ ┣ 📜MDetail.tsx
 ┃ ┣ 📜MyPage.tsx
 ┃ ┣ 📜RDetail.tsx
 ┃ ┣ 📜Review.tsx
 ┃ ┣ 📜Search.tsx
 ┃ ┗ 📜YourPage.tsx
 ┣ 📂shared
 ┃ ┣ 📜Layout.tsx
 ┃ ┗ 📜Router.tsx
 ┣ 📂store
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜userStore.ts
 ┣ 📂types
 ┃ ┣ 📜props.ts
 ┃ ┗ 📜types.ts
 ┣ 📜App.css
 ┣ 📜App.test.tsx
 ┣ 📜App.tsx
 ┣ 📜GlobalStyle.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┣ 📜setupTests.ts
 ┗ 📜supabase.d.ts
```
</details>

<br />

## 🧑‍🤝‍🧑 팀원 소개

- 팀명 : 내 코드 왜2러조
- 팀원 및 담당 구현 기능

| 역할 | 이름   | 담당 구현 기능                                 | GitHub                                                                      |
| ---- | ------ | ---------------------------------------------- | --------------------------------------------------------------------------- |
| 팀장 | 조성록 | 담당 기능 | <a href="https://github.com/pigrok">https://github.com/pigrok</a>  |
| 팀원 | 장혜진 | 담당 기능                    | <a href="https://github.com/wooriki">https://github.com/wooriki</a>         |
| 팀원 | 김우리 | 소셜 로그인 / My page                 | <a href="https://github.com/wooriki">https://github.com/wooriki</a>           |
| 팀원 | 나윤빈 | 담당 기능     | <a href="https://github.com/pigrok">https://github.com/pigrok</a>           |
| 팀원 | 조진면 | Main page fid table 작업               | <a href="https://github.com/choisua98">https://github.com/choisua98</a>     |

<br />

## 📌 주요 기능

### 지도API <a href="https://www.ncloud.com/product/applicationService/maps">네이버 지도</a>

- 공공데이터API에서 불러온 데이터에서 위도와 경도를 활용하여 네이버 맵에 핀을 찍는다
- reverse geocoding api를 통해 위도와 경도를 통해서 도로명주소로 변환한다

### 공공데이터API <a href="http://data.seoul.go.kr/dataList/OA-2266/S/1/datasetView.do">서울시 체육시설 공공서비스 예약</a>

- `react query`, `axios` 활용하여 서울시 공공API 데이터 GET 요청한다
- 검색창 필터링으로 공공데이터 필터기능을 구현한다
- 필터링 된 API 데이터를 `pagination` 기능으로 `painting`
- 불러온 API 데이터를 사용자 위치 정보에 따라 가까운 순으로 정렬한다
- 거리 순으로 정렬된 데이터를 `react-js-pagination` 라이브러리 활용하여 페이지네이션한다

### 날씨API <a href="https://openweathermap.org/api">Open Weather Map</a>

- 현재 웹 브라우저 사용자의 위치를 통해 날씨 정보를 가져오는 API
- 도시의 위치(경도, 위도)값을 매개변수로 하여 활용한다
- json형태로 가져와서 현재 위치의 날씨 현황을 해당 날씨에 반환되는 icon으로 지역명과 함께 브라우저에 렌더링한다
- 추가적으로 날짜와 현재 시간을 렌더링한다

### 유튜브API <a href="https://developers.google.com/youtube/v3/getting-started?hl=ko">YouTube</a>

- 타겟팅한 특정 채널의 ID 값을 활용하여 채널의 재생목록 List를 API로 가져온다
- API 요청 매개변수와 일치하는 재생목록의 모음을 반환받아 axios get 요청으로 상세 데이터를 불러온다
- 필요한 값을 return 해주며 List를 shuffle하여 브라우저에 렌더링한다

<br />
<br />

### 🎬 페이지 스크린샷

#### 1. 메인화면

![01 main](https://github.com/kimhwanhoon/20230724_team_project/assets/123552221/5ab477e2-534a-46ff-97c6-e4a09e8ffa23)

    1) Header - 검색창 카테고리 필터 : 사용자가 운동종목과 지역구를 선택하여 데이터 필터링
    2) Header - 날씨 API : 사용자 현재 위치에 따른 날씨 및 시간 보여주기
    3) Body - map API :  사용자 현재 위치에서 가까운 데이터 보여주기
    4) Body - Youtube API : 추천 음악 리스트 가져오기 ( 새로고침 할 때 새로운 리스트로 바뀜 )
    5) Body - 공공데이터 API : 사용자 현재 위치와 가까운 순으로 데이터 페이지네이션

<br />

#### 2. 검색카테고리 필터링 구현

![02 filtering](https://github.com/kimhwanhoon/20230724_team_project/assets/123552221/bea72f59-3c81-44df-b9ab-a82128948776)

<br />

#### 3. 검색기능 구현

![03 searching](https://github.com/kimhwanhoon/20230724_team_project/assets/123552221/8154c0ca-01f0-4072-b211-298edcfcb9c5)

<br />

#### 4. 게시물 디테일 화면

![04 detail](https://github.com/kimhwanhoon/20230724_team_project/assets/123552221/7241e40f-147e-4690-a595-4281c9adae2a)

<br />	
 
#### 5. 게시물 디테일 -  댓글기능

![05 comment](https://github.com/kimhwanhoon/20230724_team_project/assets/123552221/2a0a4e0f-ce44-4032-95fa-72288c4d4933)

    1) 댓글 수정/삭제기능 구현

2. 랜덤으로 프로필 사진 생성

<br />

#### 6. 반응형 구현

![small](https://github.com/kimhwanhoon/20230724_team_project/assets/109304556/d6907671-c743-49dd-8bca-b504238a363f)

<br />

## ⚙️ 기술 스택

- React.js
<div align=“center”>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">

</div>

### ⚙️ 사용한 라이브러리

- styled-components
- react-router-dom
- react-redux
- redux-toolkit
- redux-devtools-extension
- react-query
- react-query-devtools
- react-js-paginaition
- react-naver-maps
- axios
- cors
- dotenv
- express
- weather-styled-icon

<div align=“center”>
<img src="https://img.shields.io/badge/styled components-e62744?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/React Router DOM-ed7a40?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/Redux Toolkit-e0a538?style=for-the-badge&logo=redux&logoColor=white">
	
<img src="https://img.shields.io/badge/React Query-32b3bf?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/React Naver Maps-03C75A?style=for-the-badge&logo=naver&logoColor=white"> <img src="https://img.shields.io/badge/Axios-3261bf?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/Express-4a32bf?style=for-the-badge&logo=express&logoColor=white">
</div>

### ⚙️ 버전 관리 시스템

- Git/Github
<div align=“center”>
 <img src="https://img.shields.io/badge/git-7f8c8f?style=for-the-badge&logo=git&logoColor=white">
 <img src="https://img.shields.io/badge/github-595f61?style=for-the-badge&logo=github&logoColor=white">
 <img src="https://img.shields.io/badge/sourcetree-373c3d?style=for-the-badge&logo=sourcetree&logoColor=white">
</div>

### ⚙️ 협업툴

- Visual Studio
- Slack
- Figma
<div align=“center”>
 <img src="https://img.shields.io/badge/visual studio code-cf72ae?style=for-the-badge&logo=visualstudiocode&logoColor=white">
 <img src="https://img.shields.io/badge/slack-ad498a?style=for-the-badge&logo=slack&logoColor=white">
 <img src="https://img.shields.io/badge/figma-822f65?style=for-the-badge&logo=slack&logoColor=white">
</div>
