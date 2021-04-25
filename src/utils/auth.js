/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-04-21 09:47:54
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-21 11:02:35
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */
import { isString } from '.'
import CryptoJS from 'crypto-js'
import config from '@config'

// 设置数据块长度
const keySize = 128

/**
 * 加密
 * @param {String} plaintText 要处理的数据
 * @return void
 */
export const aesEncrypt = (plaintText, cryptoKey = 'qishi') => {
  if (!isString(plaintText)) {
    console.error(
      '%c [ plaintText not is String ]',
      'font-size:18px; background:red; color:#fff;',
      plaintText
    )
    return false
  }
  const encrypted = CryptoJS.AES.encrypt(plaintText, fillKey(config.companyName + cryptoKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const base64Cipher = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  // 处理 Android 某些低版的BUG
  const resultCipher = base64Cipher.replace(/\+/g, '-').replace(/\//g, '_')
  return resultCipher.toString()
}

/**
 * 解密
 * @param {String} encryptedStr 要处理的数据
 * @return void
 */
export const aesDecrypt = (encryptedStr, cryptoKey = 'qishi') => {
  if (!isString(encryptedStr)) {
    return encryptedStr
  }
  const restoreBase64 = encryptedStr.replace(/-/g, '+').replace(/_/g, '/')
  const decrypt = CryptoJS.AES.decrypt(restoreBase64, fillKey(config.companyName + cryptoKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const data = CryptoJS.enc.Utf8.stringify(decrypt).trim()
  try {
    return data
  } catch (error) {
    return ''
  }
}

/**
 * 生成密钥字节数组, 原始密钥字符串不足128位, 补填0.
 * @param {string} key - 原始 key 值
 * @return Buffer
 */
function fillKey(key) {
  const filledKey = Buffer.alloc(keySize / 8)
  const keys = Buffer.from(key)
  let index = 0
  while (index < filledKey.length) {
    filledKey[index] = keys[index]
    index += 1
  }

  return CryptoJS.enc.Utf8.parse(filledKey)
}
