
function refresh(res,req,state){
    const Expires=CahceControl=Modified=Etag=true
    if(Expires){
        res.setHeader('Expires',(new Date(Date.now()+600*1000)).toUTCString())
    }
    if(CahceControl){
        res.setHeader('Cache-Control',`public,max-age=${600}`)
    }
    if(Modified){
         res.setHeader('Last-Modified',state.mtime.toUTCString())
    }
    
}
module.exports.Cache=function(req,res,state){
    refresh(res,req,state)
    const IfModified=req.headers['if-modified-since']
    const IfNoneMatch=req.headers['if-none-match']
    if(!IfModified&&!IfNoneMatch){
        return false;
    }
    if(IfModified&&IfModified!==res.getHeader('last-Modified')){
        return false
    }
    if(IfNoneMatch&&IfNoneMatch!==res.getHeader('etag')){
        return false
    }
    return true
}