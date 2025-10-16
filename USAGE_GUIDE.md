# 📚 AI 면접 시뮬레이터 - 사용 가이드

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [시작하기](#시작하기)
3. [주요 기능](#주요-기능)
4. [API 명세](#api-명세)
5. [문제 해결](#문제-해결)
6. [고급 설정](#고급-설정)

---

## 프로젝트 개요

### 🎯 목적
실전 면접 환경을 시뮬레이션하여 면접 준비를 돕는 AI 기반 웹 애플리케이션

### 💡 핵심 가치
- **실전 연습**: 실제 면접관처럼 질문하고 평가하는 AI
- **음성 지원**: Web Speech API로 자연스러운 대화
- **즉각 피드백**: 답변 제출 즉시 상세한 평가 제공
- **다양한 직무**: 8가지 직무/분야 지원

### 🏗 아키텍처

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │ ←─────→ │   Express   │ ←─────→ │  OpenAI API │
│  (React)    │  HTTP   │   Server    │  HTTPS  │   (GPT)     │
└─────────────┘         └─────────────┘         └─────────────┘
     ↓
Web Speech API
(음성 → 텍스트)
```

---

## 시작하기

### 필수 준비사항

1. **Node.js** (v16 이상)
   ```bash
   node --version  # v16.0.0 이상인지 확인
   ```

2. **OpenAI API 키**
   - [OpenAI 플랫폼](https://platform.openai.com/api-keys)에서 발급
   - 결제 정보 등록 필요

3. **모던 브라우저**
   - Chrome 80+ (권장)
   - Edge 80+
   - Safari 14+

### 설치

#### 1단계: 프로젝트 클론 또는 다운로드
```bash
cd /Users/junsangdong/Desktop/vibe-1119-acorn-job-interview-ai
```

#### 2단계: 환경 변수 설정
```bash
# .env 파일이 이미 생성되어 있습니다
# API 키만 실제 값으로 변경하세요
nano .env
```

`.env` 파일 내용:
```
OPENAI_API_KEY=sk-실제-API-키를-여기에-입력
```

#### 3단계: 백엔드 의존성 (이미 설치됨)
```bash
cd backend
npm install  # 이미 완료됨
```

#### 4단계: 프론트엔드 의존성 (이미 설치됨)
```bash
cd ../frontend
npm install  # 이미 완료됨
```

### 실행

#### 방법 1: 수동 실행 (권장)

**터미널 1 - 백엔드:**
```bash
cd backend
npm start
```

출력 예시:
```
🚀 서버가 포트 8000에서 실행 중입니다.
📍 http://localhost:8000
✅ API 엔드포인트: http://localhost:8000/api
```

**터미널 2 - 프론트엔드:**
```bash
cd frontend
npm run dev
```

출력 예시:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

브라우저가 자동으로 http://localhost:3000 을 엽니다.

---

## 주요 기능

### 1. 면접 설정

#### 지원 직무/분야
| 직무 ID | 직무명 |
|---------|--------|
| `frontend` | 프론트엔드 개발자 |
| `backend` | 백엔드 개발자 |
| `fullstack` | 풀스택 개발자 |
| `data-science` | 데이터 사이언티스트 |
| `devops` | DevOps 엔지니어 |
| `product-manager` | 프로덕트 매니저 |
| `marketing` | 마케팅 매니저 |
| `business` | 비즈니스 애널리스트 |

#### 난이도
- **초급**: 기본 개념과 간단한 경험 질문
- **중급**: 실무 경험과 문제 해결 능력 질문
- **고급**: 심층적인 기술 및 전략적 사고 질문

### 2. 질문 생성

GPT-4o-mini 모델이 생성하는 질문 특징:
- ✅ 실무 중심
- ✅ 구체적이고 명확
- ✅ 2-3분 답변 분량
- ✅ 매번 다른 질문

예시 질문 (프론트엔드 개발자, 중급):
> "React에서 성능 최적화를 위해 사용할 수 있는 기법들에 대해 설명하고, 
> 실제 프로젝트에서 어떻게 적용했는지 경험을 공유해주세요."

### 3. 음성 답변

#### Web Speech API 사용
```javascript
// 자동으로 초기화됨
const recognition = new webkitSpeechRecognition();
recognition.lang = 'ko-KR';
recognition.continuous = true;  // 연속 인식
recognition.interimResults = true;  // 중간 결과 표시
```

#### 사용 방법
1. "🎤 음성으로 답변하기" 버튼 클릭
2. 브라우저가 마이크 권한 요청 → "허용" 클릭
3. 🔴 "녹음 중..." 표시 확인
4. 자연스럽게 답변 (실시간으로 텍스트 변환)
5. "⏹ 녹음 중지" 버튼 클릭
6. 텍스트 편집 가능
7. "답변 제출하기" 클릭

#### 팁
- 💡 천천히, 명확하게 말하기
- 💡 주변 소음이 적은 곳에서 녹음
- 💡 중요한 키워드는 또박또박 발음
- 💡 녹음 후 텍스트 확인 및 수정 가능

### 4. AI 평가

#### 평가 기준
| 항목 | 배점 | 평가 내용 |
|------|------|----------|
| **논리성** | 30점 | 답변의 논리적 구조와 일관성 |
| **전문성** | 30점 | 직무 관련 지식과 경험의 깊이 |
| **표현력** | 20점 | 명확하고 효과적인 의사소통 |
| **완성도** | 20점 | 질문에 대한 충분하고 적절한 답변 |

#### 평가 결과 구성
1. **총점** (100점 만점)
2. **세부 점수** (각 항목별)
3. **종합 피드백** (200자 이내)
4. **강점** (2가지)
5. **개선점** (2가지)

#### 평가 예시

**총점: 82점**

| 항목 | 점수 |
|------|------|
| 논리성 | 25/30 |
| 전문성 | 26/30 |
| 표현력 | 16/20 |
| 완성도 | 15/20 |

**종합 피드백:**
> React 성능 최적화 기법에 대한 이해도가 높고, 실제 경험을 구체적으로 
> 설명했습니다. 다만, 각 기법의 적용 시나리오를 더 명확히 구분하면 
> 답변의 설득력이 높아질 것입니다.

**강점:**
- ✅ React.memo, useMemo 등 구체적인 기법 언급
- ✅ 실제 프로젝트 경험 공유

**개선점:**
- 📈 각 기법의 적용 시나리오 명확화
- 📈 성능 개선 결과를 수치로 제시

---

## API 명세

### Base URL
```
http://localhost:8000/api
```

### 엔드포인트

#### 1. 헬스 체크
```http
GET /api/health
```

**응답:**
```json
{
  "status": "OK",
  "message": "AI Interview Simulator API is running",
  "timestamp": "2025-10-16T07:00:00.000Z"
}
```

#### 2. 면접 주제 목록
```http
GET /api/topics
```

**응답:**
```json
{
  "topics": [
    { "id": "frontend", "name": "프론트엔드 개발자" },
    { "id": "backend", "name": "백엔드 개발자" },
    ...
  ]
}
```

#### 3. 질문 생성
```http
POST /api/generate-question
Content-Type: application/json
```

**요청:**
```json
{
  "topic": "frontend",
  "difficulty": "intermediate"
}
```

**응답:**
```json
{
  "success": true,
  "question": "React에서 성능 최적화를 위해...",
  "topic": "프론트엔드 개발자",
  "difficulty": "중급"
}
```

#### 4. 답변 평가
```http
POST /api/evaluate-answer
Content-Type: application/json
```

**요청:**
```json
{
  "question": "React에서 성능 최적화를 위해...",
  "answer": "성능 최적화를 위해서는 먼저...",
  "topic": "frontend"
}
```

**응답:**
```json
{
  "success": true,
  "evaluation": {
    "score": 82,
    "breakdown": {
      "logic": 25,
      "expertise": 26,
      "expression": 16,
      "completeness": 15
    },
    "feedback": "React 성능 최적화 기법에 대한...",
    "strengths": ["구체적인 기법 언급", "실제 경험 공유"],
    "improvements": ["시나리오 명확화", "수치 데이터 추가"]
  }
}
```

---

## 문제 해결

### 일반적인 문제

#### 1. 백엔드 서버 시작 실패

**증상:**
```
Error: Cannot find module 'express'
```

**해결:**
```bash
cd backend
npm install
```

---

#### 2. API 키 오류

**증상:**
```
❌ 인증 실패: API 키가 잘못되었거나 만료되었습니다.
```

**해결:**
1. `.env` 파일 확인:
   ```bash
   cat .env
   ```
2. API 키가 `sk-`로 시작하는지 확인
3. OpenAI 웹사이트에서 키 상태 확인
4. 새 키 발급 후 교체

---

#### 3. 음성 인식 작동 안 함

**증상:**
- "음성으로 답변하기" 버튼 클릭 후 반응 없음
- 마이크 권한 오류

**해결:**
1. Chrome 브라우저 사용 (Firefox는 미지원)
2. HTTPS 또는 localhost에서만 작동
3. 브라우저 마이크 권한 확인:
   - Chrome: `chrome://settings/content/microphone`
   - 사이트 설정에서 허용
4. 시스템 마이크 권한 확인 (macOS):
   - 시스템 환경설정 → 보안 및 개인 정보 보호 → 마이크

---

#### 4. CORS 오류

**증상:**
```
Access to fetch at 'http://localhost:8000/api/...' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**해결:**
- 백엔드 서버가 실행 중인지 확인
- `backend/server.js`에 CORS 설정 확인:
  ```javascript
  app.use(cors());  // 이미 설정됨
  ```

---

#### 5. 포트 충돌

**증상:**
```
Error: listen EADDRINUSE: address already in use :::8000
```

**해결:**
1. 사용 중인 프로세스 종료:
   ```bash
   # macOS/Linux
   lsof -ti:8000 | xargs kill
   ```
2. 또는 다른 포트 사용:
   ```javascript
   // backend/server.js
   const PORT = process.env.PORT || 8001;
   ```

---

## 고급 설정

### 커스텀 질문 프롬프트

`backend/server.js`의 질문 생성 프롬프트 수정:

```javascript
const prompt = `당신은 ${jobTitle} 채용 면접관입니다. 
${difficultyText} 난이도의 실무 중심 면접 질문 1개를 생성해주세요.

질문은 다음 조건을 충족해야 합니다:
- 실제 업무 상황과 연관된 질문
- 지원자의 실력과 경험을 평가할 수 있는 질문
- [여기에 원하는 조건 추가]
`;
```

### 평가 기준 조정

`backend/server.js`의 평가 프롬프트 수정:

```javascript
다음 기준으로 답변을 평가해주세요:
1. 논리성 (30점): 답변의 논리적 구조와 일관성
2. 전문성 (30점): 직무 관련 지식과 경험의 깊이
3. 표현력 (20점): 명확하고 효과적인 의사소통
4. 완성도 (20점): 질문에 대한 충분하고 적절한 답변
// 배점 조정 가능
```

### 새로운 직무 추가

`backend/server.js`의 `INTERVIEW_TOPICS` 수정:

```javascript
const INTERVIEW_TOPICS = {
  'frontend': '프론트엔드 개발자',
  'backend': '백엔드 개발자',
  // ... 기존 항목
  'your-new-role': '새로운 직무명',  // 추가
};
```

### GPT 모델 변경

```javascript
// backend/server.js
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',  // 'gpt-4', 'gpt-3.5-turbo' 등으로 변경 가능
  // ...
});
```

**모델별 특징:**
- `gpt-4o-mini`: 빠르고 저렴, 충분한 품질 (권장)
- `gpt-4`: 최고 품질, 느리고 비쌈
- `gpt-3.5-turbo`: 가장 저렴, 기본적인 평가

---

## 프로덕션 배포

### 환경 변수 설정

```bash
# .env.production
OPENAI_API_KEY=your-production-key
PORT=8000
NODE_ENV=production
```

### 백엔드 빌드 및 실행

```bash
cd backend
npm start
```

### 프론트엔드 빌드

```bash
cd frontend
npm run build
```

빌드된 파일은 `frontend/dist/` 에 생성됩니다.

### 배포 옵션

1. **Vercel** (프론트엔드)
2. **Heroku** (백엔드)
3. **AWS EC2** (풀스택)
4. **Docker** (컨테이너화)

---

## 라이선스 및 기여

이 프로젝트는 교육/개발 목적으로 제작되었습니다.

**피드백 환영!** 
- 버그 리포트
- 기능 제안
- 코드 개선

---

**Made with ❤️ for Your Success**

행운을 빕니다! 🎯

