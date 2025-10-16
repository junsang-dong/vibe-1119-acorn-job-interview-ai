# 🚀 AI 면접 시뮬레이터 배포 가이드

GitHub과 Netlify를 통한 배포 방법을 안내합니다.

## 📋 배포 전 준비사항

### 1. 필수 요구사항
- GitHub 계정
- Netlify 계정
- OpenAI API 키 (유료)
- Node.js 18+ (로컬 빌드용)

### 2. 프로젝트 구조
```
ai-interview-simulator/
├── frontend/                 # React + Vite (Netlify 배포)
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── dist/                # 빌드 결과물
├── backend/                 # Express.js (별도 배포)
│   ├── server.js
│   ├── package.json
│   └── .env                 # API 키 (보안)
├── netlify.toml             # Netlify 설정
├── .gitignore              # Git 무시 파일
└── README.md
```

## 🔧 1단계: 백엔드 배포 (Heroku/Railway)

### Heroku 배포 (권장)

1. **Heroku 계정 생성**
   - [Heroku](https://heroku.com) 회원가입

2. **Heroku CLI 설치**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # 또는 공식 사이트에서 다운로드
   ```

3. **Heroku 앱 생성**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **환경 변수 설정**
   ```bash
   heroku config:set OPENAI_API_KEY=sk-your-actual-api-key
   ```

5. **배포**
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

### Railway 배포 (대안)

1. **Railway 계정 생성**
   - [Railway](https://railway.app) 회원가입

2. **GitHub 연결 후 자동 배포**
   - GitHub 저장소 연결
   - 환경 변수 설정: `OPENAI_API_KEY`

## 🌐 2단계: 프론트엔드 배포 (Netlify)

### 방법 1: GitHub 연동 (권장)

1. **GitHub 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ai-interview-simulator.git
   git push -u origin main
   ```

2. **Netlify에서 배포**
   - [Netlify](https://netlify.com) 로그인
   - "New site from Git" 클릭
   - GitHub 저장소 선택
   - 빌드 설정:
     - **Build command**: `cd frontend && npm run build`
     - **Publish directory**: `frontend/dist`

3. **환경 변수 설정**
   - Site settings → Environment variables
   - `VITE_API_URL`: `https://your-backend-app.herokuapp.com/api`

### 방법 2: 드래그 앤 드롭

1. **프론트엔드 빌드**
   ```bash
   cd frontend
   npm run build
   ```

2. **Netlify에 배포**
   - [Netlify](https://netlify.com) 로그인
   - "Sites" → "Add new site" → "Deploy manually"
   - `frontend/dist` 폴더를 드래그 앤 드롭

## 🔐 3단계: 환경 변수 설정

### 백엔드 (Heroku)
```bash
heroku config:set OPENAI_API_KEY=sk-your-actual-api-key
heroku config:set NODE_ENV=production
```

### 프론트엔드 (Netlify)
- Site settings → Environment variables
```
VITE_API_URL=https://your-backend-app.herokuapp.com/api
```

## 🧪 4단계: 배포 테스트

### 백엔드 테스트
```bash
curl https://your-backend-app.herokuapp.com/api/health
```

### 프론트엔드 테스트
- Netlify에서 제공하는 URL 접속
- 면접 시뮬레이터 정상 작동 확인

## 📁 배포용 파일 정리

### 포함할 파일
```
✅ frontend/src/          # React 소스 코드
✅ frontend/package.json  # 의존성
✅ frontend/vite.config.js # 빌드 설정
✅ backend/server.js      # Express 서버
✅ backend/package.json   # 백엔드 의존성
✅ netlify.toml          # Netlify 설정
✅ .gitignore            # Git 무시 파일
✅ README.md             # 프로젝트 설명
```

### 제외할 파일
```
❌ node_modules/         # 의존성 (npm install로 설치)
❌ .env                  # API 키 (환경 변수로 설정)
❌ frontend/dist/        # 빌드 결과물 (자동 생성)
❌ backend/node_modules/ # 백엔드 의존성
```

## 🔧 로컬 빌드 테스트

### 프론트엔드 빌드
```bash
cd frontend
npm install
npm run build
```

### 백엔드 테스트
```bash
cd backend
npm install
npm start
```

## 🚀 자동 배포 설정

### GitHub Actions (선택사항)

`.github/workflows/deploy.yml` 생성:
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend && npm install && npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=frontend/dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 💰 비용 정보

### 무료 플랜
- **Netlify**: 무제한 사이트, 100GB 대역폭
- **Heroku**: 550시간/월 (월 550시간 초과 시 $7/월)
- **Railway**: $5 크레딧/월

### 추천 구성
- **프론트엔드**: Netlify (무료)
- **백엔드**: Railway ($5/월) 또는 Heroku (무료 플랜)

## 🛠 문제 해결

### 빌드 실패
```bash
# 의존성 재설치
cd frontend && rm -rf node_modules package-lock.json
npm install
npm run build
```

### API 연결 오류
- 환경 변수 `VITE_API_URL` 확인
- 백엔드 CORS 설정 확인
- 브라우저 개발자 도구에서 네트워크 오류 확인

### 도메인 설정
- Netlify에서 커스텀 도메인 설정 가능
- SSL 인증서 자동 발급

## 📞 지원

- [Netlify 문서](https://docs.netlify.com/)
- [Heroku 문서](https://devcenter.heroku.com/)
- [Railway 문서](https://docs.railway.app/)

---

**배포 완료 후 AI 면접 시뮬레이터를 전 세계와 공유하세요!** 🌍✨
