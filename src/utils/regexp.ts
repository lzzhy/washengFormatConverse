/**
 * @description 正则工具包
 * @exports imageTypeRegexp 图像类型正则
 * @exports nearhubDomain nearhub白板域名正则
 * @exports mobileRegexp 手机号正则
 * @exports passwordRegexp 密码基础正则
 * @exports upperCaseRegexp 大写字母正则
 * @exports lowerCaseRegexp 小写字母正则
 * @exports numberRegexp 数字正则
 * @exports domainRegexp 域名正则
 * @exports emailRegexp 邮箱正则
 * @exports checkMobile 手机号检测
 * @exports checkPassword 密码检测
 * @exports checkUserName 用户名检测
 * @exports checkEmail 邮箱检测
 * @exports isImageType 图像文件类型检测
 * @exports checkValidationCode 检测验证码数字
 * @exports notNickname 检测用户名是否包含指定特殊字符
 * @exports notMeetingName 检测会议名是否包含指定特殊字符
 * @exports notGroupName 检测项目组名是否包含指定特殊字符
 * @exports checkZh 检测是否包含中文字符
 */
export const imageTypeRegexp = /\.(jpe?g|png|bmp|gif)$/;
export const nearhubDomain = /(nearhub\.\w+)/i;
export const mobileRegexp = /^1[123456789]\d{9}$/;
// // 后端使用的手机号正则
// export const mobileRegexp = /(^[0-9\-]{1,20})$/;
export const passwordRegexp = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*()_+]{6,20}$/;
export const upperCaseRegexp = /[A-Z]/;
export const lowerCaseRegexp = /[a-z]/;
export const numberRegexp = /^[0-9]+\.?[0-9]*$/;
export const domainRegexp = /^[a-z0-9][a-z0-9-]{1,20}$/i;
export const emailRegexp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,10}$/;
export const vcodeRegexp = /^\d{4}$/;
export const nicknameRegexp = /^[\u4E00-\u9FA5\sA-Za-z0-9_]+$/;
export const chinaReg = /^[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]+$/;
export const meetingNameRegexp = /[><;~!@#$%^&*()-+～！＠＃￥％…＆×；？＋－‘’《》＜＞]+/;
export const zhRegexp = /[\u4E00-\u9FA5]/;
export const invitationRegexp = /^\d{6,9}$/;
export const payPasswordRegexp = /^\d{6}$/;
export const checkMobile = (mobile: string) => mobileRegexp.test(mobile);
export const checkPassword = (password: string) => passwordRegexp.test(password);
export const checkPayPassword = (payPassword: string) => payPasswordRegexp.test(payPassword);
export const checkInvitation = (invitation: string) => invitationRegexp.test(invitation);
export const checkUsername = (username: string) => mobileRegexp.test(username) || emailRegexp.test(username);
export const checkNickname = (nickname: string) => nicknameRegexp.test(nickname);
export const checkEmail = (email: string) => emailRegexp.test(email);
export const isImageType = (imageFile: string) => imageTypeRegexp.test(imageFile);
export const checkValidationCode = (code: string, length = 4) => new RegExp(`^\\d\{${length}\}$`).test(code);
export const notNickname = (name: string) => nicknameRegexp.test(name) && chinaReg.test(name);
export const notMeetingName = (name: string) => meetingNameRegexp.test(name) && false;
export const notGroupName = (name: string) => meetingNameRegexp.test(name) && false;
export const checkZh = (name: string) => zhRegexp.test(name);
export const checkNumber = (number: string) => numberRegexp.test(number);
