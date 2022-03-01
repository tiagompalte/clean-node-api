import {
  AuthenticationModel,
  HashComparer,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  TokenGenerator,
  Authentication
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (!account) {
      return null
    }

    const compare = await this.hashComparer.compare(authentication.password, account.password)
    if (!compare) {
      return null
    }

    const token = await this.tokenGenerator.generate(account.id)
    if (!token) {
      return null
    }

    await this.updateAccessTokenRepository.update(account.id, token)

    return token
  }
}
