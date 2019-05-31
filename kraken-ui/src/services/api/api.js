class DataAPI {
  constructor(api, baseURL) {
    this.api = api.create({
      baseURL,
    });
  }

  getOptions () {
    return this.api.get('/options');
  }

  saveNode () {
    return this.api.get('/node');
  }

  searchGraphs (query, size, vocabType) {
    return this.api.get(`/search?query=${query}&size=${size}&vocabulary_type=${vocabType}`);
  }

  getVocabularyTypes () {
    return this.api.get('/vocabularyTypes');
  }

  getEdgeTypes () {
    return this.api.get('/edgeTypes');
  }

}

export default DataAPI;

