import {ConfigModule} from '@nestjs/config'
const configModule = ConfigModule.forRoot({
    isGlobal: true
})

export default configModule