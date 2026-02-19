/**
 * AI Interview Simulator Backend Server
 * Express.js 서버로 GPT API를 통해 면접 질문 생성 및 답변 평가
 */

// Vercel에서는 환경변수를 대시보드에서 설정, 로컬에서는 .env 로드
if (!process.env.VERCEL) {
  try {
    require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
  } catch (_) {}
}
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 면접 주제 목록
const INTERVIEW_TOPICS = {
  'frontend': '프론트엔드 개발자',
  'backend': '백엔드 개발자',
  'fullstack': '풀스택 개발자',
  'data-science': '데이터 사이언티스트',
  'devops': 'DevOps 엔지니어',
  'product-manager': '프로덕트 매니저',
  'marketing': '마케팅 매니저',
  'business': '비즈니스 애널리스트',
};

/**
 * 면접 질문 생성 엔드포인트
 * POST /api/generate-question
 * Body: { topic: string, difficulty: string }
 */
app.post('/api/generate-question', async (req, res) => {
  try {
    const { topic, difficulty = 'intermediate' } = req.body;
    
    if (!topic || !INTERVIEW_TOPICS[topic]) {
      return res.status(400).json({ 
        error: '유효하지 않은 면접 주제입니다.' 
      });
    }

    const jobTitle = INTERVIEW_TOPICS[topic];
    const difficultyText = {
      'easy': '초급',
      'intermediate': '중급',
      'advanced': '고급'
    }[difficulty] || '중급';

    const prompt = `당신은 ${jobTitle} 채용 면접관입니다. 
${difficultyText} 난이도의 실무 중심 면접 질문 1개를 생성해주세요.

질문은 다음 조건을 충족해야 합니다:
- 실제 업무 상황과 연관된 질문
- 지원자의 실력과 경험을 평가할 수 있는 질문
- 너무 짧지 않고 구체적인 질문
- 답변에 2-3분 정도 소요되는 깊이 있는 질문

질문만 출력하세요. 추가 설명은 불필요합니다.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: '당신은 전문 면접관입니다.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    const question = completion.choices[0].message.content.trim();

    res.json({
      success: true,
      question,
      topic: jobTitle,
      difficulty: difficultyText,
    });

  } catch (error) {
    console.error('질문 생성 오류:', error);
    res.status(500).json({ 
      error: 'GPT API 호출 중 오류가 발생했습니다.',
      details: error.message 
    });
  }
});

/**
 * 답변 평가 엔드포인트
 * POST /api/evaluate-answer
 * Body: { question: string, answer: string, topic: string }
 */
app.post('/api/evaluate-answer', async (req, res) => {
  try {
    const { question, answer, topic } = req.body;

    if (!question || !answer || !topic) {
      return res.status(400).json({ 
        error: '질문, 답변, 주제가 모두 필요합니다.' 
      });
    }

    const jobTitle = INTERVIEW_TOPICS[topic] || topic;

    const prompt = `당신은 ${jobTitle} 채용을 담당하는 전문 면접관입니다.

면접 질문: ${question}

지원자 답변: ${answer}

다음 기준으로 답변을 평가해주세요:
1. 논리성 (30점): 답변의 논리적 구조와 일관성
2. 전문성 (30점): 직무 관련 지식과 경험의 깊이
3. 표현력 (20점): 명확하고 효과적인 의사소통
4. 완성도 (20점): 질문에 대한 충분하고 적절한 답변

JSON 형식으로 응답해주세요:
{
  "score": 총점(100점 만점),
  "breakdown": {
    "logic": 논리성 점수,
    "expertise": 전문성 점수,
    "expression": 표현력 점수,
    "completeness": 완성도 점수
  },
  "feedback": "구체적이고 건설적인 피드백 (200자 이내)",
  "strengths": ["강점1", "강점2"],
  "improvements": ["개선점1", "개선점2"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: '당신은 공정하고 전문적인 면접관입니다. 항상 JSON 형식으로 응답합니다.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: "json_object" }
    });

    const evaluation = JSON.parse(completion.choices[0].message.content);

    res.json({
      success: true,
      evaluation,
    });

  } catch (error) {
    console.error('답변 평가 오류:', error);
    res.status(500).json({ 
      error: '답변 평가 중 오류가 발생했습니다.',
      details: error.message 
    });
  }
});

/**
 * 면접 주제 목록 조회
 * GET /api/topics
 */
app.get('/api/topics', (req, res) => {
  const topics = Object.keys(INTERVIEW_TOPICS).map(key => ({
    id: key,
    name: INTERVIEW_TOPICS[key],
  }));
  
  res.json({ topics });
});

/**
 * 헬스 체크
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Interview Simulator API is running',
    timestamp: new Date().toISOString()
  });
});

// 로컬 실행 시에만 서버 시작 (Vercel 서버리스에서는 export만)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`✅ API 엔드포인트: http://localhost:${PORT}/api`);
  });
}

module.exports = app;

