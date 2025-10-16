# 🎯 AI 면접 시뮬레이터 - 배포 버전

GPT API를 활용한 실전 면접 연습 웹 애플리케이션의 배포 버전입니다.

## 🌐 라이브 데모

- **프론트엔드**: [Netlify 배포 URL]
- **백엔드 API**: [Heroku/Railway 배포 URL]

## 🚀 빠른 시작

### 로컬 실행
```bash
# 백엔드
cd backend && npm start

# 프론트엔드
cd frontend && npm run dev
```

### 배포
```bash
# 프론트엔드 빌드
cd frontend && npm run build

# GitHub에 푸시
git add .
git commit -m "Deploy to production"
git push origin main
```

## 📦 배포 아키텍처

```
GitHub Repository
├── frontend/ (React + Vite) → Netlify
└── backend/ (Express.js) → Heroku/Railway
```

## 🔧 환경 변수

### 프론트엔드 (Netlify)
- `VITE_API_URL`: 백엔드 API URL

### 백엔드 (Heroku/Railway)
- `OPENAI_API_KEY`: OpenAI API 키
- `NODE_ENV`: production

## 📚 문서

- [배포 가이드](./DEPLOYMENT_GUIDE.md)
- [빠른 배포](./QUICK_DEPLOY.md)
- [사용 가이드](./USAGE_GUIDE.md)

## 🛠 기술 스택

- **Frontend**: React 18, Vite, CSS3
- **Backend**: Node.js, Express.js
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Netlify, Heroku/Railway

## 📄 라이선스

교육/개발용 프로젝트입니다.

---

**Made with ❤️ for Interview Success**
