import {
  AuthenticationModel,
  HashComparer,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Encrypter,
  Authentication
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (!account) {
      return null
    }

    const compare = await this.hashComparer.compare(authentication.password, account.password)
    if (!compare) {
      return null
    }

    const token = await this.encrypter.encrypt(account.id)
    if (!token) {
      return null
    }

    await this.updateAccessTokenRepository.updateAccessToken(account.id, token)

    return token
  }
}
