import {Injectable} from "@nestjs/common";
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";
import {AuthConfig} from "../../../infrastructure/common/config/auth.config";

export interface IUser {
    name: string;
    password: string;
}


@Injectable()
export class AuthService {
    private readonly userPool: CognitoUserPool

    constructor(
        private readonly authConfig: AuthConfig
    ) {
        this.userPool = new CognitoUserPool({
            UserPoolId: this.authConfig.userPoolId,
            ClientId: this.authConfig.clientId,
        })
    }

    authenticateUser(user: IUser) {
        const { name, password } = user;

        const authenticationDetails = new AuthenticationDetails({
            Username: name,
            Password: password
        })

        const userData = {
            Username: name,
            Pool: this.userPool
        }

        const newUser = new CognitoUser(userData)

        return new Promise((resolve, reject) => {
            return newUser.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                    resolve(result)
                },
                onFailure: err => {
                    reject(err)
                },
                newPasswordRequired: function(userAttributes, requiredAttributes) {
                    delete userAttributes.email_verified;
                    delete userAttributes.email
                    newUser.completeNewPasswordChallenge("258120Oleg!", userAttributes, this);

                },

            })
        })
    }
}