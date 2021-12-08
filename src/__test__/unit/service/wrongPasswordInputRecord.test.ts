import { determineIfUserShouldBeLocked, addWrongPasswordInputRecord } from '../../../services/wrongPasswordInputRecord';
import WrongPasswordInputRecord from '../../../models/wrongPasswordInputRecord';

jest.mock('../../../models/wrongPasswordInputRecord');
const mockWrongPasswordInputRecord = WrongPasswordInputRecord as jest.MockedClass<typeof WrongPasswordInputRecord>;

beforeEach(() => {
  mockWrongPasswordInputRecord.mockClear();
});

describe('wrongPasswordInputRecord service', () => {
  it('should add a new record', async () => {
    await addWrongPasswordInputRecord('username', new Date());
    expect(mockWrongPasswordInputRecord).toBeCalled();
  });

  it('should return false when call determineIfUserShouldBeLocked', async () => {
    mockWrongPasswordInputRecord.find = jest.fn().mockResolvedValue([]);
    const result = await determineIfUserShouldBeLocked('username', new Date());
    expect(result).toBe(false);
  });

  it('should return true when call determineIfUserShouldBeLocked', async () => {
    const mockRecord = { dateTime: new Date() };
    const mockRecords = [mockRecord, mockRecord, mockRecord];
    mockWrongPasswordInputRecord.find = jest.fn().mockResolvedValue(mockRecords);
    const result = await determineIfUserShouldBeLocked('username', new Date());
    expect(result).toBe(true);
  });
});
