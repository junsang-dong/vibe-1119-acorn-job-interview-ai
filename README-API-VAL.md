# GPT API 키 유효성 검사 스크립트

바이브코딩 입문자를 위한 GPT API 키 검증 도구입니다.

## 📋 개요

이 스크립트는 OpenAI GPT API 키의 유효성과 정상 작동 여부를 안전하게 검증합니다.

## 🚀 사용 방법

### 1. 패키지 설치

**macOS/Linux 사용자:**
```bash
pip3 install -r requirements.txt
```

**Windows 사용자:**
```bash
pip install -r requirements.txt
```

또는 개별 설치:

**macOS/Linux:**
```bash
pip3 install openai python-dotenv
```

**Windows:**
```bash
pip install openai python-dotenv
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 API 키를 설정하세요:

```bash
cp .env.example .env
```

`.env` 파일을 열어 실제 API 키로 수정:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. 스크립트 실행

**macOS/Linux 사용자:**
```bash
python3 validate_gpt_key.py
```

**Windows 사용자:**
```bash
python validate_gpt_key.py
```

## ✅ 성공 예시

```
🔍 GPT API 키 유효성 검사 중...

✅ API 키 유효성 검증 성공: GPT API가 정상 작동 중입니다.
모델 응답: 안녕하세요! 정상적으로 응답하고 있습니다.

✅ 검증 완료: API를 사용할 준비가 되었습니다.
```

## ❌ 오류 예시

### 인증 실패
```
❌ 인증 실패: API 키가 잘못되었거나 만료되었습니다.
→ 환경변수(OPENAI_API_KEY)를 다시 확인하세요.
```

### 요청 한도 초과
```
🚫 요청 한도 초과: API 사용량이 초과되었습니다.
→ 잠시 후 다시 시도하거나, 요금제를 확인하세요.
```

### 네트워크 오류
```
🌐 네트워크 오류: API 서버에 연결할 수 없습니다.
→ 인터넷 연결 상태를 확인하세요.
```

## 🔐 보안 주의사항

- ⚠️ **절대로 API 키를 코드에 직접 작성하지 마세요!**
- `.env` 파일은 `.gitignore`에 추가하여 Git에 커밋되지 않도록 하세요.
- API 키는 안전하게 관리하고, 공개 저장소에 올리지 마세요.

## 📦 다른 프로그램에서 사용하기

이 스크립트는 다른 Python 프로그램에서도 import하여 사용할 수 있습니다:

```python
from validate_gpt_key import check_gpt_key

if check_gpt_key():
    print("API 키가 유효합니다. 작업을 계속합니다.")
else:
    print("API 키 검증에 실패했습니다.")
```

## 💡 명령어 요약

### macOS/Linux에서:
```bash
# 패키지 설치
pip3 install -r requirements.txt

# 스크립트 실행
python3 validate_gpt_key.py
```

### Windows에서:
```bash
# 패키지 설치
pip install -r requirements.txt

# 스크립트 실행
python validate_gpt_key.py
```

## 📝 주요 기능

- ✅ 환경 변수 기반 API 키 관리
- ✅ 실제 API 호출을 통한 유효성 검증
- ✅ 상세한 오류 유형별 처리
- ✅ 재사용 가능한 함수 구조
- ✅ 초보자 친화적인 메시지

## 🛠 기술 스택

- Python 3.7+
- OpenAI Python SDK
- python-dotenv

## 📄 라이선스

교육/개발용 예제 코드입니다.

