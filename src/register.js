import {useRef} from 'react';

function Register(props){

    const id = useRef();
    const email = useRef();
    const pw = useRef();

    const handleRegister = e => {
        if(e.key === 'Enter'){
            if(id.current.value.length > 0 && email.current.value.length > 0 && pw.current.value.length > 0){
                const code = props.Register(id.current.value, email.current.value, pw.current.value);
                if(code === 0){
                    alert('가입되었습니다!');
                    props.handleRegisterClick(false);
                } else if(code === 1){
                    alert('중복된 ID입니다.');
                    id.current.value = '';
                    id.current.focus();
                } else if(code === 2){
                    alert('중복된 EMAIL입니다.');
                    email.current.value = '';
                    email.current.focus();
                }
            } else {
                alert('가입 정보를 입력해주세요.');
                if(id.current.value.length === 0) { id.current.focus(); }
                else if(email.current.value.length === 0) { email.current.focus(); }
                else if(pw.current.value.length === 0) { pw.current.focus(); }
            }
        }
    }

    const handleCancel = () => {
        props.handleRegisterClick(false);
    }
    
    return(
        <div>
            <div className="input-fields">
                <div>
                    <div className="flex-half">
                        <div>
                            <span>ID</span>
                            <input id="id" type="text" autoComplete="off" ref={id} onKeyPress={handleRegister}></input>
                        </div>
                        <div>
                            <span>PW</span>
                            <input id="pw" type="password" ref={pw} onKeyPress={handleRegister}></input>
                        </div>
                        
                        
                    </div>
                </div>
                <div>
                    <span>EMAIL</span>
                    <input id="email" type="text" autoComplete="off" ref={email} onKeyPress={handleRegister}></input>
                </div>
                
            </div>
            <div className="button-fields">
                <button className="btn login-btn" onClick={handleRegister}>가입</button>
                <button className="btn reg-btn" onClick={handleCancel}>취소</button>
            </div>
        </div>
    );
    
    
}

export default Register;