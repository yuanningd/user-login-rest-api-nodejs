import WrongPasswordInputRecord from '../models/wrongPasswordInputRecord';

export const addWrongPasswordInputRecord = async (username: string, dateTime: Date) => {
  const record = new WrongPasswordInputRecord({ username, dateTime });
  await record.save();
};

export const determineIfUserShouldBeLocked = async (username: string, dateTime: Date) => {
  const records = await WrongPasswordInputRecord.find({ username }).exec();
  const latestRecords = records.filter((e) => (dateTime.getTime() - e.dateTime.getTime() < 5 * 60 * 1000));
  return latestRecords.length >= 3;
};