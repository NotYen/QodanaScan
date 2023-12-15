const scoreData = {
  'FM': '精細動作',
  'S': '社會',
  'C': '認知',
  'LR': '語言理解',
  'LE': '語言表達',
  'SLE': '社會語言表達',
  'GM': '粗大動作'
}

const score = {
  'FM': 2,
  'S': 2,
  'C': 2,
  'LR': 2,
  'LE': 2,
  'SLE': 2,
  'GM': 2,
  'O': 0,
  'D': -0.5,
  '1': -1,
}

const resultData = {
  'pass': '恭喜您的孩子目前發展在正常範圍，建議在下一檢測年齡持續追蹤。此檢測結果為系統依據孩子施測時的答題狀況自動產出的結果，僅供照顧者參考，不作醫療用途。若您對此報告或孩子的發展仍有疑慮，請洽您的兒科醫師做進一步診察。',
  'fail': '您的孩子發展篩檢檢測結過為「未通過」，建議盡快就醫確認，請洽您的兒科醫師做進一步診察。',
  '正常': '正常範圍，建議下一檢測年齡持續追蹤',
  '邊緣': '發展邊緣，有些能力稍弱，建議持續追蹤，若有疑慮請至兒科門診確認',
  '遲緩': '疑似發展遲緩，建議盡快帶孩子至兒科門診做進一步確認',
}

export { scoreData, score , resultData }