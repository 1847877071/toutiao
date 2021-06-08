/*
素材相关的请求
*/
import request from '@/utils/request.js'

/*
上传图片素材
*/

export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口都要求把请求头中的Content-Type设置
    // 为multipart/form-data,但是我们使用axios上传文件的话
    // 不需要手动设置，你只要给data一个FormData对象即可。
    // new FormData
    data
  })
}
