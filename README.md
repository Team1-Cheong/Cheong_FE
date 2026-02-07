# Frontend Project

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 코드 컨벤션

이 프로젝트에서는 일관된 코드 스타일을 유지하기 위해 코드 컨벤션을 따릅니다.

자세한 내용은 [CODING_CONVENTION.md](./CODING_CONVENTION.md)를 참고하세요.

### 핵심 규칙 요약

- **변수/함수**: camelCase
- **클래스**: PascalCase
- **상수**: UPPER_SNAKE_CASE
- **컴포넌트 파일**: PascalCase.tsx
- **유틸리티 파일**: kebab-case.ts
- **들여쓰기**: 2 스페이스
- **세미콜론**: 필수

## 프로젝트 구조

```
src/
├── app/           # Next.js App Router
├── components/    # React 컴포넌트
├── hooks/         # Custom Hooks
├── utils/         # 유틸리티 함수
├── api/           # API 서비스
├── types/         # TypeScript 타입
└── styles/        # 스타일 파일
```
