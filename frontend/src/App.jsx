import { useState, useEffect } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function App() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [step, setStep] = useState('setup'); // setup, question, answer, result

  // Web Speech API 초기화
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = 'ko-KR';
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setAnswer(prev => prev + finalTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('음성 인식 오류:', event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn('이 브라우저는 Web Speech API를 지원하지 않습니다.');
    }
  }, []);

  // 면접 주제 목록 로드
  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch(`${API_URL}/topics`);
      const data = await response.json();
      setTopics(data.topics);
      if (data.topics.length > 0) {
        setSelectedTopic(data.topics[0].id);
      }
    } catch (error) {
      console.error('주제 로드 실패:', error);
      alert('면접 주제를 불러오는데 실패했습니다.');
    }
  };

  const generateQuestion = async () => {
    if (!selectedTopic) {
      alert('면접 주제를 선택해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/generate-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: selectedTopic, difficulty }),
      });

      const data = await response.json();
      if (data.success) {
        setQuestion(data.question);
        setStep('question');
      } else {
        alert('질문 생성에 실패했습니다: ' + data.error);
      }
    } catch (error) {
      console.error('질문 생성 오류:', error);
      alert('질문 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = () => {
    if (recognition) {
      setAnswer('');
      recognition.start();
      setIsRecording(true);
    } else {
      alert('음성 인식을 사용할 수 없습니다. 텍스트로 입력해주세요.');
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert('답변을 입력하거나 녹음해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/evaluate-answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          answer,
          topic: selectedTopic,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setEvaluation(data.evaluation);
        setStep('result');
      } else {
        alert('답변 평가에 실패했습니다: ' + data.error);
      }
    } catch (error) {
      console.error('답변 평가 오류:', error);
      alert('답변 평가 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetInterview = () => {
    setQuestion('');
    setAnswer('');
    setEvaluation(null);
    setStep('setup');
  };

  const startAnswering = () => {
    setStep('answer');
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🎯 AI 면접 시뮬레이터</h1>
          <p>실전처럼 연습하고, AI의 전문적인 피드백을 받아보세요</p>
        </header>

        {step === 'setup' && (
          <div className="setup-section">
            <div className="form-group">
              <label htmlFor="topic">면접 직무/분야</label>
              <select
                id="topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="select"
              >
                {topics.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">난이도</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="select"
              >
                <option value="easy">초급</option>
                <option value="intermediate">중급</option>
                <option value="advanced">고급</option>
              </select>
            </div>

            <button
              onClick={generateQuestion}
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? '질문 생성 중...' : '면접 시작하기'}
            </button>
          </div>
        )}

        {step === 'question' && (
          <div className="question-section">
            <div className="card">
              <h2>📋 면접 질문</h2>
              <p className="question-text">{question}</p>
            </div>
            <button onClick={startAnswering} className="btn btn-primary">
              답변 시작하기
            </button>
          </div>
        )}

        {step === 'answer' && (
          <div className="answer-section">
            <div className="card">
              <h3>📋 질문</h3>
              <p className="question-text-small">{question}</p>
            </div>

            <div className="card">
              <h3>💬 답변</h3>
              
              <div className="recording-controls">
                {recognition && (
                  <>
                    {!isRecording ? (
                      <button onClick={startRecording} className="btn btn-record">
                        🎤 음성으로 답변하기
                      </button>
                    ) : (
                      <button onClick={stopRecording} className="btn btn-stop">
                        ⏹ 녹음 중지
                      </button>
                    )}
                  </>
                )}
                {isRecording && <span className="recording-indicator">🔴 녹음 중...</span>}
              </div>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="여기에 답변을 입력하거나 음성으로 답변해주세요..."
                className="textarea"
                rows="10"
              />

              <div className="button-group">
                <button
                  onClick={submitAnswer}
                  disabled={isLoading || !answer.trim()}
                  className="btn btn-primary"
                >
                  {isLoading ? '평가 중...' : '답변 제출하기'}
                </button>
                <button onClick={resetInterview} className="btn btn-secondary">
                  처음으로
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'result' && evaluation && (
          <div className="result-section">
            <div className="card">
              <h2>📊 평가 결과</h2>
              
              <div className="score-display">
                <div className="total-score">
                  <span className="score-label">종합 점수</span>
                  <span className="score-value">{evaluation.score}점</span>
                </div>

                <div className="score-breakdown">
                  <div className="score-item">
                    <span>논리성</span>
                    <span>{evaluation.breakdown.logic}점</span>
                  </div>
                  <div className="score-item">
                    <span>전문성</span>
                    <span>{evaluation.breakdown.expertise}점</span>
                  </div>
                  <div className="score-item">
                    <span>표현력</span>
                    <span>{evaluation.breakdown.expression}점</span>
                  </div>
                  <div className="score-item">
                    <span>완성도</span>
                    <span>{evaluation.breakdown.completeness}점</span>
                  </div>
                </div>
              </div>

              <div className="feedback-section">
                <h3>💡 종합 피드백</h3>
                <p className="feedback-text">{evaluation.feedback}</p>
              </div>

              {evaluation.strengths && evaluation.strengths.length > 0 && (
                <div className="strengths-section">
                  <h3>✅ 강점</h3>
                  <ul>
                    {evaluation.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.improvements && evaluation.improvements.length > 0 && (
                <div className="improvements-section">
                  <h3>📈 개선점</h3>
                  <ul>
                    {evaluation.improvements.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button onClick={resetInterview} className="btn btn-primary">
                새로운 면접 시작
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>처리 중입니다...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
