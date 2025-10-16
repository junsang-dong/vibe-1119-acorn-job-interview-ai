# 🔄 포트 변경 완료

백엔드 서버 포트가 **5000**에서 **8000**으로 변경되었습니다.

## 📝 변경된 파일 목록

### 1. 백엔드 서버 설정
- ✅ `backend/server.js`
  ```javascript
  const PORT = process.env.PORT || 8000;
  ```

### 2. 프론트엔드 API URL
- ✅ `frontend/src/App.jsx`
  ```javascript
  const API_URL = 'http://localhost:8000/api';
  ```

### 3. 문서 파일
- ✅ `README.md` - 모든 포트 참조 업데이트
- ✅ `START.md` - 빠른 시작 가이드 업데이트
- ✅ `USAGE_GUIDE.md` - 상세 가이드 업데이트

## 🚀 새로운 실행 방법

### 백엔드 실행
```bash
cd backend
npm start
```

**예상 출력:**
```
🚀 서버가 포트 8000에서 실행 중입니다.
📍 http://localhost:8000
✅ API 엔드포인트: http://localhost:8000/api
```

### 프론트엔드 실행
```bash
cd frontend
npm run dev
```

프론트엔드는 여전히 **http://localhost:3000**에서 실행됩니다.

## 🔗 새로운 엔드포인트

| 엔드포인트 | URL |
|-----------|-----|
| 백엔드 메인 | http://localhost:8000 |
| API 베이스 | http://localhost:8000/api |
| 헬스 체크 | http://localhost:8000/api/health |
| 주제 목록 | http://localhost:8000/api/topics |
| 질문 생성 | http://localhost:8000/api/generate-question |
| 답변 평가 | http://localhost:8000/api/evaluate-answer |

## 🧪 테스트

### 서버 상태 확인
```bash
curl http://localhost:8000/api/health
```

**응답:**
```json
{
  "status": "OK",
  "message": "AI Interview Simulator API is running",
  "timestamp": "2025-10-16T..."
}
```

## ⚙️ 환경 변수 (선택사항)

`.env` 파일에서 포트를 직접 지정할 수도 있습니다:

```bash
# .env
OPENAI_API_KEY=sk-your-api-key-here
PORT=8000
```

다른 포트를 사용하고 싶다면:
```bash
PORT=9000
```

**주의:** 포트를 변경하면 `frontend/src/App.jsx`의 `API_URL`도 함께 변경해야 합니다!

## 🔧 문제 해결

### 포트가 이미 사용 중인 경우

**macOS/Linux:**
```bash
# 8000 포트 사용 중인 프로세스 종료
lsof -ti:8000 | xargs kill
```

**Windows:**
```bash
# 8000 포트 사용 중인 프로세스 확인
netstat -ano | findstr :8000

# 프로세스 종료 (PID는 위 명령어에서 확인)
taskkill /PID <PID> /F
```

### 프론트엔드가 백엔드에 연결되지 않는 경우

1. 백엔드가 8000 포트에서 실행 중인지 확인
2. 브라우저 콘솔에서 API URL 확인
3. CORS 오류가 있다면 백엔드 재시작

## ✅ 체크리스트

변경 사항이 제대로 적용되었는지 확인하세요:

- [ ] 백엔드 서버가 8000 포트에서 실행됨
- [ ] 프론트엔드가 정상적으로 로드됨
- [ ] 면접 주제 목록이 표시됨
- [ ] 질문 생성이 작동함
- [ ] 답변 평가가 작동함

모든 항목에 체크가 완료되면 포트 변경이 성공한 것입니다! 🎉

---

**변경 완료 일시:** 2025-10-16
**이전 포트:** 5000
**새 포트:** 8000

