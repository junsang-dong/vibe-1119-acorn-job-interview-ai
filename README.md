# 🎯 AI 면접 시뮬레이터

GPT API를 활용한 실전 면접 연습 웹 애플리케이션입니다.
음성 인식 기술로 자연스럽게 답변하고, AI로부터 전문적인 피드백을 받을 수 있습니다.

## ✨ 주요 기능

### 1. 📋 면접 질문 생성
- 8가지 직무/분야 선택 가능
- 난이도별 맞춤 질문 (초급/중급/고급)
- GPT가 실무 중심의 질문을 자동 생성

### 2. 🎤 음성 답변
- Web Speech API를 활용한 실시간 음성 인식
- 한국어 음성을 텍스트로 자동 변환
- 텍스트 직접 입력도 가능

### 3. 📊 AI 평가 시스템
- **100점 만점 채점**
  - 논리성 (30점)
  - 전문성 (30점)
  - 표현력 (20점)
  - 완성도 (20점)
- 구체적이고 건설적인 피드백 제공
- 강점과 개선점 분석

## 🛠 기술 스택

### Frontend
- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구
- **Web Speech API** - 음성 인식
- **CSS3** - 모던 스타일링

### Backend
- **Node.js** - 런타임
- **Express.js** - 웹 프레임워크
- **OpenAI API** - GPT-4o-mini 모델
- **CORS** - Cross-Origin 지원

## 📦 프로젝트 구조

```
vibe-1119-acorn-job-interview-ai/
├── backend/                 # Express.js 서버
│   ├── server.js           # API 서버
│   ├── package.json
│   └── node_modules/
├── frontend/               # React 앱
│   ├── src/
│   │   ├── App.jsx        # 메인 컴포넌트
│   │   ├── App.css        # 스타일
│   │   ├── main.jsx       # 엔트리 포인트
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .env                    # 환경 변수 (API 키)
├── .gitignore
└── README.md
```

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js 16+ 설치
- OpenAI API 키

### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 API 키를 입력하세요:

```bash
OPENAI_API_KEY=sk-your-api-key-here
```

### 2. 백엔드 서버 실행

```bash
# 백엔드 디렉토리로 이동
cd backend

# 의존성 설치 (이미 완료됨)
npm install

# 서버 시작
npm start
```

서버가 http://localhost:8000 에서 실행됩니다.

### 3. 프론트엔드 실행

새 터미널 창을 열고:

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치 (이미 완료됨)
npm install

# 개발 서버 시작
npm run dev
```

브라우저가 자동으로 http://localhost:3000 을 엽니다.

## 📖 사용 방법

### 1단계: 면접 설정
1. 면접 직무/분야 선택 (예: 프론트엔드 개발자)
2. 난이도 선택 (초급/중급/고급)
3. "면접 시작하기" 클릭

### 2단계: 질문 확인
- GPT가 생성한 면접 질문을 확인
- "답변 시작하기" 클릭

### 3단계: 답변
- 🎤 **음성 답변**: "음성으로 답변하기" 버튼 클릭
  - 마이크 권한 허용
  - 자연스럽게 답변 (실시간 텍스트 변환)
  - "녹음 중지" 클릭
- ⌨️ **텍스트 답변**: 직접 타이핑도 가능
- "답변 제출하기" 클릭

### 4단계: 결과 확인
- 100점 만점 점수 확인
- 세부 평가 항목별 점수
- AI의 종합 피드백
- 강점 및 개선점 분석

## 🔧 API 엔드포인트

### `GET /api/health`
서버 상태 확인

### `GET /api/topics`
면접 주제 목록 조회

### `POST /api/generate-question`
면접 질문 생성
```json
{
  "topic": "frontend",
  "difficulty": "intermediate"
}
```

### `POST /api/evaluate-answer`
답변 평가
```json
{
  "question": "면접 질문",
  "answer": "지원자 답변",
  "topic": "frontend"
}
```

## 🎨 주요 화면

1. **면접 설정 화면** - 직무와 난이도 선택
2. **질문 화면** - AI가 생성한 면접 질문 표시
3. **답변 화면** - 음성/텍스트로 답변 입력
4. **결과 화면** - 점수 및 피드백 확인

## 🌐 브라우저 호환성

- Chrome 80+ ✅ (권장)
- Edge 80+ ✅
- Safari 14+ ✅ (음성 인식 제한적)
- Firefox 75+ ⚠️ (Web Speech API 미지원)

**참고**: 음성 인식 기능은 Chrome 브라우저에서 가장 잘 작동합니다.

## 🔐 보안 주의사항

- ⚠️ `.env` 파일을 절대 Git에 커밋하지 마세요
- API 키는 안전하게 관리하세요
- 프로덕션 환경에서는 환경 변수를 서버에서 관리하세요

## 🐛 문제 해결

### 음성 인식이 작동하지 않을 때
- Chrome 브라우저를 사용하세요
- 마이크 권한을 확인하세요
- HTTPS 또는 localhost에서만 작동합니다

### API 오류가 발생할 때
- `.env` 파일의 API 키를 확인하세요
- OpenAI API 크레딧 잔액을 확인하세요
- 백엔드 서버가 실행 중인지 확인하세요

### CORS 오류가 발생할 때
- 백엔드와 프론트엔드가 모두 실행 중인지 확인
- 포트 번호가 올바른지 확인 (백엔드: 8000, 프론트엔드: 3000)

## 📝 개발 참고사항

### 면접 주제 추가
`backend/server.js`의 `INTERVIEW_TOPICS` 객체에 추가:
```javascript
const INTERVIEW_TOPICS = {
  'your-topic': '새로운 직무명',
  // ...
};
```

### 평가 기준 수정
`backend/server.js`의 `/api/evaluate-answer` 엔드포인트에서 프롬프트 수정

## 📄 라이선스

교육/개발용 프로젝트입니다.

## 👥 기여

피드백과 개선 제안을 환영합니다!

---

**Made with ❤️ for Interview Success**

