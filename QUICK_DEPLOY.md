# ⚡ 빠른 배포 가이드

AI 면접 시뮬레이터를 GitHub + Netlify로 빠르게 배포하는 방법입니다.

## 🎯 배포 아키텍처

```
GitHub Repository
├── frontend/ (React + Vite) → Netlify 배포
└── backend/ (Express.js) → Heroku/Railway 배포
```

## 🚀 1단계: GitHub 저장소 생성

```bash
# 프로젝트 디렉토리에서
git init
git add .
git commit -m "Initial commit: AI Interview Simulator"
git remote add origin https://github.com/YOUR_USERNAME/ai-interview-simulator.git
git push -u origin main
```

## 🌐 2단계: Netlify 배포 (프론트엔드)

### 자동 배포 설정
1. [Netlify](https://netlify.com) 로그인
2. "New site from Git" 클릭
3. GitHub 선택 → 저장소 연결
4. 빌드 설정:
   - **Build command**: `cd frontend && npm run build`
   - **Publish directory**: `frontend/dist`

### 환경 변수 설정
- Site settings → Environment variables
- `VITE_API_URL`: `https://YOUR_BACKEND_URL/api`

## 🔧 3단계: 백엔드 배포

### 옵션 A: Heroku (무료)
```bash
cd backend
heroku create your-app-name
heroku config:set OPENAI_API_KEY=sk-your-actual-api-key
git subtree push --prefix backend heroku main
```

### 옵션 B: Railway (추천)
1. [Railway](https://railway.app) 로그인
2. GitHub 저장소 연결
3. 환경 변수 설정: `OPENAI_API_KEY`

## 🔐 4단계: API 키 설정

### 백엔드 환경 변수
```bash
# Heroku
heroku config:set OPENAI_API_KEY=sk-your-actual-api-key

# Railway (웹 대시보드에서 설정)
OPENAI_API_KEY=sk-your-actual-api-key
```

### 프론트엔드 환경 변수 (Netlify)
```
VITE_API_URL=https://your-backend-app.herokuapp.com/api
```

## ✅ 5단계: 배포 완료

### 테스트
1. **백엔드**: `https://your-backend-url/api/health`
2. **프론트엔드**: Netlify 제공 URL 접속

### 결과
- ✅ 프론트엔드: `https://your-app.netlify.app`
- ✅ 백엔드: `https://your-backend.herokuapp.com`
- ✅ AI 면접 시뮬레이터 완전 작동!

## 💡 팁

### 무료 플랜 활용
- **Netlify**: 무제한 사이트, 100GB 대역폭
- **Railway**: $5 크레딧/월 (추천)
- **Heroku**: 550시간/월 (제한적)

### 커스텀 도메인
- Netlify에서 `your-domain.com` 설정 가능
- SSL 인증서 자동 발급

### 자동 배포
- GitHub에 push하면 자동으로 재배포
- Pull Request 미리보기 지원

---

**5분 안에 전 세계와 AI 면접 시뮬레이터를 공유하세요!** 🌍✨
