import {useRef} from 'react';


function Login(props){
    const id = useRef();
    const pw = useRef();

    const handleLogin = e => {
        if(!props.LogIn(id.current.value, pw.current.value)){
            alert('회원정보가 존재하지 않습니다.');
            id.current.value = '';
            pw.current.value = '';
            id.current.focus();
        }
    }
    return(
        <div>
            <div className="input-fields">
                <div>
                    <span>ID</span>
                    <input id="id" type="text" autoComplete="off" ref={id}></input>
                </div>
                <div>
                    <span>PW</span>
                    <input id="pw" type="password" ref={pw}></input>
                </div>
            </div>
            <div className="button-fields">
                <button className="btn login-btn" onClick={handleLogin}>로그인</button>
                <button className="btn reg-btn">회원가입</button>
            </div>
        </div>
    ); 
    
}

export default Login;