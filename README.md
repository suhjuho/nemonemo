<h1>NEMO NEMO</h1>
<p>네모네모는 큐브에 적힌 숫자를 확인하여 특정들을 색칠하고 지워나가 퍼즐을 푸는 3d 게임입니다</p>

[게임하러가기](https://nemonemo.org)

# Introduction

<div align="start">
  <img width="600" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/ef512684-d94d-40e4-a7d9-c6122ed5b289">   
</div>

- 2D 기반의 퍼즐 게임 네모네모로직(aka 노노그램, picross) 게임을 3D로 구현한 웹 게임입니다.
- 게임의 목표는 각 큐브에 적힌 숫자들을 힌트로 정답인 큐브들을 찾고 나머지 큐브들을 제거하여 퍼즐 속에 숨겨진 조각을 찾아야합니다.

# tech stacks

<p>
  <b>Frontend　</b>
  <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=flat-round&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/React.js-928dfa?style=flat-round&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/R3F-3B66BC?style=flat-square&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-300D4F?style=flat-square&logoColor=white">  
  <br />
  <b>Backend　</b> 
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/AWS_Lambda-FF9900?style=flat-square&logo=awslambda&logoColor=white">
  <br />
  <b>Etc　</b>
  <img src="https://img.shields.io/badge/Git-FC6D26?style=flat-square&logo=Git&logoColor=white">
  <img src="https://img.shields.io/badge/styled_component-DB7093?style=flat-square&logo=styledcomponents&logoColor=white">
</p>

# Features

## 난이도 별 퍼즐
  - 퍼즐의 크기에 따라 다른 난이도의 퍼즐을 풀 수 있습니다.
<figure class="third">
  <img width="33%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/3b304909-4c62-4745-8d1f-f893a4d87701"> 
  <img width="33%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/3e341a2a-2b65-42e5-95ff-29a2531d5cf4"> 
  <img width="33%"  alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/23032d20-7516-45ea-a1e6-33f7cee69e09"> 
</figure>

## 퍼즐 제작 UI 및 사용자 창작 퍼즐
  - GUI 퍼즐 창작 기능을 제공합니다.
  - 퍼즐의 크기 및 정답 큐브 선택, 색상, 숫자 마킹을 차례로 선택합니다.
<figure class="third">
  <img width="33%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/54a6fef9-e889-4eac-9a05-ae85815fa250"> 
  <img width="33%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/080a6add-35ae-418b-842c-2ff0bc7c8a8e"> 
  <img width="33%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/9b6f5b15-4d42-4194-88e0-cefe270fdcad"> 
</figure>

<figure class="half">
  <img width="49%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/ca6fff72-8b4c-4593-9fd2-445554f8f7eb"> 
  <img width="49%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/2b8b45fc-2a38-4024-af87-29b9c60c8d32"> 
</figure>

## 처음 플레이하는 사용자를 위한 반응형 모달 창을 이용한 튜토리얼 진행
  - 게임의 규칙과 플레이 방법을 스탭별로 알려줍니다.
<figure class="third">
  <img width="33%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/8f69e947-b971-42fb-9523-c3d27f803f1b"> 
  <img width="33%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/e8cf8d33-bf3e-4b1c-87e7-688940da4d1d"> 
  <img width="33%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/89c28dd0-0802-40d5-b9d3-357fbf347ef8"> 
</figure>


# How to play
- 마우스로 큐브를 클릭하고 키보드 단축키를 이용하여 옵션을 변경할 수 있습니다.

#### 숫자 힌트

- 숫자 힌트를 가지고 정답이라 생각하는 큐브를 클릭하면 큐브에 색을 칠해 마킹해놓을 수 있습니다.
- 큐브의 각 면에는 최대 2개의 숫자가 적혀있습니다.
  - 가운데 숫자: 해당 방향으로 칠해야 할 총 큐브의 개수를 의미합니다.
  - 우측 상단: 연속되는 큐브사이의 빈틈의 개수입니다. 우측 상단에 숫자가 없다면 모두 연속되는 큐브입니다.
- 숫자가 적힌 면을 기준으로 수직으로 향하는 방향이 기준입니다.

<figure class="half">
  <img width="49%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/9ceb901f-fdf7-4a94-8b65-c7f7009e9b27"> 
  <img width="49%"  alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/0a3ad103-efca-4c2b-a88b-5a7e28d74281"> 
</figure>

#### 클릭 모드는 총 2가지가 있습니다.

- 색칠 모드: (큐브를) 클릭 시 큐브에 색을 칠하고, 우클릭 시 큐브를 지웁니다.
- 큐브 모드: (지워진 큐브의 위치에 투명한 큐브가 생성됩니다)
  큐브를 클릭 시 큐브를 지웁니다,
  투명한 큐브를 클릭하면 제거되었던 큐브가 생성됩니다.

<figure class="half">
  <img width="49%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/6a067362-56b5-41b7-9a57-d0f08badf83f"> 
  <img width="49%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/b4e1cd14-dc86-4ff4-adb0-a30a2f517325"> 
</figure>

#### 레이어 이동

- 안쪽에 위치하여 클릭하기 어려운 큐브의 경우 레이어 이동을 통해 클릭할 수 있습니다.
- 단축키 Q, W로 안쪽레이어로 이동하거나 밖으로 나올 수 있습니다.
- 레이어를 이동하면 지나친 레이어의 큐브들은 보이지 않습니다. (단, 보이지 않다고 제거된 것은 아닙니다!)
- 레이어를 이동하면 퍼즐 뒷쪽에 빨간색 격자무늬로 레이어 이동을 표시해줍니다.
- 퍼즐을 바라보는 위치에따라 이동할 레이어의 기준이 변경됩니다.(옆면 중 플레이어와 가장 가까운 면이 기준)

#### 퍼즐 회전

- 배경을 클릭한 상태에서 드래그를 하면 퍼즐을 회전시킬 수 있습니다.
- 배경을 우클릭하거나 단축키 c를 누르면 클릭 모드가 변경됩니다.

#### 되돌리기, 돌아가기

- z 단축키를 이용하면 큐브 변경 상태를 뒤로 돌릴 수 있습니다.
- x 단축키를 이용하면 큐브 변경 상태를 앞으로 돌릴 수 있습니다.

# challenge

#### rendering optimization
   : 렌더링 최적화입니다.
   카메라의 위치에 따라 상태값을 변경해주어야합니다.
   첫번째는 퍼즐의 뒤쪽에 있는 격자무늬 배경을 조건부 렌더링하기 위해서 입니다.
   두번째 이유는 큐브 레이어를 이동할 때 기준이 되는 퍼즐의 면을 정하기 위해서입니다.
   사용자가 퍼즐을 회전시킬때마다 새롭게 변경된 카메라 위치를 찾고 보여줄 배경 면과 이동할 레이어를 구하는 로직에서 렌더링 최적화가 필요했습니다.
   카메라의 위치를 구하기 위해서 react three drei 라이브러리에서 제공하는 카메라 위치,방향 제어 시스템인 orbitControls를 사용했습니다.
   하지만 orbitCOntrols는 내부적으로 카메라 위치를 업데이트하면서 프레임 사이에 카메라의 위치를 집어넣는 방식을 사용합니다. 이는 직접적으로 카메라 위치에 접근하는 것보다 지연을 초래하는 문제가 있어 렌더링에 지연이 생기게 되었습니다.
   이를 해결하기 위해 useThree 훅을 이용하였습니다. 이 방법으로 직접 카메라에 접근하여 위치를 가져오고 useFrame으로 매 프레임마다 호출하여 배경 면과 이동할 레이어를 선택해주었습니다.
   결과적으로 큐브의 수가 많아질 수록 대체한 방식에서 카메라의 이동이 더 부드럽고 빠른 렌더링을 보여주었습니다.

#### custom puzzle
   : 새로운 퍼즐을 생성할 때 필요한 정보로 퍼즐의 사이즈(가로, 높이, 세로), 정답 큐브들의 좌표 위치, 색상 등이 있습니다. 매번 새로 퍼즐을 생성할 때마다 해당 값들을 배열, 객체 타입으로 직접 타이핑하여 DB에 추가해주었습니다. 하지만 퍼즐의 크기가 커질수록 고려해야할 데이터 양이 많아져 퍼즐을 생성하는데 어려움이 있었습니다. 이를 해결하기 위해 퍼즐을 만드는데 필수적인 요소만을 사용자에게 직접 받아 퍼즐을 제작해주는 로직을 구현하고 실제로 퍼즐을 제작할 수있는 UI를 개발하였습니다. 퍼즐의 좌표값을 일일이 계산할 필요가 없어졌고, 미리 완성된 퍼즐의 모습까지 확인할 수 있게 되었습니다. 사용자들이 본인만의 창작 퍼즐을 만드는 것 뿐만 아니라, 프로젝트를 진행한 저도 이전보다 훨씬 쉽게 퍼즐을 제작할 수 있었습니다.

#### UI/UX
   : 게임의 규칙을 모르는 플레이어도 많고 3D에서 게임 조작 방식도 처음에는 익히기 어렵다는 피드백이 많아 게임의 룰을 모르는 플레이들을 위한 튜토리얼을 만들어 주었습니다. 단순히 게임의 규칙과 플레이 방법을 텍스트로 적어주는 것이 아니라 튜토리얼용 퍼즐을 직접 풀어가면서 단계적으로 설명 창을 띄어주어 쉽고 빠르게 게임을 플레이 할 수 있도록 도와주었습니다.

# project timeline

프로젝트 기획 및 목업 제작 [2024.03.04 ~ 2024.03.10]

- [칸반 태스크](https://better-yogurt-64b.notion.site/e91fbbe51001473795ec626001fc686a?pvs=74)
- [목업](https://www.figma.com/file/iZSW0pk7NtFbdaioRmqtaA/nemonemo?type=design&node-id=0%3A1&mode=design&t=aXngm3e4JAGwZWGb-1)

프로젝트 기능 개발 및 구현 [2024.03.11 ~ 2024.03.27]

- 게임 기능 구현
- 난이도 별 퍼즐 제작
- 사용자 창작 퍼즐 기능 구현

배포 및 리팩토링 [2024.03.28 ~ ]

- AWS S3, cloudfront, route53을 이용하여 배포

# comments

- 새로운 분야인 3d를 개발하면서 렌더링 최적화를 진행했습니다.

- 게임을 개발하면서 기존의 존재하는 퍼즐 게임이지만 2D에서 3D로 바꾸는 과정에서 게임의 로직을
  수정하는 과정이 시간이 오래 걸렸습니다. 큐브에 마킹해줘야할 숫자도 기존의 방식과 변경되었습니다.
  숫자를 적을 공간이 한정되어 있어 총 정답인 큐브 수를 중앙에 표시하고, 색칠되는 큐브들의 빈틈의 갯수를
  우측 상단에 표시해주어 최대 2개의 숫자로만 힌트를 주었습니다. 또한 안쪽의 퍼즐을 클릭한다거나, 제거해줘야
  하는 경우가 있어 레이어 이동을 할수 있도록 해주었고, 실수로 지운 큐브를 다시 생성하는 기능도 구현했습니다.
  **사용자 퍼즐 창작 기능**도 구현하는데 많은 시간이 걸렸습니다. 사용자 편의와 최적화를 위해
  가장 적은 정보로 퍼즐을 완성할 수 있도록 해야했습니다. 퍼즐의 크기, 정답 큐브의 위치, 색상,
  숫자 힌트 표시할 큐브 면, 퍼즐 이름을 입력받아 퍼즐을 제작 할 수 있도록 하였습니다.
  게임을 플레이하는 것처럼 퍼즐을 제작하기 때문에 실제로 퍼즐이 완성되면 어떤 모습이 나올지 확인하면서 간단하게
  퍼즐을 만들 수 있는 기능으로 게임의 지속성을 위해 반드시 필요하다고 생각했습니다.

- 완성도를 높이고 싶은 마음에 여러 디테일들을 신경쓰고 플레이어의 입장에서도 생각해보는 경험이었습니다.
  게임을 처음 접하는 사용자에게는 이해가 어려울 수 있어 플레이하면서 게임의 규칙과 조작방법을
  설명해주는 튜토리얼 퍼즐또한 따로 제작해주었습니다.
