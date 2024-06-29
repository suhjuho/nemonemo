<p align="center">
  <img width="300px" alt="projectName" src="https://github.com/Team-Office360/NeedleInHaystack-client/assets/133403759/9e926877-f2dd-4524-ad40-16b2d3631a52" />
</p>
<p align="center">네모네모는 숫자 힌트를 따라 숨겨진 조각을 찾는 3D 퍼즐 게임입니다</p>

<div align="center">

[Deployed](https://nemonemo.org)
|
[Frontend Repository](https://github.com/suhjuho/nemonemo)

</div>

## 🗂️ 목차

- [🙋🏻‍♂️ 프로젝트 소개](#️-프로젝트-소개)
- [📖 게임 규칙](#-게임-규칙)
- [🔧 기술 스택](#-기술-스택)
- [🕹️ 구현 기능](#️-구현-기능)
  - [1. 난이도 별 퍼즐 제공](#-1-난이도-별-퍼즐-제공)
  - [2. 게임 스테이지](#-2-게임-스테이지)
  - [3. 사용자 커스텀 퍼즐 제작](#-3-사용자-커스텀-퍼즐-제작을-위한-guigraphical-user-interface-제공)
- [⛰️ 챌린지](#️-챌린지)
  - [1. 퍼즐을 회전할 때마다 변하는 값들을 어떻게 처리해줘야 할까?](#1-퍼즐을-회전할-때마다-변하는-값들을-어떻게-처리해줘야-할까)
    - [1.1 퍼즐의 바깥 면에 존재하는 격자무늬를 조건부 렌더링](#1-1-퍼즐의-바깥-면에-존재하는-격자무늬를-조건부-렌더링)
    - [1.2 레이어 이동 시 기준이 될 면을 동적 변경](#1-2-레이어-이동-시-기준이-될-면을-동적-변경)
    - [1.3 퍼즐의 위 아래 면에 적힌 숫자의 각도 변경](#1-3-퍼즐의-위-아래-면에-적힌-숫자의-각도-변경)
    - [1.4 카메라의 위치를 구하고 상태값을 변경하는 로직을 코드로 구현하기](#1-4--카메라의-위치를-구하고-상태값을-변경하는-로직을-코드로-구현하기)
  - [2. 하나의 Cube 컴포넌트로 모든 퍼즐을 구현할 수 있을까?](#2-하나의-cube-컴포넌트로-모든-퍼즐을-구현할-수-있을까)
    - [2.1 모듈화된 큐브 컴포넌트를 모든 퍼즐에서 재사용](#2-1-모듈화된-큐브-컴포넌트를-모든-퍼즐에서-재사용)
    - [2.2 다양한 이벤트를 이용하여 큐브 상태 변경](#2-2-다양한-이벤트를-이용하여-큐브-상태-변경)
      - [클릭 이벤트](#1-큐브를-클릭하여-색을-마킹하거나-지울-수-있습니다)
      - [레이어 이동](#2-레이어-이동퍼즐-내부의-큐브들에-접근-시-사용)
      - [큐브 상태 히스토리](#3-큐브-상태-되돌리기undo-돌아가기redo)
      - [퍼즐 회전](#4-퍼즐-회전)
  - [3. 3D 퍼즐은 어떻게 제작할까?](#3-3d-퍼즐은-어떻게-제작할까)
    - [3.1 문제: 퍼즐의 크기가 커질수록 하드 코딩으로 제작하기에는 무리가 있다](#31-문제-퍼즐의-크기가-커질수록-하드-코딩으로-제작하기에는-무리가-있다)
    - [3.2 아이디어: 커스텀 퍼즐 제작을 위한 GUI를 만들자](#32-아이디어-커스텀-퍼즐-제작을-위한-gui를-만들자)
    - [3.3 구현과정: 스텝별로 퍼즐 제작에 필요한 정보를 입력받자](#33-구현과정-스텝별로-퍼즐-제작에-필요한-정보를-입력받자)
  - [4. 플레이 방식과 게임 규칙이 이해하기 너무 어렵다고요?](#4-플레이-방식과-게임-규칙이-이해하기-너무-어렵다고요)
    - [4-1. 문제: 이해하기 어려운 게임 규칙과 플레이 방식](#4-1-문제-이해하기-어려운-게임-규칙과-플레이-방식)
    - [4-2. 해결: 반응형 모달 창을 이용한 튜토리얼 진행](#4-2-해결-반응형-모달-창을-이용한-튜토리얼-진행)
- [📚 프로젝트 소감](#-프로젝트-소감)
- [⏰ 프로젝트 타임라인](#-프로젝트-타임라인)

<br />

# 🙋🏻‍♂️ 프로젝트 소개

https://github.com/suhjuho/nemonemo/assets/133403759/49a7ada5-b157-4726-9b53-d8519f7a69d4

- 네모네모는 2D 기반의 퍼즐 게임인 네모네모 로직(a.k.a. 노노그램, picross)을 3D로 구현한 웹 애플리케이션 게임입니다.

# 📖 게임 규칙

**게임의 목표**는 각 큐브에 적힌 숫자들을 힌트로 큐브들을 지워나가 퍼즐 속에 **숨겨진 조각**을 찾는 것 입니다.

1. 큐브에 적힌 **숫자**는 퍼즐을 푸는 힌트입니다.
2. 중앙에 적힌 숫자는 **해당 라인(숫자가 적힌 면과 수직 방향)** 에서 칠해야 할 큐브의 총 개수를 알려줍니다.
3. 우측 상단에 적힌 숫자는 색칠된 큐브들 사이의 **빈틈 개수**입니다.
4. 우측 상단에 적힌 숫자가 없는 경우는 색칠된 큐브들 사이의 빈틈이 없다는 뜻입니다.
5. 색칠된 큐브를 제외하고 모두 **지워 숨겨지 조각**을 찾습니다.

<br />

# 🔧 기술 스택

<p>
  <b>Frontend　</b>
  <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=flat-round&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/React.js-928dfa?style=flat-round&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/Three.js-333333?style=flat-square&logo=Three.js&logoColor=white">
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

<br />

# 🕹️ 구현 기능

## 🧩 1. 난이도 별 퍼즐 제공

<figure>
  <img width="500px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/5b7ca29c-fc7a-4a4f-84c2-b01de2246950">
</figure>

- 사용자는 여러 난이도의 퍼즐을 풀 수 있습니다.
- 퍼즐의 난이도는 퍼즐의 크기를 기준으로 나누었습니다.
- 사용자들이 직접 제작한 custom 퍼즐들도 모두 풀 수 있습니다.
  - custom 난이도 우측 상단에 있는 **+** 버튼을 클릭하면 커스텀 퍼즐 제작 화면으로 이동합니다. 사용자가 자신만의 퍼즐을 제작할 수 있습니다.

## 🧩 2. 게임 스테이지

<figure>
  <img width="500px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/cdb601ca-12a3-48d3-8ae8-abc211deaaec">
</figure>

- 사용자는 다양한 이벤트(클릭, 드래그, 키보드 등)를 이용하여 큐브를 조작할 수 있습니다.
  - 큐브를 클릭하여 색을 마킹하거나 지울 수 있습니다.
  - 클릭 후 드래그 시 연속해서 큐브를 조작할 수 있습니다.
  - 레이어를 이동하여 중첩된 큐브에 접근할 수 있습니다. 퍼즐 내부에 있는 큐브를 클릭하기 위해 사용합니다.
  - 사이드에 있는 아이콘에 단축키를 표시해놓았습니다. 아이콘을 클릭해도 해당 기능을 동작하게 했습니다.

<figure>
  <img width="500px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/1ef05244-ba1e-4101-b4ec-20744ec19d1c">
</figure>

- 퍼즐의 정답을 자동으로 확인을 합니다.
  - 완성된 퍼즐은 자동으로 색이 칠해집니다.
- 브라우저의 localStorage를 이용하여 퍼즐의 풀이 여부를 저장합니다. 사용자가 푼 퍼즐들의 정보를 확인합니다. 사용자가 푼 퍼즐들은 완성된 모습을 미리 보여줍니다.
  - localStorage는 브라우저를 종료해도 데이터가 남아있기때문에 사용자가 후에 다시 접속하여도 플레이 정보가 남아있게 할 수 있었습니다.
- 퍼즐을 푼 모든 사용자들의 플레이 타임을 볼 수 있습니다.

<br />

## 🧩 3. 사용자 커스텀 퍼즐 제작을 위한 GUI(Graphical User Interface) 제공

<figure>
  <img width="500px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/5b22d237-e327-4bbc-80fd-7dae0b9a32c5">
</figure>

- 사용자가 퍼즐을 완성하고 색을 입히면 각 큐브에 대한 데이터를 **자동**으로 완성합니다.
- 객체 형식의 퍼즐 데이터를 수작업으로 입력하는 대신 화면에 큐브들을 직접 조작하는 방식으로 추상화하여 사용자의 편의성을 향상했습니다.

# ⛰️ 챌린지

## 1. 퍼즐을 회전할 때마다 변하는 값들을 어떻게 처리해줘야 할까?

> 퍼즐을 회전할 때마다 렌더링을 위해 변경해줘야 하는 상태값들이 존재합니다.
>
> 아래와 같이 총 3가지 경우가 있습니다.

### 1-1. 퍼즐의 바깥 면에 존재하는 격자무늬를 조건부 렌더링

<figure>
  <img width="500px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/39efef7c-78ec-43f6-90a6-20f60b76bc98">
</figure>

- 사용자의 편의를 위해 퍼즐의 바깥 면에는 **격자무늬 배경**이 존재, 카메라 위치를 기준으로 퍼즐의 **뒷쪽 3개의 면**만 조건부 렌더링합니다.

### 1-2. 레이어 이동 시 기준이 될 면을 동적 변경

<figure>
  <img width="500px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/13a0576e-b076-4ada-ad66-8ed115d974c6">
</figure>

- **중첩된 큐브**를 조작하기 위해 내부 면으로 이동이 가능합니다. 카메라와 퍼즐의 각도에 따라 내부 면으로 이동 시 기준이 되는 면이 동적 변경합니다.

### 1-3. 퍼즐의 위, 아래 면에 적힌 숫자의 각도 변경

<figure>
  <img width="500px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/f10e3313-2b7e-4782-8c92-35edeee81ba8">
</figure>

- 퍼즐의 위, 아래에 적힌 숫자들을 사용자 편의성을 위해 뒤집히지 않도록 카메라와 퍼즐의 각도에 따라 동적 변경해주었습니다.

위의 세 가지 경우 모두 카메라의 위치(사용자 시점)가 바뀜에 따라 동적으로 렌더링과 관련된 싱태값들을 변경 해주어야합니다. 이때 카메라의 위치를 공간좌표상 x, y, z의 값으로 얻을 수 있었고 이 좌표값을 활용하여 조건을 구해주었습니다.

<p align="center">
  <img width="300px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/d4213623-4327-4246-a429-f659525308c7">
</p>

#### 1번(퍼즐의 바깥 면에 존재하는 격자무늬를 조건부 렌더링) 의 경우

현재 카메라 위치를 공간좌표 상 8분면에서 어느 곳에 위치하는지를 구함으로 해결할 수 있었습니다. 해당 하는 위치에서 보이지 않는 퍼즐의 면 3개를 찾아 렌더링을 해주었습니다.

<p align="center">
  <img width="300px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/ce562725-a140-44d7-9c82-a1cb963d441e">
  <p align="center">카메라의 위치 좌표값 (x, y, z) 가 모두 양수일 때</p>
</p>

예를 들어 위의 그림과 같이 카메라의 좌표값이 (10, 10, 10)으로 모두 양수라면, 원점을 기준으로 `(-, +, +), (+, -, +), (-, +, +)` 방향의 면 3개를 렌더링 해주었습니다.

#### 2번(레이어 이동 시 기준이 될 면을 동적 변경), 3번(퍼즐의 위, 아래 면에 적인 숫자의 각도 변경)의 경우는 동일한 로직을 사용했습니다.

<p align="center">
  <img width="500px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/13a0576e-b076-4ada-ad66-8ed115d974c6">
</p>

카메라 좌표값 `X`, `Z` 값만을 이용하여 카메라의 위치가 `X`축, `Z`축 중 더 가까운 축을 구하였습니다. 이를 통해 카메라와 더 가까이 있는 면을 정할 수 있었습니다.
아래 예시의 경우는 카메라의 좌표값 (x, z)가 (2, -8)로 Z축의 양의 방향을 향하는 면이 기준면 이되고, 그 면을 기준으로 숫자의 각도를 변경해주었습니다.

<p align="center">
  <img width="300px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/4f078e5c-e8e2-43aa-a2bb-29eb8eb54bee">
</p>

<br />

### 1-4. 💻 카메라의 위치를 구하고 상태값을 변경하는 로직을 코드로 구현하기

위에서 설명한 로직을 코드로 옮기는 작업에서도 고민이 있었습니다.

처음에는 `OrbitControls` 컴포넌트를 사용했습니다.
`OrbitControls`컴포넌트에서 `onChange` 이벤트 핸들러를 사용하여 카메라의 위치가 바뀔 때마다 렌더링을 위한 계산을 진행했습니다.

```js
// GameStage.jsx
<OrbitControls
  ref={controls}
  onChange={handleCarmera}
  ...
/>
```

> `OrbitControls`는 three.js 라이브러리에서 제공하는 카메라 위치와 방향 제어 시스템입니다. `OrbitControls`를 사용하면 카메라의 위치를 조작할 수 있습니다.

이때 크기가 작은 퍼즐을 회전할 때는 이상이 없었지만, normal 난이도 이상의 퍼즐들의 경우 회전 시 렌더링이 부자연스러운 버퍼링이 생겼습니다. <br />
그 이유는 `OrbitControls`는 내부적으로 카메라 위치를 업데이트하면서 프레임 사이에 카메라의 위치를 집어넣는 방식을 사용하고 있었습니다.
이는 직접적으로 카메라 위치에 접근하는 것보다 지연을 초래하는 문제가 있었습니다.

이를 해결하기위해서 카메라 상태에 직접 접근하는 방식이 필요했고, 카메라를 조작하는 컴포넌트인 OrbitControls와 렌더링을 위한 연산 작업을 분리할 필요가 있었습니다. react three fiber에서 제공하는 `useFrame`과 `useThree`을 이용하여 이를 해결했습니다.

> useFrame 훅은 이펙트 실행, 컨트롤 업데이트 등 렌더링된 모든 프레임에서 코드를 실행할 수 있습니다. 콜백 함수는 프레임이 렌더링되기 직전에 호출됩니다. 컴포넌트가 마운트 해제되면 렌더링 루프에서 자동으로 구독이 해제됩니다. <br /> useThree 훅은 기본 렌더러, 씬, 카메라 등이 포함된 상태 모델에 액세스하는 기능이 있습니다. 또한 캔버스의 현재 크기를 화면 및 뷰포트 좌표로 제공합니다.

```jsx
// AutoCamera.jsx

function AutoCamera({ puzzle }) {
  const { camera } = useThree();

  function checkCameraPosition(cameraX, cameraY, cameraZ) {...}
  function checkLayerDirection(cameraX, cameraZ) {...}

  useFrame(() => {
    const [x, y, z] = [
      Math.floor(camera.position.x),
      Math.floor(camera.position.y),
      Math.floor(camera.position.z),
    ];

    checkLayerDirection(x, z);
    checkCameraPosition(x, y, z);
  });

  return null;
}

export default AutoCamera;
```

`useFrame`을 사용하여 매 frame(1초에 60frame)마다 카메라의 위치를 가져와 계산했습니다. 카메라 좌표값은 `useThree`을 통해 얻을 수 있었습니다. `useThree`를 사용하면 카메라의 위치에 직접 접근할 수 있었습니다. 결과적으로 카메라를 회전시키는 로직과 카메라 위치에 접근하는 로직이 분리되어 관심사를 분리하는 효과와 렌더링 측면에서 더 나은 성능을 보여주었습니다.

<br />

## 2. 하나의 Cube 컴포넌트로 모든 퍼즐을 구현할 수 있을까?

퍼즐은 여러개의 큐브들로 이루어져있습니다. 자연스럽게 큐브를 재사용하여 퍼즐을 제작하는 것이 효율적이라고 생각하게 되었습닌다.

3D 게임을 구현하기 위해. R3F(React Three Fiber)라이브러리를 사용하였습니다.

R3F(React Three Fiber)는 three.js 라이브러리를 React와 함께 사용하기 편하게 만들어주는 라이브러리입니다. 상태관리와 컴포넌트 기반의 구조를 유지할 수 있게 해주고 React의 가상 DOM을 이용하여 성능 최적화에 용이하다는 장점이 있습니다.

React의 강점을 살릴 수 있고 프로젝트의 완성도를 높이기 위해 R3F를 사용하였습니다.

### 2-1. 모듈화된 큐브 컴포넌트를 모든 퍼즐에서 재사용

```jsx
// Puzzle.jsx
...
return (
  <group>
    {defaultPuzzle.map((position) => (
      <Cube
        key={position}
        cubeGeometry={CubeGeometry}
        cubeLineGeometry={CubeLineGeometry}
        position={position}
        markingNumbers={markingNumbers}
        positivePosition={revertCoordinate(position, size)}
        colors={colors}
        size={size}
      ></Cube>
    ))}
  </group>
);
```

하나의 퍼즐은 여러 개의 큐브 컴포넌트들로 이루어져 있습니다. 저는 큐브 컴포넌트를 모듈화 시켜 모든 퍼즐에서 재사용할 수 있도록 만들었습니다.
하나의 컴포넌트로 모듈화하여 재사용하여 사용함으로서 효율적으로 관리할 수 있었습니다.

### Zustand 라이브러리를 활용하여 큐브 상태를 전역으로 관리

다양한 이벤트 별로 큐브들의 상태 값을 변경하고 그에 맞는 스타일을 적용할 필요가 있었습니다. 또한 각각의 큐브들간의 상태를 공유하기 위해서 전역으로 관리할 필요가 있었습니다.

모든 큐브들의 상태 값을 관리하기 위해 Flux원칙을 따르고 간결한 코드로 작성할 수 있는 zustand를 활용하여 전역 상태로 관리했습니다.

```js
const cubeStatesStore = (set) => ({
  cubeStates: {},
  cubeStatesHistory: [],
  historyIndex: 0,

  setCubeStates: (cubeStates) => set({ cubeStates }),
  setCubeStatesHistory: (cubeStatesHistory) => set({ cubeStatesHistory }),
  setHistoryIndex: (historyIndex) => set({ historyIndex }),
});
```

큐브들의 상태는 `cubeStates` 객체에 각 큐브의 좌표값을 key값으로 하여 저장해주었습니다. 퍼즐 상태를 되돌리기 우해 `cubeStatesHistory` 배열에 큐브의 상태들을 stack 구조로 저장해주었습니다.

### 2-2. **다양한 이벤트를 이용하여 큐브 상태 변경**

`Cube` 컴포넌트는 다양한 이벤트 핸들러에 의해 상태가 변경됩니다.클릭, 우클릭, 되돌리기, 돌아가기, 레이어 이동 등 여러가지 이벤트에 의해 상태가 변경됩니다. 그리고 그 상태 값에 따라 큐브에 색이 칠해지거나 렌더링 되지 않기도 합니다.

```jsx
// Cube.jsx
<animated.mesh
  ref={cube}
  onContextMenu={handleRightClick}
  onPointerDown={handleDragStart}
  onPointerUp={handleDragEnd}
  onPointerEnter={handleDrag}
  onPointerOver={() => {
    setIsHover(true);
  }}
  onPointerLeave={() => setIsHover(false)}
  geometry={cubeGeometry}
  scale={scale}
>
  <animated.meshStandardMaterial
    transparent
    color={color}
    opacity={opacity}
    emissive={isHover ? "#5bea5b" : "#000000"}
  />
</animated.mesh>
```

### 1. 큐브를 클릭하여 색을 마킹하거나 지울 수 있습니다.

<figure>
  <img width="400px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/0be36a4f-dd53-4950-a66d-34f6de4c68b0">
</figure>

- **두 가지의 클릭 모드가 있습니다**

  - 색칠 모드: (큐브를) 클릭 시 큐브에 색을 칠하고, 우클릭 시 큐브를 지웁니다.
  - 큐브 모드: (지워진 큐브의 위치에 투명한 큐브가 생성됩니다)
    큐브를 클릭 시 큐브를 지웁니다,
    투명한 큐브를 클릭하면 제거되었던 큐브가 생성됩니다.

- `onPointerUp` 이벤트시 모든 큐브의 상태를 확인하여 정답 여부를 계산합니다.

<br />

### 2. 레이어 이동(퍼즐 내부의 큐브들에 접근 시 사용)

<figure>
  <img width="400px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/1fedbd14-9cf6-4d1a-8ec8-a594e75dfdb9">
</figure>

- 안쪽에 위치하여 클릭하기 어려운 큐브의 경우 레이어 이동을 통해 클릭할 수 있습니다.
- 단축키 `Q`, `W`로 안쪽레이어로 이동하거나 밖으로 나올 수 있습니다.
- 레이어를 이동하면 지나친 레이어의 큐브들은 보이지 않습니다. (단, 보이지 않다고 제거된 것은 아닙니다!)
- 레이어를 이동하면 퍼즐 뒷쪽에 빨간색 격자무늬로 레이어 이동을 표시해줍니다.
- 퍼즐을 바라보는 위치에따라 이동할 레이어의 기준이 변경됩니다.(옆면 중 플레이어와 가장 가까운 면이 기준)

<br />

### 3. 큐브 상태 되돌리기(undo), 돌아가기(redo)

<figure>
  <img width="400px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/f979fe40-ff4a-4dc5-b21a-24cc399914e5">
</figure>

- `Z` 단축키를 이용하면 큐브 변경 상태를 뒤로 돌릴 수 있습니다.
- `X` 단축키를 이용하면 큐브 변경 상태를 앞으로 돌릴 수 있습니다.

### 4. 퍼즐 회전

- 배경을 클릭한 상태에서 드래그를 하면 퍼즐을 회전시킬 수 있습니다.
- 배경을 우클릭하거나 단축키 `C`를 누르면 클릭 모드가 변경됩니다.

<br />

## 3. 3D 퍼즐은 어떻게 제작할까?

### 3.1 문제: 퍼즐의 크기가 커질수록 하드 코딩으로 제작하기에는 무리가 있다.

새로운 퍼즐을 생성할 때 필요한 정보로 퍼즐의 사이즈(가로, 높이, 세로), 정답 큐브들의 좌표 위치, 색상 등이 있습니다. 아래 코드는 객체로 저장한 퍼즐 데이터입니다.

```jsx
{
  "title": "퍼즐 이름",
  "size": [10, 10, 10],
  "answers": {...},
  "colors": {...},
  "showingNumbers": {...},
  "mainColor": "#b22ed3",
  "subColor": "#e3a7ff",
  "ranking": [...]
}
```

매번 새로 퍼즐을 생성할 때마다 해당 값들을 직접 타이핑하여 데이터베이스에 추가해주었습니다.

특히 퍼즐마다 여러개의 큐브들이 존재하는데 각 큐브들의 좌표값(x, y, z)을 지정해주고 어떤 큐브가 정답인 큐브인지를 수작업으로 계산하고 입력해줘야 했습니다. 하지만 퍼즐의 크기가 커질수록 고려해야할 데이터 양이 많아져 퍼즐을 생성하는데 어려움이 있었습니다.

### 3.2 아이디어: 커스텀 퍼즐 제작을 위한 GUI를 만들자.

이를 해결하기 위해 직관적이고 간편한 방법으로 퍼즐을 제작을 도와주는 **GUI(Graphic User Interface)** 를 만들었습니다.

퍼즐의 크기를 입력하면 자동으로 초기 퍼즐를 렌더링하고 퍼즐을 푸는 것과 동일한 방법으로 큐브들을 지우고 색칠하여 완성된 조각을 만들 수 있습니다. <br /> 퍼즐을 만들면 자동으로 각 큐브들의 좌표를 구하고 각 큐브별로 데이터(정답 큐브인지, 색상, 면에 표시할 숫자 힌트 값)등을 계산하도록 했습니다.

### 3.3 구현과정: 스텝별로 퍼즐 제작에 필요한 정보를 입력받자.

- 퍼즐의 **크기 및 정답 큐브 선택**, **색상**, **숫자 마킹**을 차례로 선택합니다.

  - **크기 및 정답 큐브 선택**

    <figure>
      <img width="400px"  alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/700df9ff-187d-416f-b6c3-c269f64cd338">
    </figure>

  - **색상 선택**: 퍼즐을 완성했을 때 큐브마다 입혀줄 색상을 고릅니다.

    <figure>
      <img width="400px"  alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/7ee70f34-4b4e-4573-878f-dde1678e18cf">
    </figure>

  - **숫자 마킹**: 퍼즐을 풀 때 큐브에 적힐 숫자들을 고룰 수 있습니다. 모든 숫자를 보여주면 사용자 입장에서 정보가 많아 집중에 방해가 되거나 혹은 퍼즐의 난이도 조절에 실패 할 수 있습니다. 퍼즐을 푸는데 필요한 숫자들만 보여줄 수 있도록 합니다.

    <figure>
      <img width="400px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/ad3131ce-6f70-4187-9538-b16e27fa1e11">
    </figure>

### 3.4 결과: 사용자들 모두 GUI를 통해 커스텀 퍼즐 제작

플레이어만의 퍼즐을 제작하고 모든 사용자는 서로의 퍼즐을 풀 수 있습니다.

게임 개발자인 저 뿐만 아니라 게임을 즐기는 플레이어들도 본인만의 퍼즐을 제작할 수 있도록 하였고, 제작한 퍼즐은 다른 모든 플레이어들도 풀 수 있습니다.

<br />

## 4. 플레이 방식과 게임 규칙이 이해하기 너무 어렵다고요?

### 4-1. 문제: 이해하기 어려운 게임 규칙과 플레이 방식

처음 플레이하는 사용자들은 게임의 규칙과 플레이 방법을 이해하는데 어려움을 겪었습니다. 기존 2d 게임을 아는 분들도 3d로 구현하면서 변경된 규칙에 적응이 필요했습니다.

단순히 게임 규칙을 텍스트로 전달하는 방법 대신 사용자들이 쉽게 이해하고 직접 플레이를 하며 익힐 수 있도록 튜토리얼내에 **사용자와 상호 작용** 할 수 있는 모달 창을 구현했습니다.

### 4-2. 해결: 반응형 모달 창을 이용한 튜토리얼 진행

<figure>
  <img width="500px" alt="image" src="https://github.com/suhjuho/nemonemo/assets/133403759/32fb9137-44c3-46a1-9769-09487295ccbd">
</figure>

- 게임의 규칙과 플레이 방법을 차례로 알려줍니다.
- 화면에 위치한 큐브에 화살표를 가리켜 사용자의 플레이를 돕습니다.
- 사용자가 요구사항을 만족하면 다음 스텝으로 넘어갑니다.

아래 코드는 튜토리얼에 사용하는 모달 컴포넌트입니다. 모든 튜토리얼 스테이지 모달을 재사용하기 위해 모달에 들어갈 내용들을 Props로 받아 사용했고 스타일도 각각 적용하기 위해 Styled-Component의 props를 활용하여 안에 들어갈 내용과 스타일 커스텀 할 수 있도록 했습니다.

```jsx
// TutorialModal
...
return (
    <Modal {...ModalProps} hasButton={hasButton}>
      <Content {...ContentProps}>{content}</Content>
      {hasButton && (
        <Buttons className="buttons">
          {currentStep === 1 && (
            <Button
              onClick={handleSkip}
              buttoncolor={buttoncolors[stageNumber]}
            >
              스킵
            </Button>
          )}
          <Button onClick={handleClick} buttoncolor={buttoncolors[stageNumber]}>
            다음
          </Button>
        </Buttons>
      )}
    </Modal>
  );
```

<br />

## 📚 프로젝트 소감

프로젝트를 시작할 때 3D를 이용하여 게임을 만들게 되었을 때 새로운 기술을 익혀야 한다는 것에 걱정이 되었습니다. 개발을 진행하면서는 필요한 기능을 빠르게 익히고 적용해보는 것을 익힐 수 있었고 기존에 개발방식과 크게 다르지 않다고 생각했습니다.

기존의 2D형식의 게임을 3D로 옮기면서 새롭게 규칙을 추가하고 로직을 만드는 과정이 재미있었고 무엇보다 구현하고자 했던 기능들을 하나씩 개발하는 과정에서 많은 뿌듯함을 느꼈습니다.

게임을 제작하는 만큼 사용자 입장에서 어떻게 하면 이해하기 쉽고 편하게 플레이 할 수 있을지 끊임없이 고민하였고 프로젝트의 완성도를 높이는데 집중했던 것 같습니다.

<br />

## ⏰ 프로젝트 타임라인

프로젝트 기획 및 목업 제작 [2024.03.04 ~ 2024.03.10]

- [칸반 태스크](https://better-yogurt-64b.notion.site/e91fbbe51001473795ec626001fc686a?pvs=74)
- [목업](https://www.figma.com/file/iZSW0pk7NtFbdaioRmqtaA/nemonemo?type=design&node-id=0%3A1&mode=design&t=aXngm3e4JAGwZWGb-1)

프로젝트 기능 개발 및 구현 [2024.03.11 ~ 2024.03.27]

- 게임 기능 구현
- 난이도 별 퍼즐 제작
- 사용자 창작 퍼즐 기능 구현
- 반응형 모달을 사용한 튜토리얼 제작

배포 및 리팩토링 [2024.03.28 ~ ]

- AWS S3, cloudfront, route53을 이용하여 배포
