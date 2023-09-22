import { SignInRepo } from "../repositories/signin.repo.js"

export class SignInServ {
    signInRepository = new SignInRepo();

    signIn = async (email, password) => {
        const token = await this.signInRepository.signIn(email, password);

        return token
    }

    refreshAccessToken = async (refreshToken) => {
        const retoken = await this.signInRepository.refreshAccessToken(refreshToken)

        return retoken
    }

}