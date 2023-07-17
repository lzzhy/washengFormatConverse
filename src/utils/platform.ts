/**
 * 判断是 pc 还是 移动端
 * @returns
 */
export function isMobile(): boolean {
  const userAgentInfo = navigator.userAgent;
  const isMobileAgents = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
  return !!userAgentInfo.match(isMobileAgents);
}
