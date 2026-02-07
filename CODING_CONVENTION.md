# 코드 컨벤션 가이드 (Code Convention Guide)

이 문서는 프로젝트 전체에서 일관된 코드 스타일을 유지하기 위한 기본 규칙을 정의합니다.

## 1. 네이밍 규칙 (Naming Conventions)

### 1.1 변수 (Variables)

- **규칙**: camelCase 사용
- **예시**:
  ```javascript
  const userName = "John";
  const productCount = 10;
  const isActive = true;
  ```
- **금지 사항**:
  ```javascript
  // ❌ 나쁜 예
  const user_name = "John";
  const product_count = 10;
  const data = [];
  ```

### 1.2 함수 (Functions)

- **규칙**: camelCase 사용
- **예시**:
  ```javascript
  function calculateTotal() {}
  const getUserInfo = () => {};
  const fetchProductList = async () => {};
  ```
- **의미 명확화**: 함수명은 동작을 명확히 나타내야 함

  ```javascript
  // ✅ 좋은 예
  const calculateOrderTotal = (items) => {};
  const fetchUserProfile = async (userId) => {};

  // ❌ 나쁜 예
  const getInfo = () => {};
  const process = () => {};
  ```

### 1.3 클래스 (Classes)

- **규칙**: PascalCase 사용
- **예시**:
  ```typescript
  class UserProfile {}
  class ProductManager {}
  class API_Handler {}
  ```

### 1.4 상수 (Constants)

- **규칙**: UPPER_SNAKE_CASE 사용
- **예시**:
  ```javascript
  const MAX_COUNT = 100;
  const API_BASE_URL = "https://api.example.com";
  const DEFAULT_TIMEOUT = 5000;
  ```

### 1.5 의미 명확화 (Meaningful Names)

- 일반적인 명사 대신 구체적이고 명확한 명사 사용

  ```javascript
  // ✅ 좋은 예
  const [productInfo, setProductInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // ❌ 나쁜 예
  const [data, setData] = useState(null);
  const [items, setItems] = useState([]);
  ```

---

## 2. 파일/폴더 구조 (File & Folder Structure)

### 2.1 컴포넌트 파일 (Component Files)

- **규칙**: PascalCase 사용
- **확장자**: .jsx, .tsx
- **예시**:
  ```
  src/components/
  ├── Header.jsx
  ├── NavigationBar.jsx
  ├── ProductCard.jsx
  └── UserProfile.tsx
  ```

### 2.2 일반 파일 (Utility Files)

- **규칙**: kebab-case 사용
- **확장자**: .js, .ts
- **예시**:

  ```
  src/utils/
  ├── api-service.js
  ├── format-date.js
  ├── validation-helper.ts
  └── error-handler.ts

  src/hooks/
  ├── use-fetch.js
  ├── use-form.js
  └── use-auth.ts
  ```

### 2.3 폴더 구조

- **규칙**: kebab-case 사용
- **예시**:
  ```
  src/
  ├── components/
  ├── hooks/
  ├── utils/
  ├── services/
  ├── styles/
  ├── types/
  └── constants/
  ```

---

## 3. 코드 스타일 (Code Style)

### 3.1 들여쓰기 (Indentation)

- **규칙**: 2 스페이스 사용 (본 프로젝트)
- **설정**: .editorconfig 또는 IDE 설정에서 통일
  ```javascript
  function example() {
    if (condition) {
      doSomething();
    }
  }
  ```

### 3.2 괄호 (Braces)

- **규칙**: 열리는 괄호({})는 제어문과 같은 줄에, 닫는 괄호는 독립적인 줄에 위치
- **예시**:

  ```javascript
  // ✅ 올바른 스타일
  if (condition) {
    doSomething();
  } else {
    doOtherThing();
  }

  function myFunction() {
    return value;
  }

  // ❌ 나쁜 스타일
  if (condition) {
    doSomething();
  } else {
    doOtherThing();
  }
  ```

### 3.3 세미콜론 (Semicolons)

- **규칙**: 라인 끝에 세미콜론(;) 필수 부착
- **예시**:

  ```javascript
  // ✅ 올바른 스타일
  const name = "John";
  const age = 30;
  function greet() {
    console.log("Hello");
  }

  // ❌ 나쁜 스타일
  const name = "John";
  const age = 30;
  function greet() {
    console.log("Hello");
  }
  ```

### 3.4 줄 길이

- **권장**: 최대 80-100자
- 가독성을 위해 긴 라인은 분할하기

  ```javascript
  // ✅ 좋은 예
  const result = calculateComplexValue(param1, param2, param3);

  // ❌ 나쁜 예
  const result = calculateComplexValueWithManyParametersAndComplexLogic(
    param1,
    param2,
    param3,
    param4,
    param5,
  );
  ```

### 3.5 공백 (Whitespace)

- 이진 연산자 주위에 공백 추가

  ```javascript
  // ✅ 올바른 스타일
  const sum = a + b;
  const equal = x === y;

  // ❌ 나쁜 스타일
  const sum = a + b;
  const equal = x === y;
  ```

