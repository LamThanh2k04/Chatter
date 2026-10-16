import { ConfigService } from "@nestjs/config";

const jwtConfig = (configService: ConfigService) => (
    {
        secret: configService.get('JWT_SECRET'),
        signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN')
        }
    }
)

export default jwtConfig;