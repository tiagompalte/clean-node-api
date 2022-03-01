import { AddAccount, AddAccountModel, Hasher, AccountModel, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepositoryStub: AddAccountRepository
  constructor (hasher: Hasher, addAccountRepositoryStub: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepositoryStub = addAccountRepositoryStub
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepositoryStub.add(Object.assign({}, accountData, { password: hashedPassword }))
    return Promise.resolve(account)
  }
}
