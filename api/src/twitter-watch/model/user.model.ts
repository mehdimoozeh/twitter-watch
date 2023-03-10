import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: false })
export class User {
  _id: string;

  @Prop({ unique: true })
  id: number;

  @Prop()
  username: string;

  @Prop()
  displayname: string;

  @Prop()
  url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
