# 🚀 Vercel 배포 가이드

AI 면접 시뮬레이터를 Vercel에 배포하는 방법입니다.

## ✅ 배포 전 체크리스트

- [ ] GitHub 리포지토리에 최신 코드 푸시 완료
- [ ] Vercel 계정 준비
- [ ] OpenAI API 키 준비

## 📋 1단계: GitHub 동기화

```bash
# 변경사항 확인
git status

# Vercel 배포용 파일 커밋 및 푸시
git add vercel.json api/ package.json backend/server.js frontend/src/App.jsx
git commit -m "feat: Vercel 배포 설정 추가"
git push origin main
```

## 🌐 2단계: Vercel 프로젝트 생성

### 방법 A: Vercel 대시보드 (권장)

1. [Vercel](https://vercel.com) 로그인
2. **Add New** → **Project** 클릭
3. **Import Git Repository**에서 `junsang-dong/vibe-1119-acorn-job-interview-ai` 선택
4. **Configure Project**:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build` (자동 감지됨)
   - **Output Directory**: `frontend/dist` (자동 감지됨)
   - **Install Command**: `npm run install:all` (선택사항, vercel.json에 설정됨)

5. **Environment Variables** 추가:
   | Name | Value |
   |------|-------|
   | `OPENAI_API_KEY` | `sk-your-openai-api-key` |

6. **Deploy** 클릭

### 방법 B: Vercel CLI

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 프로젝트 디렉토리에서 배포
vercel

# 환경 변수 설정 (대시보드에서 설정 권장)
vercel env add OPENAI_API_KEY
```

## 🔐 3단계: 환경 변수 설정

Vercel 대시보드 → **Settings** → **Environment Variables**:

| 변수명 | 값 | 환경 |
|--------|-----|------|
| `OPENAI_API_KEY` | OpenAI API 키 (sk-...) | Production, Preview |

> ⚠️ **보안**: API 키는 절대 Git에 커밋하지 마세요. Vercel 대시보드에서만 설정합니다.

## 📁 프로젝트 구조 (Vercel)

```
vibe-1119-acorn-job-interview-ai/
├── api/
│   └── index.js          # Vercel Serverless Function (Express API)
├── backend/
│   └── server.js         # Express API (서버리스 호환)
├── frontend/
│   ├── src/
│   └── dist/             # 빌드 결과물
├── vercel.json           # Vercel 설정
├── package.json          # 루트 빌드 스크립트
└── .env                  # 로컬 전용 (Git 제외)
```

## 🔗 라우팅

| 경로 | 처리 |
|------|------|
| `/api/*` | Express API (Serverless Function) |
| `/*` | React SPA (frontend/dist) |

## 🧪 배포 확인

1. **API 헬스 체크**: `https://your-app.vercel.app/api/health`
2. **앱 접속**: `https://your-app.vercel.app`
3. 면접 직무 선택 → 질문 생성 → 답변 평가 테스트

## 🔧 문제 해결

### 빌드 실패
- **Node 버전**: 프로젝트에 `engines.node: ">=18"` 설정됨
- **의존성**: `npm run install:all`이 frontend, backend 모두 설치

### API 500 오류
- `OPENAI_API_KEY` 환경 변수 확인
- Vercel 대시보드 → Settings → Environment Variables

### CORS 오류
- 백엔드에 `cors()` 미들웨어 적용됨
- 동일 오리진 배포 시 CORS 이슈 없음

## 📞 참고 링크

- [Vercel 문서](https://vercel.com/docs)
- [GitHub 저장소](https://github.com/junsang-dong/vibe-1119-acorn-job-interview-ai)
