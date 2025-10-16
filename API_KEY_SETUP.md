# 🔑 API 키 설정 가이드

현재 .env 파일에 실제 API 키가 설정되지 않아서 백엔드 서버가 정상적으로 작동하지 않습니다.

## 🚨 문제 상황

- ✅ .env 파일이 생성됨
- ❌ API 키가 `sk-xxxxxxxx...` (더미 값)으로 설정됨
- ❌ 백엔드 서버가 API 호출 시 401 오류 발생
- ❌ 프론트엔드에서 "면접 주제를 불러오는데 실패했습니다" 오류

## 🔧 해결 방법

### 1단계: OpenAI API 키 발급

1. [OpenAI 플랫폼](https://platform.openai.com/api-keys) 방문
2. 계정 로그인 (회원가입 필요)
3. "Create new secret key" 클릭
4. API 키 복사 (sk-로 시작하는 긴 문자열)

### 2단계: .env 파일 수정

터미널에서 다음 명령어로 .env 파일을 편집하세요:

```bash
# 방법 1: nano 에디터 사용
nano .env

# 방법 2: vim 에디터 사용
vim .env

# 방법 3: macOS 텍스트 에디터로 열기
open .env
```

`.env` 파일에서 다음 줄을 수정:
```bash
# 변경 전
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 변경 후 (실제 API 키로 교체)
OPENAI_API_KEY=sk-실제-API-키를-여기에-붙여넣기
```

### 3단계: API 키 검증

```bash
python3 validate_gpt_key.py
```

**성공 메시지 예시:**
```
✅ API 키 유효성 검증 성공: GPT API가 정상 작동 중입니다.
모델 응답: 안녕하세요! 정상적으로 응답하고 있습니다.
```

### 4단계: 백엔드 서버 재시작

```bash
cd backend
npm start
```

### 5단계: 프론트엔드 테스트

```bash
# 새 터미널에서
cd frontend
npm run dev
```

## 💡 API 키 발급 시 주의사항

### 결제 정보 등록 필요
- OpenAI API는 유료 서비스입니다
- 신용카드 등 결제 정보 등록 필요
- 사용량에 따라 요금 부과 (GPT-4o-mini는 상대적으로 저렴)

### API 키 보안
- ⚠️ API 키를 절대 공개하지 마세요
- GitHub 등 공개 저장소에 업로드 금지
- .env 파일은 .gitignore에 포함되어 있음

### 사용량 제한
- 무료 크레딧: $5 (신규 계정)
- GPT-4o-mini: $0.00015/1K 토큰 (매우 저렴)
- 면접 시뮬레이터 사용량: 월 수천 원 이하 예상

## 🧪 테스트 방법

### 1. API 키 검증
```bash
python3 validate_gpt_key.py
```

### 2. 백엔드 헬스 체크
```bash
curl http://localhost:8000/api/health
```

**정상 응답:**
```json
{
  "status": "OK",
  "message": "AI Interview Simulator API is running"
}
```

### 3. 면접 주제 목록 확인
```bash
curl http://localhost:8000/api/topics
```

### 4. 프론트엔드 접속
http://localhost:3000 에서 면접 주제가 정상적으로 표시되는지 확인

## 🆘 문제 해결

### API 키 오류가 계속 발생하는 경우

1. **API 키 형식 확인**
   ```bash
   # 올바른 형식: sk-로 시작, 50자 이상
   echo $OPENAI_API_KEY | head -c 10
   # 출력: sk-proj-xx (예시)
   ```

2. **OpenAI 계정 상태 확인**
   - 결제 정보 등록 완료 여부
   - API 키 활성화 상태
   - 사용량 한도 확인

3. **네트워크 연결 확인**
   ```bash
   ping api.openai.com
   ```

### 여전히 문제가 있는 경우

1. 새 API 키 발급
2. .env 파일 재생성
3. 백엔드 서버 재시작

---

**API 키 설정이 완료되면 AI 면접 시뮬레이터를 정상적으로 사용할 수 있습니다!** 🎉

## 📞 추가 도움

- [OpenAI API 문서](https://platform.openai.com/docs)
- [OpenAI 지원 센터](https://help.openai.com/)

---

**설정 완료 후 다음 명령어로 서버를 시작하세요:**

```bash
# 터미널 1 - 백엔드
cd backend && npm start

# 터미널 2 - 프론트엔드  
cd frontend && npm run dev
```
