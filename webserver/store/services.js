import axios from 'axios'

const baseUrl = ''

class Services {
  getWechatSignature (url) {
    return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
  }

  getUserByOAuth (url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
  }

  getWechatOAuth (url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${encodeURIComponent(url)}`)
  }

  createOrder ({ productId, name, address, phoneNumber }) {
    return axios.post(`${baseUrl}/wechat-pay`, {
      productId,
      name,
      address,
      phoneNumber
    })
  }

  getPayments () {
    return axios.get(`${baseUrl}/admin/payments`)
  }

  fetchWords (sentence) {
    return axios.get(`${baseUrl}/words?sentence=${sentence}`)
  }

  fetchQuestions (term) {
    return axios.get(`${baseUrl}/questions?term=${term}`)
  }

  fetchQuestion (rootId) {
    return axios.get(`${baseUrl}/question?id=${rootId}`)
  }

  fetchSymptoms (sentence) {
    return axios.get(`${baseUrl}/child_kds?sentence=${sentence}`)
  }

  fetchSymptom (id) {
    return axios.get(`${baseUrl}/child_kd?id=${id}`)
  }

  fetchDoctors (sentence) {
    return axios.post(`${baseUrl}/recommend`, {
      sentence
    })
  }

  fetchDoctor (name) {
    return axios.get(`${baseUrl}/doctor?name=${name}`)
  }
}

export default new Services()
