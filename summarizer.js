// api/summarize.js (Vercel 서버의 API 핸들러)
module.exports = async (req, res) => {
  const fetch = require('node-fetch'); // node-fetch 라이브러리 사용 (Vercel의 기본 환경에서 사용 가능)
  const apiKey = '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';
  const model = 'facebook/bart-large-cnn';

  const apiUrl = 'https://api-inference.huggingface.co/models/' + model;
  const text = req.body.text;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });

    const result = await response.json();
    res.status(200).json({ summary: result[0] ? result[0].summary_text : '요약을 처리할 수 없습니다.' });
  } catch (error) {
    res.status(500).json({ error: '요약에 실패했습니다: ' + error.message });
  }
};
