import {useRef} from 'react';


function Login(props){
    const id = useRef();
    const pw = useRef();

    const handleLogin = e => {
        if(e.key === 'Enter' || e.type === 'click'){
            if(id.current.value.length > 0 && pw.current.value.length > 0){
                if(!props.LogIn(id.current.value, pw.current.value)){
                    alert('회원정보가 존재하지 않습니다.');
                    id.current.value = '';
                    pw.current.value = '';
                    id.current.focus();
                }
            } else {
                if(id.current.value.length === 0){ 
                    alert('ID를 입력해주세요');
                    id.current.focus();
                } else if(pw.current.value.length === 0){
                    alert('PW를 입력해주세요');
                    pw.current.focus();
                }
            }
        } 
    }

    const handleRegister = () => {
        props.handleRegisterClick(true);
    }    
    return(
        <div>
            <div className="input-fields">
                <div>
                    <span>ID</span>
                    <input id="id" type="text" autoComplete="off" ref={id} onKeyPress={handleLogin}></input>
                </div>
                <div>
                    <span>PW</span>
                    <input id="pw" type="password" ref={pw} onKeyPress={handleLogin}></input>
                </div>
            </div>
            <div className="button-fields">
                <button className="btn login-btn" onClick={handleLogin}>로그인</button>
                <button className="btn reg-btn" onClick={handleRegister}>회원가입</button>
            </div>
        </div>
    ); 
    
}

export default Login;