import './App.css';
import firebase from 'firebase';
import {useEffect, useState} from 'react';
import {auth, storage, db} from './firebase.js';

 function Header(props){

    const [progress, setProgress] = useState(0);

    const [file, setFile] = useState(null);




    function abrirCriarConta(e){
        e.preventDefault();

        let modal = document.querySelector('.modalCriarConta').onSnapchot

        modal.style.display = 'block';

    }

    function fecharModalCriar(){

       let modal = document.querySelector('.modalCriarConta');

        modal.style.display = 'none';
     }

     function criarConta(e){
        e.preventDefault();

        let email = document.getElementById('email-cadastro').value;
        let username = document.getElementById('username-cadastro').value;
        let senha = document.getElementById('senha-cadastro').value;

        //CRIANDO CONTA NO FIREBASE

        auth.createUserWithEmailAndPassword(email,senha)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:username
            })

            alert('Conta criada com sucesso!');

            let modal = document.querySelector('.modalCriarConta');

            modal.style.display = 'none';
        }).catch((error)=>{
            alert('error.message');
        });



     }
     
     //TELA DE LOGIN

        function logarConta(e){
            e.preventDefault();

            let email = document.getElementById('email-login').value;
            let senha = document.getElementById('senha-login').value;

            auth.signInWithEmailAndPassword(email,senha)
            .then((auth)=>{
                props.setUser(auth.user.displayName);
                // alert('Logado com sucesso!');
                window.location.href = '/';
            }).catch((err)=>{
                alert('error.login');
            })
        }
    
        //UPLOAD DE ARQUIVO

        function abrirModalUpload(e){
            e.preventDefault();

            
        let modal = document.querySelector('.modalUpload');

        modal.style.display = 'block';

        }

        function fecharModalUpload(){
            let modal = document.querySelector('.modalUpload');

            modal.style.display = 'none';
        }

        function uploadPost(e){
            e.preventDefault();

            let tituloPost = document.getElementById('titulo_upload').value;
            // let progressEl = document.getElementById('progress_Upload'); nem precisou
       
            const uploadTask = storage.ref(`images/${file.name}`).put(file);
      
      
            uploadTask.on('state_changed', (snapchot)=>{
                const progress = Math.round(snapchot.bytesTransferred/snapchot.totalBytes) * 100;
                setProgress(progress);
            }, function(err){

            }, function(){
                storage.ref('images').child(file.name).getDownloadURL()
                .then(function(url){
                    db.collection('posts').add({
                        titulo: tituloPost,
                        image: url,
                        userName: props.user,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        
                    })
                    
                    setProgress(0);
                    setFile(null);

                    // alert('Upload feito com sucesso'); somente alerta que foi enviado

                    document.getElementById('formUpload2').reset();
                })
            })
        }

        //DESLOGAR

        function deslogar(e){
            e.preventDefault();
            auth.signOut().then(function(val){
                props.setUser(null);
                window.location.href = '/';
            })
        }


    return(

        <div className="header">

 
        <div className="modalCriarConta">

            <div className="form-CriarConta">
                <div onClick={()=>fecharModalCriar()} className="close-modal-criar">X</div>
                <form onSubmit={(e)=>criarConta(e)}>                    <h1>Cadastrar</h1>
                    <input id="email-cadastro" type="text" placeholder="Seu e-mail..."/>
                    <input id="username-cadastro" type="text" placeholder="Novo Usúario..."/>
                    <input id="senha-cadastro" type="password" placeholder="Cadastre uma Senha..."/>
               
                    <input className="btn1" type="submit" value="Cadastrar"/>
                
                </form>
            </div>

        </div>

        <div className="modalUpload">

            <div className="formUpload">
              
                <form id="formUpload2" onSubmit={(e)=>uploadPost(e)}>   
                    <h1>Compartilhar</h1>
                   <progress id="progress_Upload" value={progress}></progress>
                    <input id="titulo_upload" type="text" placeholder="Nome da sua foto..."/>
                    <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="file"/>
            
                    <input className="btn1" type="submit" value="Compartilhar"/>
                  <div onClick={()=>fecharModalUpload()} className="close-modal-upload">X</div>
                </form>
            </div>

        </div>

            <div className="center">

                <div className="header_logo">
                    <a href=""><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img></a>
                </div>

                {
                    (props.user)?
                    <div className="header_logadoInfo">
                    <span>Olá, <b>{props.user}</b></span>

                    <a onClick={(e)=>abrirModalUpload(e)} href="#">+</a>
                    <a className="deslogar" onClick={(e)=>deslogar(e)}>Sair</a>

                    {/* <a href="#">Mensagens</a> */}
                    </div>
                    :
                    <div className="header_loginForm">
                        <form onSubmit={(e)=>logarConta(e)}>
                            <input id="email-login" type="text" placeholder="Login..."/>
                            <input id="senha-login" type="password" placeholder="Senha..." />
                            <input type="submit" name="acao" value="Entrar" /> 
                        </form>

                    <div className="btn_criarConta">
                        <a onClick={(e)=>abrirCriarConta(e)} href="#">Criar Conta!</a>
                    </div>

                    </div>
                }

            </div>
        </div> 

    )
      

}

export default Header;
       
 