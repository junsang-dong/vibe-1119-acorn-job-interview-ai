"""
validate_gpt_key.py
GPT API 키 유효성 및 작동 상태를 점검하는 스크립트입니다.
교육/개발용 예제로, 실제 서비스 환경에서는 키를 하드코딩하지 마세요.

사용 방법:
1. .env 파일에 OPENAI_API_KEY를 설정하세요.
2. 필요한 패키지 설치: pip3 install openai python-dotenv (macOS/Linux) 또는 pip install openai python-dotenv (Windows)
3. 스크립트 실행: python3 validate_gpt_key.py (macOS/Linux) 또는 python validate_gpt_key.py (Windows)
"""

import os
from dotenv import load_dotenv
from openai import OpenAI, AuthenticationError, RateLimitError, APIConnectionError


def check_gpt_key():
    """
    GPT API 키의 유효성과 정상 작동 여부를 검증합니다.
    
    Returns:
        bool: API가 정상 작동하면 True, 실패하면 False를 반환합니다.
    """
    # .env 파일에서 환경 변수 로드
    load_dotenv()
    
    # API 키 확인
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        print("❌ API 키를 찾을 수 없습니다.")
        print("→ .env 파일에 OPENAI_API_KEY를 설정해주세요.")
        return False
    
    # API 키가 존재하면 유효성 검증
    try:
        # OpenAI 클라이언트 초기화
        client = OpenAI(api_key=api_key)
        
        # 간단한 ChatCompletion 요청으로 API 테스트
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # 또는 "gpt-3.5-turbo"
            messages=[
                {
                    "role": "user",
                    "content": "안녕하세요. API 테스트 중입니다. 간단히 응답해주세요."
                }
            ],
            max_tokens=50
        )
        
        # 응답 추출
        ai_response = response.choices[0].message.content
        
        # 성공 메시지 출력
        print("✅ API 키 유효성 검증 성공: GPT API가 정상 작동 중입니다.")
        print(f"모델 응답: {ai_response}")
        
        return True
    
    except AuthenticationError as e:
        """인증 실패 처리"""
        print("❌ 인증 실패: API 키가 잘못되었거나 만료되었습니다.")
        print("→ 환경변수(OPENAI_API_KEY)를 다시 확인하세요.")
        print(f"상세 오류: {str(e)}")
        return False
    
    except RateLimitError as e:
        """요청 한도 초과 처리"""
        print("🚫 요청 한도 초과: API 사용량이 초과되었습니다.")
        print("→ 잠시 후 다시 시도하거나, 요금제를 확인하세요.")
        print(f"상세 오류: {str(e)}")
        return False
    
    except APIConnectionError as e:
        """네트워크 오류 처리"""
        print("🌐 네트워크 오류: API 서버에 연결할 수 없습니다.")
        print("→ 인터넷 연결 상태를 확인하세요.")
        print(f"상세 오류: {str(e)}")
        return False
    
    except Exception as e:
        """예기치 못한 오류 처리"""
        print("⚠️ 예기치 못한 오류가 발생했습니다.")
        print(f"오류 유형: {type(e).__name__}")
        print(f"상세 오류: {str(e)}")
        return False


if __name__ == "__main__":
    """메인 실행 블록"""
    print("🔍 GPT API 키 유효성 검사 중...\n")
    
    result = check_gpt_key()
    
    if result:
        print("\n✅ 검증 완료: API를 사용할 준비가 되었습니다.")
    else:
        print("\n❌ 검증 실패: 문제를 해결한 후 다시 시도해주세요.")

