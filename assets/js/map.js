export function generateMapUrl(location = '110.458906,19.942921', size = '445*250', zoom = 15) {
  // 260 / 185
  // <img src="https://restapi.amap.com/v3/staticmap?location=110.458906,19.942921&zoom=10&size=750*300&markers=mid,,A:110.458906,19.942921&key=a78fd75766bdec87627a2a9170a90c26" alt="">
  return `https://restapi.amap.com/v3/staticmap?location=${location}&zoom=${zoom}&size=${size}&markers=mid,,A:${location}&key=a78fd75766bdec87627a2a9170a90c26`
}