---

## 4. 프론트엔드 특화 (Frontend Best Practices)

### 4.1 React 컴포넌트 (React Components)

#### 4.1.1 함수형 컴포넌트

- **규칙**: function 키워드 또는 화살표 함수 사용 (팀 컨벤션에 따라 선택)
- **권장**: 기본적으로 일관성 있게 하나로 선택하여 사용

**Option 1: function 키워드 (권장)**

```javascript
function Header() {
  return <header>...</header>;
}

export default Header;
```

**Option 2: 화살표 함수**

```javascript
const Header = () => {
  return <header>...</header>;
};

export default Header;
```

#### 4.1.2 배열 변수 (Array Variables)

- **규칙**: 복수형 사용 (s, List, Items 등)
- **예시**:

  ```javascript
  // ✅ 좋은 예
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [movieList, setMovieList] = useState([]);

  // ❌ 나쁜 예
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  ```

#### 4.1.3 State 관리 (State Management)

```javascript
// ✅ 좋은 예
const [userName, setUserName] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState(null);

// Props 네이밍
function UserCard({ userName, userAge, isActive }) {
  return <div>{userName}</div>;
}
```

#### 4.1.4 이벤트 핸들러 (Event Handlers)

- **규칙**: handleXxx 형식으로 네이밍

  ```javascript
  // ✅ 좋은 예
  const handleClick = () => {};
  const handleInputChange = (e) => {};
  const handleFormSubmit = (e) => {};
  const handleUserLogout = () => {};

  // ❌ 나쁜 예
  const onClick = () => {};
  const onInputChange = (e) => {};
  const submit = (e) => {};
  ```

#### 4.1.5 조건부 렌더링 (Conditional Rendering)

```javascript
// ✅ 좋은 예
function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p>제품이 없습니다.</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### 4.2 TypeScript 적용 (TypeScript)

#### 4.2.1 타입 정의

```typescript
// ✅ 좋은 예
interface User {
  id: number;
  userName: string;
  email: string;
  isActive: boolean;
}

type Status = "pending" | "loaded" | "error";

function getUser(userId: number): Promise<User> {
  // ...
}
```

#### 4.2.2 제네릭 타입

```typescript
// ✅ 좋은 예
interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

async function fetchProducts(): Promise<ApiResponse<Product[]>> {
  // ...
}
```

---

## 5. 린팅 및 포맷팅 (Linting & Formatting)

### 5.1 ESLint 설정

- `.eslintrc` 파일에서 규칙 정의
- 위반 시 자동으로 오류 표시

### 5.2 Prettier 설정

- 자동 포맷팅 도구로 스타일 통일
- `.prettierrc` 파일에서 설정

### 5.3 Pre-commit Hook

- husky를 사용하여 커밋 전 자동 검사
  ```bash
  npm run lint
  npm run format
  ```

---

## 6. 주석 및 문서화 (Comments & Documentation)

### 6.1 주석 스타일

```javascript
// 단일 라인 주석
const name = "John";

/*
 * 다중 라인 주석
 * 복잡한 로직 설명
 */

/**
 * JSDoc 주석 형식
 * @param {string} userName - 사용자 이름
 * @returns {boolean} - 유효성 여부
 */
function validateUserName(userName) {
  return userName.length > 0;
}
```

### 6.2 주석 작성 규칙

- **WHAT**: 코드가 무엇을 하는가는 명확한 변수명으로 표현
- **WHY**: 왜 이 방식으로 구현했는지 설명 (필요시)
- **HOW**: 복잡한 알고리즘은 설명 주석 추가

  ```javascript
  // ✅ 좋은 주석
  // 사용자의 이메일이 유효한지 확인합니다(RFC 5322 표준 기반)
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ❌ 나쁜 주석
  // 이메일 체크
  const check = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  ```

---

## 7. 체크리스트 (Checklist Before Commit)

커밋 전 다음을 확인하세요:

- [ ] 변수/함수 이름이 camelCase인가?
- [ ] 클래스 이름이 PascalCase인가?
- [ ] 상수가 UPPER_SNAKE_CASE인가?
- [ ] 컴포넌트 파일이 PascalCase.jsx인가?
- [ ] 유틸리티 파일이 kebab-case.js인가?
- [ ] 들여쓰기가 2 스페이스인가?
- [ ] 세미콜론이 모두 붙어있는가?
- [ ] 배열 변수가 복수형인가?
- [ ] ESLint 오류가 없는가?
- [ ] 주석이 명확한가?

---

## 8. 참고 사항

- 이 컨벤션은 프로젝트 팀의 합의에 따라 수정될 수 있습니다.
- IDE에서 ESLint와 Prettier 확장 프로그램을 설치하면 자동으로 규칙을 적용할 수 있습니다.
- 새로운 규칙이 필요하면 팀원들과 논의 후 이 문서를 업데이트하세요.

---

**마지막 수정**: 2026년 2월 7일
