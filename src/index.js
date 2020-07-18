const yarg=require('yargs')
const {Server}=require('./app')
const argv=yarg
    .usage('anyServer [options]')
    .options('p',{
        alias:'port',
        describe:'端口号',
        default:3000
    })
    .options('c',{
        alias:'Cache',
        describe:'配置缓存选项',
        default:{
            Expires:true,
            CahceControl:true,
            Modified:true,
            Etag:true
        }
    })
    .options('h',{
        alias:'hostName',
        describe:'主机地址',
        default:'localhost'
    })
    .options('d',{
        alias:'paths',
        describe:'服务地址',
        default:process.cwd()
    })
    .version()
    .alias('v','version')
    .help()
    .argv
console.log("123")
const server=new Server(argv)
server.start()