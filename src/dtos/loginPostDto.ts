import Joi from 'joi';

export const loginPostDtoSchema = Joi.object({
  username: Joi.string().required(),
  pwd: Joi.string().required()
});

export interface ILoginPostDto {
  username: string,
  pwd: string,
}