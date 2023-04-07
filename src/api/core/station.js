import request from '@/utils/request'

export default {
    getList() {
      return request({
          url: `/chargingPile/mon/chargingStation/findAllstationName`,
          method: 'get'
        })
    },
    listByParentId(grSerialNumber) {
       return request({
       url: `/chargingPile/mon/chargingStation/findAllstationNameByid/${grSerialNumber}`,
       method: 'get'
       })
    }
}