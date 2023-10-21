export abstract class TokenService {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>
}
