import correctSentence from './correctSentence.js'

test('returns correct sentence', () => {
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.")
  expect(correctSentence("пРевЕд, Медвед!")).toBe("ПРевЕд, Медвед!.")
  expect(correctSentence(".Добрыйдень")).toBe(".Добрыйдень.")
})
