<h1>NEMO NEMO</h1>
<p>네모네모는 큐브에 적힌 숫자를 확인하여 특정들을 색칠하고 지워나가 퍼즐을 푸는 3d 게임입니다</p>

[게임하러가기](https://nemonemo.org)

# Introduction

https://github.com/suhjuho/nemonemo/assets/133403759/ee3f1289-f14d-40b6-b3fa-d40d9aedd68d

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
  <img width="32%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/3b304909-4c62-4745-8d1f-f893a4d87701">
  <img width="32%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/3e341a2a-2b65-42e5-95ff-29a2531d5cf4">
  <img width="32%"  alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/23032d20-7516-45ea-a1e6-33f7cee69e09">
</figure>

## 퍼즐 제작 UI 및 사용자 창작 퍼즐

- GUI 퍼즐 창작 기능을 제공합니다.
- 퍼즐의 크기 및 정답 큐브 선택, 색상, 숫자 마킹을 차례로 선택합니다.
<figure class="third">
  <img width="32%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/54a6fef9-e889-4eac-9a05-ae85815fa250">
  <img width="32%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/080a6add-35ae-418b-842c-2ff0bc7c8a8e">
  <img width="32%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/9b6f5b15-4d42-4194-88e0-cefe270fdcad">
</figure>

<figure class="half">
  <img width="48%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/ca6fff72-8b4c-4593-9fd2-445554f8f7eb">
  <img width="48%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/2b8b45fc-2a38-4024-af87-29b9c60c8d32">
</figure>

## 처음 플레이하는 사용자를 위한 반응형 모달 창을 이용한 튜토리얼 진행

- 게임의 규칙과 플레이 방법을 스탭별로 알려줍니다.
<figure class="third">
  <img width="32%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/8f69e947-b971-42fb-9523-c3d27f803f1b">
  <img width="32%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/e8cf8d33-bf3e-4b1c-87e7-688940da4d1d">
  <img width="32%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/89c28dd0-0802-40d5-b9d3-357fbf347ef8">
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
  <img width="48%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/9ceb901f-fdf7-4a94-8b65-c7f7009e9b27">
  <img width="48%"  alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/0a3ad103-efca-4c2b-a88b-5a7e28d74281">
</figure>

#### 클릭 모드는 총 2가지가 있습니다.

- 색칠 모드: (큐브를) 클릭 시 큐브에 색을 칠하고, 우클릭 시 큐브를 지웁니다.
- 큐브 모드: (지워진 큐브의 위치에 투명한 큐브가 생성됩니다)
  큐브를 클릭 시 큐브를 지웁니다,
  투명한 큐브를 클릭하면 제거되었던 큐브가 생성됩니다.

<figure class="half">
  <img width="48%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/6a067362-56b5-41b7-9a57-d0f08badf83f">
  <img width="48%" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/b4e1cd14-dc86-4ff4-adb0-a30a2f517325">
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

### 1. 서로 다른 큐브들의 상태를 어떻게 관리할 수 있을까

다양한 이벤트 별로 큐브의 상태 값을 변경하고 그 맞는 스타일을 적용할 필요가 있었습니다.

큐브에는 클릭, 우클릭, 되돌리기, 돌아가기, 레이어 이동 단축키 등 여러가지 이벤트에 의해 상태가 변경됩니다. 그리고 그 상태 값에 따라 큐브에 색이 칠해지거나 렌더링 되지 않기도 합니다.

모든 큐브들의 상태 값을 관리하기 위해 Zustand를 활용하여 전역 상태로 관리 했주었습니다.

```
const cubeStatesStore = (set) => ({
  cubeStates: {},
  cubeStatesHistory: [],
  historyIndex: 0,

  setCubeStates: (cubeStates) => set({ cubeStates }),
  setCubeStatesHistory: (cubeStatesHistory) => set({ cubeStatesHistory }),
  setHistoryIndex: (historyIndex) => set({ historyIndex }),
});
```

큐브들의 상태는 cubeStates 객체에 각 큐브의 좌표값을 key값으로 하여 저장해주었습니다. 퍼즐 상태를 되돌리기 우해 cubeStatesHistory 배열에 큐브의 상태들을 stack 구조로 저장해주었습니다.

### 2. 처음 플레이하는 사용자를 위한 반응형 모달 창을 이용한 튜토리얼 진행

게임을 처음하는 사용자들은 저의 예상보다 게임의 규칙과 플레이 방법을 이해하는데 어려움을 겪었습니다.

게임의 규칙과 플레이 방법을 동시에 익힐 수 있도록 하였습니다.
단순히 게임 규칙을 텍스트로 전달하는 방법 대신 사용자들이 쉽게 이해하고 직접 플레이를 하며 익힐 수 있도록 튜토리얼 게임과 사용자와 상호 작용 할 수 있는 모달 창을 구현했습니다.

모달 창은 플레이어가 특정 동작을 수행하도록 요구하고 조건을 만족하면 다음 모달창으로 넘어가도록 했습니다.

### 3. 퍼즐 제작 GUI 제공 및 사용자 창작 퍼즐

새로운 퍼즐을 생성할 때 필요한 정보로 퍼즐의 사이즈(가로, 높이, 세로), 정답 큐브들의 좌표 위치, 색상 등이 있습니다.
매번 새로 퍼즐을 생성할 때마다 해당 값들을 직접 타이핑하여 DB에 추가해주었습니다.
하지만 퍼즐의 크기가 커질수록 고려해야할 데이터 양이 많아져 퍼즐을 생성하는데 어려움이 있었습니다.

직관적이고 간편한 방법으로 퍼즐을 제작하기 위해 퍼즐 창작을 위한 GUI(Graphic User Interface)를 만들었습니다.
개발자 뿐만 아니라 플레이어들도 본인만의 퍼즐을 제작할 수 있도록 하였고, 제작한 퍼즐은 다른 모든 플레이어들도 풀 수 있습니다.

큐브들의 좌표값을 일일이 계산할 필요가 없어졌고, 미리 완성된 퍼즐의 모습까지 확인할 수 있게 되었습니다. 플레이어도 본인만의 퍼즐을 쉽게 창작할 수 있도록 하였습니다.

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
