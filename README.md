# 6주차 이벤트 처리와 동적 UI 기록
## 라이트 다크 버전 수정중
## 이미지 추가중
## input 글자수 10자 max 수정
    const maxLength = nicknameInput.maxLength;
    const currentLength = Math.min(nicknameInput.value.length);

    nicknameCount.textContent = currentLength + " / " + maxLength;


# 5주차 사용자 행동에 반응하는 화면 만들기 기록

## 1. 사용자(user)가 무엇을 하는지
사전예약 폼에 이메일을 입력합니다.
## 2. 화면에서 무엇이 바뀌는지
사전예약 버튼 선택 후 버튼의 속성과 하단의 안내문구가 변경이 됩니다.
## 3. 어떤 코드로 연결했는지
고정되는 값은 const 제출 뒤 값을 변경하는 것은 let 을 사용합니다. 
is-success 성공상태 규칙을 만들어줍니다.
classList로 상태 스타일을 바꿉니다.
is-success로 웹페이지에서는 녹색 변경이 되지않았는데 화면사이즈가 768사이즈에서는 적용이 되었습니다.
#subscribeMessage, #subscribeMessage.is-success, #subscribeButton:disabled
상단 부분을 @media밖으로 보내서 화면크기가 768보다 클때도 적용되게 수정했습니다.

# 4주차 반응형 수정 기록

## 1. 확인한 문제
390px 작은 화면에서 메뉴, 기능 카드, 이메일 폼이 좁아 보였습니다.
이메일 폼은 손가락으로 선택할 수 있는 범위를 확보해야할 필요성이 있습니다.

## 2. 수정한 내용
- viewport 메타 태그를 추가했습니다.
- 콘텐츠에 width와 max-width를 함께 사용했습니다.
- 기능 카드 목록을 반응형 Grid로 변경하여 카드 수량이 늘었을때 1열에 맞게 세워지도록 합니다.
- 768px 이하에서 메뉴, 카드, 폼을 한 열로 구성했습니다.

## 3. 달라진 점
- 기본 페이지에서 너비를 줄였을때 확대하지 않아도 내용을 읽을 수 있습니다.
- 가로로 스크롤이 길어지는 이슈를 세로로 깔끔하게 볼 수 있도록 했습니다.

## 4. 확인할 화면 너비
1100px / 769px / 768px / 390px
개발자 모드 화면에서 확인했습니다.