const Jsoup = org.jsoup.Jsoup;

function summarizeWithHuggingFace(text, replier) {
  const apiKey = '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';  // Hugging Face API 키
  const model = 'facebook/bart-large-cnn';    // 요약을 위한 모델 (BART 모델 사용)
  
  const apiUrl = 'https://api-inference.huggingface.co/models/' + model;

  try {
    const connection = new java.net.URL(apiUrl).openConnection();
    connection.setRequestMethod('POST');
    connection.setRequestProperty('Authorization', 'Bearer ' + apiKey);
    connection.setRequestProperty('Content-Type', 'application/json');
    connection.setDoOutput(true);
    connection.setDoInput(true);

    // JSON 데이터 전송
    const body = '{"inputs": "' + text.replace(/"/g, '\\"') + '"}';
    const outputStream = connection.getOutputStream();
    outputStream.write(body.getBytes('UTF-8'));
    outputStream.close();

    // 응답 처리
    const inputStream = connection.getInputStream();
    const response = Jsoup.parse(inputStream, 'UTF-8', apiUrl).text();

    return response;
  } catch (error) {
    replier.reply('요약에 실패했습니다: ' + error);
    return null;
  }
}