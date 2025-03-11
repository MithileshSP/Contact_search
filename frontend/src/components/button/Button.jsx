function Button({name,click}){
    return(
     <button className="top-login-btn" onClick={click}>{name}</button>   
    )
}
export default Button