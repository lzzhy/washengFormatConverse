import { Prop } from "@/services/model";
import { asyncValidateEmail, asyncValidatePhoneNumber, asyncValidatePassword, asyncValidateTeamname, asyncValidateNickname, asyncCheckExistEmail } from "@/utils";

export class FormState {
  @Prop({ required: true, validate: { validator: asyncValidateEmail || asyncValidatePhoneNumber } })
  email = "";

  @Prop({ required: true, validate: { validator: asyncValidatePassword } })
  password = "";

  @Prop({})
  rePassword = "";

  @Prop({ required: true, validate: { validator: asyncValidateNickname } })
  nickname = "";

  @Prop({ required: true, validate: { validator: asyncValidateTeamname } })
  teamName = "";

  @Prop({})
  invitation = "";

  @Prop({ required: true, message: "请填写验证码" })
  validationCode = "";
}
