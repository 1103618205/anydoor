const {createGzip}=require('zlib')
module.exports.Compress=(rs,res,req)=>{
    let acceptEncoding=req.headers['accept-encoding']
    if(acceptEncoding&&acceptEncoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip')
        return rs.pipe(createGzip())
    }else{
        return rs
    }
}